"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";

export default function ConsolePage() {
  // Sync Engine State
  const [isOnline, setIsOnline] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [serverTasks, setServerTasks] = useState([
    { id: 1, title: "Clean up Akoka Canal", status: "VERIFIED", xp: 150 },
    { id: 2, title: "Deliver medical supplies", status: "VERIFIED", xp: 200 },
  ]);
  const [syncStatus, setSyncStatus] = useState("Idle");

  // AI State
  const [studentDept, setStudentDept] = useState("Computer Science");
  const [completionSpeed, setCompletionSpeed] = useState("Medium");
  const [aiTasks, setAiTasks] = useState([]);
  const [ddaScale, setDdaScale] = useState(5);

  // Esusu State
  const [esusuRound, setEsusuRound] = useState(1);
  const [members, setMembers] = useState([
    { address: "0x71C...976F", payoutRound: 1, active: true },
    { address: "0x89F...A12B", payoutRound: 2, active: false },
    { address: "0x3A2...6C2F", payoutRound: 3, active: false },
  ]);
  const [esusuLogs, setEsusuLogs] = useState([]);

  // Consensus State
  const [peerApprovals, setPeerApprovals] = useState(0);
  const [mentorApproved, setMentorApproved] = useState(false);
  const [consensusSuccess, setConsensusSuccess] = useState(false);
  const [mintedTx, setMintedTx] = useState("");

  // Terminal logs
  const [logs, setLogs] = useState([]);
  const logTerminalEndRef = useRef(null);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toISOString();
    setLogs((prev) => [...prev, { timestamp, message, type }]);
  };

  useEffect(() => {
    if (logTerminalEndRef.current) {
      logTerminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Bootstrapping Logs
  useEffect(() => {
    addLog("NestJS API Gateway bootstrapped on Port 4000.", "success");
    addLog("Kubernetes cluster verified - HPA scaled to 3 pods.", "info");
    addLog("Redis Cache initialized (LFU Eviction policy enabled).", "info");
    addLog("Connected to MongoDB Replica Set (3 nodes active).", "success");
    addLog("Veramo SSI did:ethr resolver loaded.", "info");
    addLog("Solidity EsusuPool & TradeableImpactCredit deployed to Polygon Amoy.", "success");
    addLog("Kafka broker running - topics [task_completed, ai_match_ready] connected.", "success");
    runAiMatching();
  }, []);

  // Offline Sync Actions
  const handleQueueTask = () => {
    const newOfflineTask = {
      id: Date.now(),
      title: `Submit Community Proof - ${new Date().toLocaleTimeString()}`,
      status: "PENDING_OFFLINE",
      timestamp: Date.now(),
      vectorClock: offlineQueue.length + 1,
    };
    setOfflineQueue((prev) => [...prev, newOfflineTask]);
    addLog(`[IndexedDB] Task queued locally (Offline Mode). Clock: ${newOfflineTask.vectorClock}`, "warn");
  };

  const handleSync = () => {
    if (!isOnline) {
      addLog("Cannot sync. System is currently offline.", "error");
      return;
    }
    if (offlineQueue.length === 0) {
      addLog("Sync complete: Offline queue is empty.", "info");
      return;
    }

    setSyncStatus("Syncing");
    addLog("Sync pipeline initiated. Resolving CAP conflicts...", "info");

    setTimeout(() => {
      // Merge elements
      setServerTasks((prev) => [
        ...prev,
        ...offlineQueue.map((t) => ({ ...t, status: "VERIFIED", xp: 120 })),
      ]);
      setOfflineQueue([]);
      setSyncStatus("Idle");
      addLog("CRDT LWW-Element-Set resolution completed successfully. Server DB updated.", "success");
      addLog("IndexedDB local storage flushed.", "success");
    }, 2000);
  };

  // AI recommendation adjustment based on inputs
  const runAiMatching = () => {
    addLog(`Triggering matching loop for Dept: ${studentDept}, Velocity: ${completionSpeed}...`, "info");
    let baseTasks = [];
    let scale = 5;

    if (studentDept === "Computer Science") {
      baseTasks = [
        { name: "Build local open-source library", difficulty: "Hard", xp: 300 },
        { name: "Scaffold UNILAG wifi routing tool", difficulty: "Medium", xp: 200 },
      ];
    } else {
      baseTasks = [
        { name: "Organize campus waste clearing cycle", difficulty: "Easy", xp: 100 },
        { name: "Conduct environmental survey in Akoka", difficulty: "Medium", xp: 150 },
      ];
    }

    if (completionSpeed === "Fast") {
      scale = 8;
      baseTasks = baseTasks.map((t) => ({ ...t, difficulty: "Expert", xp: t.xp + 100 }));
      addLog("AI model detected high velocity. DDA scaled difficulty UP.", "warn");
    } else if (completionSpeed === "Slow") {
      scale = 3;
      baseTasks = baseTasks.map((t) => ({ ...t, difficulty: "Beginner", xp: t.xp - 50 }));
      addLog("AI model detected latency. DDA scaled difficulty DOWN.", "warn");
    }

    setAiTasks(baseTasks);
    setDdaScale(scale);
    addLog("AI task recommendations updated in Redis cache.", "success");
  };

  useEffect(() => {
    runAiMatching();
  }, [studentDept, completionSpeed]);

  // Esusu round simulation
  const handleEsusuRotation = () => {
    addLog("Executing Esusu rotation contract on-chain...", "info");
    const nextRound = esusuRound + 1;
    const txHash = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;

    setTimeout(() => {
      setEsusuRound(nextRound);
      setMembers((prev) =>
        prev.map((m, idx) => ({
          ...m,
          active: idx === (nextRound - 1) % 3,
        }))
      );
      setEsusuLogs((prev) => [
        ...prev,
        { round: esusuRound, recipient: members[(nextRound - 2) % 3].address, txHash },
      ]);
      addLog(`Esusu cycle complete. Round ${esusuRound} payout sent to recipient. Tx: ${txHash.substring(0, 16)}...`, "success");
    }, 1500);
  };

  // Peer review consensus loop
  const triggerConsensus = () => {
    addLog("Simulating Consensus validation on Task Proof...", "info");
    setPeerApprovals(0);
    setMentorApproved(false);
    setConsensusSuccess(false);

    // Step 1: Peer 1
    setTimeout(() => {
      setPeerApprovals(1);
      addLog("Peer 1 (Tier 2 Student) approved proof.", "info");
    }, 800);

    // Step 2: Peer 2
    setTimeout(() => {
      setPeerApprovals(2);
      addLog("Peer 2 (Tier 2 Student) approved proof.", "info");
    }, 1600);

    // Step 3: Mentor
    setTimeout(() => {
      setMentorApproved(true);
      setConsensusSuccess(true);
      const tx = `0x${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`;
      setMintedTx(tx);
      addLog("Consensus reached (2 Peers + 1 Mentor). Minting ERC-1155 credits...", "success");
      addLog(`Polygon Tx Mint: ${tx.substring(0, 16)}...`, "success");
    }, 2400);
  };

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh", color: "var(--cream)" }}>
      <SectionWrapper bg="dark" id="console-header" style={{ paddingBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span className="badge" style={{ marginBottom: "12px", border: "1px solid var(--blue)", color: "var(--blue)" }}>Developer Console</span>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>System Integration Playground</h1>
            <p style={{ color: "var(--grey-light)", marginTop: "8px" }}>
              Simulate and monitor the full 10-Phase distributed architecture.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                setIsOnline(!isOnline);
                addLog(`Network connectivity toggled: ${!isOnline ? "ONLINE" : "OFFLINE"}`, !isOnline ? "success" : "error");
              }}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: isOnline ? "var(--green)" : "var(--crimson)",
                border: "none",
                color: "var(--navy)",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 0 20px ${isOnline ? "rgba(30,138,94,0.3)" : "rgba(139,26,43,0.3)"}`,
              }}
            >
              System: {isOnline ? "Online" : "Offline"}
            </button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="navy" id="playground-body" style={{ paddingTop: "0px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", marginBottom: "40px" }}>
          
          {/* Box 1: Sync Engine */}
          <div className="glass-card" style={{ borderTop: "4px solid var(--blue)" }}>
            <h3 style={{ fontSize: "1.25rem", color: "var(--blue)", marginBottom: "16px" }}>CAP Sync Engine (Phase 7)</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px" }}>
                <span>Local IndexedDB Queue:</span>
                <span style={{ fontWeight: 700, color: "var(--gold)" }}>{offlineQueue.length} tasks queued</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="btn-outline" style={{ flex: 1, padding: "8px", fontSize: "0.875rem", cursor: "pointer" }} onClick={handleQueueTask}>
                  Queue Offline Task
                </button>
                <button
                  className="btn-primary"
                  style={{ flex: 1, padding: "8px", fontSize: "0.875rem", cursor: "pointer" }}
                  onClick={handleSync}
                  disabled={syncStatus === "Syncing" || !isOnline}
                >
                  {syncStatus === "Syncing" ? "Syncing..." : "Sync to DB"}
                </button>
              </div>
              <div>
                <h4 style={{ fontSize: "0.875rem", marginBottom: "8px", color: "var(--grey-light)" }}>PostgreSQL State:</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {serverTasks.map((t) => (
                    <div key={t.id} style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.02)", padding: "8px", borderRadius: "6px", fontSize: "0.875rem" }}>
                      <span>{t.title}</span>
                      <span style={{ color: "var(--green)" }}>{t.status} (+{t.xp} XP)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: AI Matchmaking & DDA */}
          <div className="glass-card" style={{ borderTop: "4px solid var(--gold)" }}>
            <h3 style={{ fontSize: "1.25rem", color: "var(--gold)", marginBottom: "16px" }}>AI Matchmaking & DDA (Phase 6)</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "6px" }}>Select Academic Dept</label>
                <select
                  value={studentDept}
                  onChange={(e) => setStudentDept(e.target.value)}
                  style={{ width: "100%", padding: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--cream)", borderRadius: "6px" }}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Environmental Science">Environmental Science</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "6px" }}>Task Completion Speed</label>
                <select
                  value={completionSpeed}
                  onChange={(e) => setCompletionSpeed(e.target.value)}
                  style={{ width: "100%", padding: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--cream)", borderRadius: "6px" }}
                >
                  <option value="Medium">Medium (Baseline)</option>
                  <option value="Fast">Fast (Autoscale Harder)</option>
                  <option value="Slow">Slow (Autoscale Easier)</option>
                </select>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", fontSize: "0.875rem" }}>
                <span>Dynamic Difficulty DDA:</span>
                <span style={{ fontWeight: 700, color: "var(--gold)" }}>Level {ddaScale}/10</span>
              </div>
              <div>
                <h4 style={{ fontSize: "0.875rem", marginBottom: "8px", color: "var(--grey-light)" }}>Recommended Tasks:</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {aiTasks.map((t, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.02)", padding: "8px", borderRadius: "6px", fontSize: "0.875rem" }}>
                      <span>{t.name}</span>
                      <span style={{ color: "var(--blue)" }}>{t.difficulty} (+{t.xp} XP)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Box 3: Esusu Rotating Pool */}
          <div className="glass-card" style={{ borderTop: "4px solid var(--crimson)" }}>
            <h3 style={{ fontSize: "1.25rem", color: "var(--crimson)", marginBottom: "16px" }}>Decentralized Esusu Ledger (Phase 5)</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px" }}>
                <span>Active Cycle Round:</span>
                <span style={{ fontWeight: 700, color: "var(--crimson)" }}>Round {esusuRound}</span>
              </div>
              <div>
                <h4 style={{ fontSize: "0.875rem", marginBottom: "8px", color: "var(--grey-light)" }}>Rotating Members:</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {members.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: m.active ? "rgba(139,26,43,0.15)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${m.active ? "var(--crimson)" : "transparent"}`,
                        padding: "8px",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span>{m.address}</span>
                      <span style={{ fontWeight: 700 }}>{m.active ? "Receiving Funds" : `Payout Round ${m.payoutRound}`}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "10px", fontSize: "0.875rem", cursor: "pointer" }} onClick={handleEsusuRotation}>
                Trigger Rotate Round Payout
              </button>
            </div>
          </div>

          {/* Box 4: Impact Consensus verification */}
          <div className="glass-card" style={{ borderTop: "4px solid var(--green)" }}>
            <h3 style={{ fontSize: "1.25rem", color: "var(--green)", marginBottom: "16px" }}>Impact Verification Pipeline (Phase 8)</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Peer Approvals:</span>
                  <span style={{ fontWeight: 700 }}>{peerApprovals} / 2 approvals</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Mentor Approved:</span>
                  <span style={{ fontWeight: 700, color: mentorApproved ? "var(--green)" : "var(--gold)" }}>
                    {mentorApproved ? "YES" : "PENDING"}
                  </span>
                </div>
              </div>
              <button className="btn-outline" style={{ width: "100%", padding: "10px", fontSize: "0.875rem", cursor: "pointer" }} onClick={triggerConsensus}>
                Start Consensus Execution
              </button>
              {consensusSuccess && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(30,138,94,0.1)", border: "1px solid var(--green)", borderRadius: "8px", padding: "12px" }}>
                  <div style={{ fontSize: "0.875rem", color: "var(--green)", fontWeight: 700, marginBottom: "4px" }}>Credits Minted Successfully!</div>
                  <div style={{ fontSize: "0.75rem", wordBreak: "break-all", fontFamily: "monospace" }}>
                    TxHash: {mintedTx}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Live system logs terminal */}
        <div style={{ background: "rgba(10,20,30,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.875rem", fontWeight: 700 }}>Active Terminal Streams (Winston logs)</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--green)" }}></div>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--gold)" }}></div>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--crimson)" }}></div>
            </div>
          </div>
          <div style={{ padding: "20px", height: "300px", overflowY: "auto", fontFamily: "monospace", fontSize: "0.875rem", display: "flex", flexDirection: "column", gap: "8px" }}>
            {logs.map((log, idx) => (
              <div key={idx} style={{ display: "flex", gap: "12px" }}>
                <span style={{ color: "var(--grey-dark)" }}>[{log.timestamp}]</span>
                <span
                  style={{
                    color:
                      log.type === "success"
                        ? "var(--green)"
                        : log.type === "warn"
                        ? "var(--gold)"
                        : log.type === "error"
                        ? "var(--crimson)"
                        : "var(--cream)",
                  }}
                >
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={logTerminalEndRef} />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
