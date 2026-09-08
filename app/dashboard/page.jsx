"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getOfflineTasks } from "@/lib/indexeddb";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function DashboardHome() {
  const router = useRouter();
  const { user } = useAuth();
  const [offlineCount, setOfflineCount] = useState(0);
  const [poolTotal, setPoolTotal] = useState(50000);
  const [activeRound, setActiveRound] = useState(2);

  const userName = user?.displayName || "Changemaker";

  useEffect(() => {
    // Check offline queue count
    try {
      const q = localStorage.getItem("akoka_offline_queue");
      const parsed = q ? JSON.parse(q) : [];
      setOfflineCount(parsed.length);
    } catch {
      setOfflineCount(0);
    }

    // Load pool total from backend or local storage
    fetch(`${BACKEND_URL}/v1/esusu/status`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.pool) {
          setPoolTotal(data.pool.totalVolume);
          setActiveRound(data.pool.round);
        }
      })
      .catch(() => {
        const saved = localStorage.getItem("akoka_esusu_pool");
        if (saved) setPoolTotal(parseInt(saved, 10));
      });
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>Welcome back, {userName}</h1>
        <button
          className="btn-primary"
          onClick={() => router.push("/dashboard/tasks")}
          style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "0.875rem", cursor: "pointer" }}
        >
          Explore All Challenges
        </button>
      </div>

      {/* Top Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card"
          style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "3px solid var(--blue)" }}
        >
          <div style={{ fontSize: "0.875rem", color: "var(--grey-light)" }}>Impact XP</div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>4,250</div>
          <div style={{ fontSize: "0.75rem", color: "var(--green)" }}>+150 this week</div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card"
          style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "3px solid var(--gold)" }}
        >
          <div style={{ fontSize: "0.875rem", color: "var(--grey-light)" }}>Esusu Smart Pool</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--gold)" }}>
            ₦{poolTotal.toLocaleString()}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--grey-light)" }}>
            Active: Round {activeRound} · Next in queue
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card"
          style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "3px solid var(--crimson)" }}
        >
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
            <button
              className="btn-primary"
              onClick={() => router.push("/dashboard/tasks")}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
            >
              Claim Challenge (+300 XP)
            </button>
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
            <button
              className="btn-outline"
              onClick={() => router.push("/dashboard/tasks")}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
            >
              Claim Challenge (+500 XP)
            </button>
          </div>
        </div>
      </div>

      {/* Sync Status / Offline Queue */}
      <div
        style={{
          marginTop: "20px",
          background: "rgba(0,0,0,0.3)",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 4px 0" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: offlineCount > 0 ? "var(--gold)" : "var(--green)",
                boxShadow: offlineCount > 0 ? "0 0 8px var(--gold)" : "0 0 8px var(--green)",
              }}
            ></div>
            Device CRDT Gateway Status
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--grey-light)", margin: 0 }}>
            {offlineCount > 0
              ? `${offlineCount} offline action(s) queued for sync.`
              : "Reconciled with Node.js Gateway. All offline actions synced."}
          </p>
        </div>
        <button
          className="btn-outline"
          onClick={() => router.push("/dashboard/tasks")}
          style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer" }}
        >
          Open Tasks Engine →
        </button>
      </div>
    </>
  );
}
