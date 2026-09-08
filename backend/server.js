require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const store = require("./store");
const { processCRDTSync } = require("./crdt");
const { verifyPaystackTransaction } = require("./paystack");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const PORT = process.env.PORT || 4000;

// Optional MongoDB Connection (Resilient Fallback)
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("[MongoDB] Connected successfully");
    })
    .catch((err) => {
      console.warn("[MongoDB] Connection failed, operating on resilient embedded store:", err.message);
    });
} else {
  console.log("[DataStore] Operating on embedded resilient store (MONGODB_URI not set)");
}

// -------------------------------------------------------------
// Health Check Endpoint
// -------------------------------------------------------------
app.get("/v1/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Akoka Solve API Gateway",
    timestamp: new Date().toISOString(),
    store: {
      tasksCount: store.getTasks().length,
      esusuVolume: store.getEsusuStatus().totalVolume,
      activeRound: store.getEsusuStatus().round,
    },
  });
});

// -------------------------------------------------------------
// Task Endpoints
// -------------------------------------------------------------
app.get("/v1/tasks", (req, res) => {
  try {
    const tasks = store.getTasks();
    res.json({ status: "success", tasks, total: tasks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/v1/tasks", (req, res) => {
  try {
    const { task } = req.body;
    if (!task || !task.id) {
      return res.status(400).json({ error: "Task object with valid id is required" });
    }
    const formattedTask = {
      ...task,
      updatedAt: new Date().toISOString(),
      version: (task.version || 0) + 1,
    };
    store.setTask(task.id, formattedTask);
    res.json({ status: "success", task: formattedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Phase 4: CRDT Offline Sync Endpoint
// -------------------------------------------------------------
app.post("/v1/sync", async (req, res) => {
  try {
    const { offlineQueue = [], clientTasks = [], clientId = "browser_client" } = req.body;

    console.log(
      `[CRDT Sync] Sync request received from [${clientId}]. Queue: ${offlineQueue.length}, Client snapshot: ${clientTasks.length}`
    );

    const result = processCRDTSync(
      store.tasks,
      offlineQueue,
      clientTasks,
      clientId,
      store.serverVectorClock
    );

    // Persist changes to disk
    store.saveToDisk();

    console.log(
      `[CRDT Sync] Completed successfully. Reconciled tasks: ${result.syncedTasks.length}, Conflicts resolved: ${result.conflictsResolved}`
    );

    res.json({
      status: "success",
      message: "CRDT Synchronization completed",
      syncedTasks: result.syncedTasks,
      conflictsResolved: result.conflictsResolved,
      serverTimestamp: result.serverTimestamp,
      serverVectorClock: result.serverVectorClock,
    });
  } catch (error) {
    console.error("[CRDT Sync Error]", error);
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// Phase 5: Paystack Verification & Esusu Pool Settlement
// -------------------------------------------------------------
app.post("/v1/esusu/verify", async (req, res) => {
  try {
    const { reference, email, amount, userId } = req.body;

    if (!reference) {
      return res.status(400).json({ error: "Transaction reference is required" });
    }

    const expectedAmount = Number(amount) || 10000;
    const depositorEmail = email || "unknown@student.unilag.edu.ng";

    console.log(`[Esusu Verify] Verifying reference [${reference}] for ${depositorEmail} (₦${expectedAmount})`);

    // Verify via Paystack engine
    const verification = await verifyPaystackTransaction(reference, expectedAmount, depositorEmail);

    if (!verification.verified) {
      return res.status(400).json({
        success: false,
        error: "Paystack payment verification failed",
        details: verification,
      });
    }

    // Record verified contribution in pool ledger
    const contributionRecord = {
      reference,
      userId: userId || null,
      email: depositorEmail,
      amount: verification.amount,
      channel: verification.channel,
      currency: verification.currency,
      verifiedAt: verification.paidAt,
      source: verification.source,
      auditProof: verification.auditProof,
      round: store.esusu.round,
    };

    const updatedPool = store.recordContribution(contributionRecord);

    console.log(
      `[Esusu Pool] Verified deposit credited! New Total Pool Volume: ₦${updatedPool.totalVolume.toLocaleString()}`
    );

    res.json({
      success: true,
      message: "Paystack transaction verified and credited to Esusu pool",
      verification,
      pool: {
        totalVolume: updatedPool.totalVolume,
        round: updatedPool.round,
        rotationQueue: updatedPool.rotationQueue,
      },
    });
  } catch (err) {
    console.error("[Esusu Verify Error]", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/v1/esusu/status", (req, res) => {
  try {
    const status = store.getEsusuStatus();
    res.json({ status: "success", pool: status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/v1/esusu/contributions", (req, res) => {
  try {
    const contributions = store.getEsusuStatus().contributions || [];
    res.json({ status: "success", contributions, total: contributions.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Start Server
// -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`[Akoka Solve Gateway] Server running at http://localhost:${PORT}`);
  console.log(`[Akoka Solve Gateway] Ready for CRDT Sync (/v1/sync) and Paystack (/v1/esusu/verify)`);
});
