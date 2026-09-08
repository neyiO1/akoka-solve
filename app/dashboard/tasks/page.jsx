"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("Available");
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  // CRDT Sync State
  const [syncStatus, setSyncStatus] = useState({ state: "checking", message: "Connecting to gateway..." });
  const [offlineQueueCount, setOfflineQueueCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // Offline Proof Modal State
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [selectedTaskForProof, setSelectedTaskForProof] = useState("");
  const [proofNotes, setProofNotes] = useState("");

  // Helper to load offline queue from localStorage
  const getOfflineQueue = () => {
    try {
      const q = localStorage.getItem("akoka_offline_queue");
      return q ? JSON.parse(q) : [];
    } catch {
      return [];
    }
  };

  // Helper to save offline queue
  const saveOfflineQueue = (queue) => {
    try {
      localStorage.setItem("akoka_offline_queue", JSON.stringify(queue));
      setOfflineQueueCount(queue.length);
    } catch (err) {
      console.error("Failed to save offline queue", err);
    }
  };

  // Push an action to the offline queue and attempt CRDT sync
  const queueAction = (action, taskId, payload = {}) => {
    const queue = getOfflineQueue();
    const item = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      action,
      taskId,
      payload,
      timestamp: new Date().toISOString(),
      clientId: user?.uid ? `client_${user.uid.slice(0, 8)}` : "anonymous_client",
    };
    queue.push(item);
    saveOfflineQueue(queue);
    return item;
  };

  // Perform CRDT sync with the Express backend
  const syncWithGateway = useCallback(async (localTasks = null) => {
    setIsSyncing(true);
    const queue = getOfflineQueue();
    const currentTasks = localTasks || tasks;
    const clientId = user?.uid ? `client_${user.uid.slice(0, 8)}` : "browser_client";

    try {
      const res = await fetch(`${BACKEND_URL}/v1/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          offlineQueue: queue,
          clientTasks: currentTasks,
        }),
      });

      if (!res.ok) throw new Error(`Gateway returned HTTP ${res.status}`);

      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.syncedTasks)) {
        setTasks(data.syncedTasks);
        localStorage.setItem("akoka_tasks", JSON.stringify(data.syncedTasks));
        // Clear processed queue
        saveOfflineQueue([]);
        setSyncStatus({
          state: "online",
          message: `Gateway Synced (${data.syncedTasks.length} tasks, ${data.conflictsResolved} conflicts resolved)`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } catch (err) {
      console.warn("[CRDT Sync] Gateway unavailable, operating in offline fallback:", err.message);
      setSyncStatus({
        state: "offline",
        message: queue.length > 0 ? `Offline Mode: ${queue.length} action(s) queued` : "Offline Mode (Local Storage)",
      });
    } finally {
      setIsSyncing(false);
    }
  }, [tasks, user]);

  // Initial Fetch: Try Express Gateway first, fallback to Firestore/LocalStorage
  useEffect(() => {
    const fetchTasks = async () => {
      setIsFetching(true);
      let loadedTasks = [];

      // 1. Try Express backend gateway
      try {
        const res = await fetch(`${BACKEND_URL}/v1/tasks`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.tasks) && data.tasks.length > 0) {
            loadedTasks = data.tasks;
            setTasks(loadedTasks);
            localStorage.setItem("akoka_tasks", JSON.stringify(loadedTasks));
            setSyncStatus({
              state: "online",
              message: `Connected to Gateway (${loadedTasks.length} tasks)`,
              timestamp: new Date().toLocaleTimeString(),
            });
            setIsFetching(false);
            // Run initial queue sync if pending
            if (getOfflineQueue().length > 0) {
              syncWithGateway(loadedTasks);
            }
            return;
          }
        }
      } catch (err) {
        console.warn("[Tasks] Backend gateway unreachable on initial load:", err.message);
      }

      // 2. Fallback to LocalStorage
      const cached = localStorage.getItem("akoka_tasks");
      if (cached) {
        try {
          loadedTasks = JSON.parse(cached);
        } catch {
          loadedTasks = [];
        }
      }

      // 3. Fallback to Firestore if empty
      if (loadedTasks.length === 0) {
        try {
          const querySnapshot = await getDocs(collection(db, "tasks"));
          querySnapshot.forEach((docSnap) => {
            loadedTasks.push({ id: docSnap.id, ...docSnap.data() });
          });
        } catch (fbErr) {
          console.warn("[Tasks] Firestore access blocked or failed:", fbErr.message);
        }
      }

      // 4. Default Seed if still empty
      if (loadedTasks.length === 0) {
        loadedTasks = [
          { id: "task_1", title: "Tutor Year 1 CS Students", status: "Available", points: 300, description: "Required proof: Photo of session + Attendance sheet.", assignedTo: null },
          { id: "task_2", title: "Akoka Canal Cleanup", status: "Available", points: 500, description: "Clear waste from the canal segment near UNILAG gate.", assignedTo: null },
          { id: "task_3", title: "Deliver Medical Supplies", status: "Available", points: 350, description: "Deliver 5 boxes of basic aid to primary health center.", assignedTo: null },
          { id: "task_4", title: "Organize Tech Meetup", status: "Available", points: 400, description: "Host a 2-hour web3 meetup for UNILAG students.", assignedTo: null },
          { id: "task_5", title: "Plant Trees at UNILAG", status: "Available", points: 450, description: "Plant 10 saplings in the engineering faculty.", assignedTo: null },
          { id: "task_6", title: "Fix Campus WiFi", status: "Available", points: 300, description: "Assist the IT dept in troubleshooting router 4B.", assignedTo: null },
          { id: "task_7", title: "Distribute Food Drives", status: "Available", points: 350, description: "Help distribute emergency food packs in Akoka.", assignedTo: null },
          { id: "task_8", title: "Mentorship Session", status: "Available", points: 250, description: "Mentor 3 high school students in math and coding.", assignedTo: null },
        ];
      }

      setTasks(loadedTasks);
      localStorage.setItem("akoka_tasks", JSON.stringify(loadedTasks));
      setOfflineQueueCount(getOfflineQueue().length);
      setSyncStatus({ state: "offline", message: "Operating on Local Offline Storage" });
      setIsFetching(false);
    };

    if (!loading) fetchTasks();
  }, [loading, syncWithGateway]);

  // Claim Task (CRDT Aware)
  const claimTask = async (taskId) => {
    if (!user) {
      alert("Please login with Google to claim a task.");
      return;
    }

    // 1. Optimistic UI update
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, status: "Active", assignedTo: user.uid, updatedAt: new Date().toISOString() } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("akoka_tasks", JSON.stringify(updatedTasks));

    // 2. Queue CRDT Action
    queueAction("CLAIM_TASK", taskId, {
      assignedTo: user.uid,
      userId: user.uid,
      userEmail: user.email,
    });

    // 3. Immediately trigger CRDT sync
    syncWithGateway(updatedTasks);

    // 4. Firestore non-blocking update
    try {
      await updateDoc(doc(db, "tasks", taskId), { status: "Active", assignedTo: user.uid });
    } catch (fbErr) {
      console.warn("Firestore update skipped (offline/rules):", fbErr.message);
    }
  };

  // Submit Proof (CRDT Aware)
  const submitProof = async (taskId, notes = "Verified field proof submitted") => {
    // 1. Optimistic UI update
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, status: "Pending Review", updatedAt: new Date().toISOString(), proofDetails: notes } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("akoka_tasks", JSON.stringify(updatedTasks));

    // 2. Queue CRDT Action
    queueAction("SUBMIT_PROOF", taskId, {
      proofDetails: notes,
      userId: user?.uid,
    });

    // 3. Trigger CRDT sync
    syncWithGateway(updatedTasks);

    // 4. Firestore non-blocking update
    try {
      await updateDoc(doc(db, "tasks", taskId), { status: "Pending Review" });
    } catch (fbErr) {
      console.warn("Firestore update skipped (offline/rules):", fbErr.message);
    }
  };

  // Handle Offline Proof Modal Submission
  const handleOfflineModalSubmit = (e) => {
    e.preventDefault();
    if (!selectedTaskForProof) {
      alert("Please select a task to submit proof for.");
      return;
    }
    submitProof(selectedTaskForProof, proofNotes || "Offline photographic evidence and field notes logged.");
    setIsProofModalOpen(false);
    setProofNotes("");
    setSelectedTaskForProof("");
  };

  if (loading || isFetching) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "var(--cream)" }}>
        Loading Akoka Decentralized Task Registry...
      </div>
    );
  }

  // Filter tasks based on active tab
  let displayedTasks = [];
  if (activeTab === "Available") {
    displayedTasks = tasks.filter((t) => t.status === "Available");
  } else if (activeTab === "Active") {
    displayedTasks = tasks.filter((t) => t.status === "Active" && (!user || t.assignedTo === user?.uid || !t.assignedTo));
  } else if (activeTab === "Pending Review") {
    displayedTasks = tasks.filter((t) => t.status === "Pending Review");
  } else if (activeTab === "Verified") {
    displayedTasks = tasks.filter((t) => t.status === "Verified");
  }

  const myActiveTasks = tasks.filter((t) => t.status === "Active" && (!user || t.assignedTo === user?.uid));

  return (
    <>
      {/* Header & CRDT Gateway Status Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>My Civic Challenges</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: syncStatus.state === "online" ? "var(--green)" : "var(--gold)",
                boxShadow: syncStatus.state === "online" ? "0 0 8px var(--green)" : "0 0 8px var(--gold)",
              }}
            />
            <span style={{ fontSize: "0.85rem", color: "var(--grey-light)" }}>
              {syncStatus.message} {syncStatus.timestamp ? `· Last sync: ${syncStatus.timestamp}` : ""}
            </span>
            {offlineQueueCount > 0 && (
              <span
                style={{
                  background: "rgba(201, 168, 76, 0.2)",
                  color: "var(--gold)",
                  border: "1px solid var(--gold)",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {offlineQueueCount} queued
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            className="btn-outline"
            onClick={() => syncWithGateway()}
            disabled={isSyncing}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.875rem",
              cursor: isSyncing ? "not-allowed" : "pointer",
              borderColor: "rgba(255,255,255,0.2)",
              color: "var(--cream)",
            }}
          >
            {isSyncing ? "Syncing..." : "⚡ Sync CRDT Gateway"}
          </button>

          <button
            className="btn-primary"
            onClick={() => setIsProofModalOpen(true)}
            style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "0.875rem", cursor: "pointer" }}
          >
            Submit Offline Proof
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px", overflowX: "auto" }}>
        {[
          { name: "Available", count: tasks.filter((t) => t.status === "Available").length },
          { name: "Active", count: myActiveTasks.length },
          { name: "Pending Review", count: tasks.filter((t) => t.status === "Pending Review").length },
          { name: "Verified", count: tasks.filter((t) => t.status === "Verified").length },
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            style={{
              background: "none",
              border: "none",
              color: activeTab === tab.name ? "var(--cream)" : "var(--grey-light)",
              fontWeight: activeTab === tab.name ? 700 : 500,
              fontSize: "1rem",
              cursor: "pointer",
              position: "relative",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {tab.name}
            <span
              style={{
                fontSize: "0.75rem",
                padding: "2px 6px",
                borderRadius: "10px",
                background: activeTab === tab.name ? "rgba(25, 111, 191, 0.3)" : "rgba(255,255,255,0.05)",
                color: activeTab === tab.name ? "var(--blue)" : "var(--grey-light)",
              }}
            >
              {tab.count}
            </span>
            {activeTab === tab.name && (
              <motion.div
                layoutId="underline"
                style={{ position: "absolute", bottom: "-13px", left: 0, right: 0, height: "2px", background: "var(--blue)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
        {displayedTasks.map((task) => (
          <div
            key={task.id}
            className="glass-card"
            style={{
              padding: "20px",
              borderLeft: `4px solid ${
                task.status === "Pending Review"
                  ? "var(--gold)"
                  : task.status === "Verified"
                  ? "var(--green)"
                  : task.status === "Active"
                  ? "var(--blue)"
                  : "rgba(255,255,255,0.2)"
              }`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "1.25rem", margin: 0 }}>{task.title}</h3>
                <span
                  style={{
                    background: "rgba(201, 168, 76, 0.15)",
                    color: "var(--gold)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    border: "1px solid rgba(201, 168, 76, 0.3)",
                  }}
                >
                  +{task.points || 300} XP
                </span>
                {task.version && (
                  <span style={{ fontSize: "0.7rem", color: "var(--grey-light)", opacity: 0.6 }}>
                    v{task.version}
                  </span>
                )}
              </div>
              <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "12px", lineHeight: 1.5 }}>
                {task.description}
              </p>

              {task.status === "Pending Review" && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold)", fontSize: "0.85rem" }}>
                  <span>⏳ Awaiting Peer Review Consensus (1/2 Approvals)</span>
                </div>
              )}

              {task.status === "Verified" && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--green)", fontSize: "0.85rem" }}>
                  <span>✓ Verified by Mentor & Anchored on Ledger (+{task.points || 300} XP Credited)</span>
                </div>
              )}
            </div>

            <div>
              {task.status === "Available" && (
                <button
                  className="btn-primary"
                  style={{ padding: "8px 16px", fontSize: "0.875rem", cursor: "pointer" }}
                  onClick={() => claimTask(task.id)}
                >
                  Claim Challenge
                </button>
              )}

              {task.status === "Active" && (
                <button
                  className="btn-outline"
                  style={{ padding: "8px 16px", fontSize: "0.875rem", cursor: "pointer", borderColor: "var(--gold)", color: "var(--gold)" }}
                  onClick={() => submitProof(task.id)}
                >
                  Submit Proof
                </button>
              )}
            </div>
          </div>
        ))}

        {displayedTasks.length === 0 && (
          <div style={{ padding: "60px", textAlign: "center", color: "var(--grey-light)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>📋</div>
            <p>No {activeTab.toLowerCase()} challenges found.</p>
          </div>
        )}
      </div>

      {/* Offline Proof Submission Modal */}
      <AnimatePresence>
        {isProofModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.85)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card"
              style={{
                padding: "32px",
                width: "100%",
                maxWidth: "480px",
                borderTop: "4px solid var(--blue)",
                position: "relative",
              }}
            >
              <button
                onClick={() => setIsProofModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  color: "var(--cream)",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>

              <h2 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>Submit Offline Task Proof</h2>
              <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "20px" }}>
                Submit verification proof recorded offline. It will be queued locally and reconciled via CRDT upon sync.
              </p>

              <form onSubmit={handleOfflineModalSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "0.875rem", color: "var(--grey-light)" }}>
                    Select Active Task
                  </label>
                  <select
                    value={selectedTaskForProof}
                    onChange={(e) => setSelectedTaskForProof(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      fontSize: "0.95rem",
                    }}
                  >
                    <option value="">-- Choose a claimed challenge --</option>
                    {myActiveTasks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} (+{t.points} XP)
                      </option>
                    ))}
                  </select>
                  {myActiveTasks.length === 0 && (
                    <p style={{ fontSize: "0.75rem", color: "var(--gold)", marginTop: "6px" }}>
                      You have no active claimed tasks. Claim a task first from the "Available" tab.
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "0.875rem", color: "var(--grey-light)" }}>
                    Proof Details & Field Evidence
                  </label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Completed cleanup near gate. GPS Geotag: 6.5186°N, 3.3980°E. Attendance sheet verified."
                    value={proofNotes}
                    onChange={(e) => setProofNotes(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      fontSize: "0.95rem",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
                >
                  Queue Offline Proof & Sync
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
