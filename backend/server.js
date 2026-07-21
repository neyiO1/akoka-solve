require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/akoka-solve", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Basic Routes
app.get("/v1/health", (req, res) => {
  res.json({ status: "OK", message: "Akoka API Gateway is running" });
});

// Sync Endpoint (CRDT)
app.post("/v1/sync", async (req, res) => {
  try {
    const { offlineQueue } = req.body;
    if (!offlineQueue || !Array.isArray(offlineQueue)) {
      return res.status(400).json({ error: "Invalid payload" });
    }
    
    // Simulate resolving CRDT conflicts and saving to DB
    console.log(`Received ${offlineQueue.length} offline tasks. Syncing...`);
    
    // Respond with success
    res.json({ 
      status: "success", 
      message: "Sync completed", 
      syncedCount: offlineQueue.length 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
