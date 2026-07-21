"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getOfflineTasks } from "@/lib/indexeddb";

export default function DashboardHome() {
  const [offlineTasks, setOfflineTasks] = useState([]);
  const [userName] = useState("Changemaker");
  
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await getOfflineTasks();
        setOfflineTasks(tasks || []);
      } catch (e) {
        console.error("IndexedDB error:", e);
      }
    };
    loadTasks();
  }, []);

  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Welcome back, {userName}</h1>
      
      {/* Top Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "3px solid var(--blue)" }}>
          <div style={{ fontSize: "0.875rem", color: "var(--grey-light)" }}>Impact XP</div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>4,250</div>
          <div style={{ fontSize: "0.75rem", color: "var(--green)" }}>+150 this week</div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "3px solid var(--gold)" }}>
          <div style={{ fontSize: "0.875rem", color: "var(--grey-light)" }}>Esusu Round</div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--gold)" }}>Round 2</div>
          <div style={{ fontSize: "0.75rem", color: "var(--grey-light)" }}>Next payout in 14 days</div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "3px solid var(--crimson)" }}>
          <div style={{ fontSize: "0.875rem", color: "var(--grey-light)" }}>Social Credits</div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--crimson)" }}>12</div>
          <div style={{ fontSize: "0.75rem", color: "var(--grey-light)" }}>ERC-1155 Polygon Minted</div>
        </motion.div>
      </div>

      {/* AI Recommended Task Feed */}
      <h2 style={{ fontSize: "1.25rem", marginTop: "10px", color: "var(--grey-light)" }}>AI Recommended for You</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        <div className="glass-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ height: "140px", background: "url('/changemaker.jpg') center/cover" }}></div>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--blue)", background: "rgba(43, 108, 176, 0.2)", padding: "4px 8px", borderRadius: "12px", fontWeight: 600 }}>Education</span>
              <span style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 600 }}>Medium</span>
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Tutor Year 1 CS Students</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--grey-light)", marginBottom: "16px" }}>
              Based on your velocity, AI recommends a mentoring session for Python 101.
            </p>
            <button className="btn-primary" style={{ width: "100%", padding: "10px", borderRadius: "8px", fontWeight: 600 }}>Accept Task (+150 XP)</button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ height: "140px", background: "url('/lagos_ecosystem.jpg') center/cover" }}></div>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--green)", background: "rgba(30, 138, 94, 0.2)", padding: "4px 8px", borderRadius: "12px", fontWeight: 600 }}>Environment</span>
              <span style={{ fontSize: "0.75rem", color: "var(--blue)", fontWeight: 600 }}>Easy</span>
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Akoka Canal Cleanup</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--grey-light)", marginBottom: "16px" }}>
              Join the Friday environmental sanitation team near the faculty of engineering.
            </p>
            <button className="btn-outline" style={{ width: "100%", padding: "10px", borderRadius: "8px", fontWeight: 600 }}>Accept Task (+100 XP)</button>
          </div>
        </div>
      </div>

      {/* Sync Status / Offline Queue */}
      <div style={{ marginTop: "20px", background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: offlineTasks.length > 0 ? "var(--gold)" : "var(--green)" }}></div>
            Device Sync Status
          </h3>
          <span style={{ fontSize: "0.875rem", color: "var(--grey-light)" }}>
            {offlineTasks.length} offline proofs queued
          </span>
        </div>
        {offlineTasks.length > 0 && (
          <div style={{ marginTop: "12px", fontSize: "0.875rem", color: "var(--gold)" }}>
            You have unsynced task proofs. They will automatically upload when network returns using CRDT merging.
          </div>
        )}
      </div>
    </>
  );
}
