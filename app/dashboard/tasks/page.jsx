"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>My Tasks</h1>
        <button className="btn-primary" style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "0.875rem" }}>
          Submit Offline Proof
        </button>
      </div>

      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
        {["Active", "Pending Review", "Verified"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              background: "none", 
              border: "none", 
              color: activeTab === tab ? "var(--cream)" : "var(--grey-light)",
              fontWeight: activeTab === tab ? 700 : 500,
              fontSize: "1rem",
              cursor: "pointer",
              position: "relative"
            }}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="underline" style={{ position: "absolute", bottom: "-13px", left: 0, right: 0, height: "2px", background: "var(--blue)" }} />
            )}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
        {activeTab === "Active" && (
          <div className="glass-card" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Tutor Year 1 CS Students</h3>
            <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "16px" }}>Started 2 days ago. Required proof: Photo of session + Attendance sheet.</p>
            <div style={{ background: "rgba(255,255,255,0.1)", height: "8px", borderRadius: "4px", width: "100%", overflow: "hidden" }}>
              <div style={{ width: "30%", height: "100%", background: "var(--blue)" }}></div>
            </div>
          </div>
        )}

        {activeTab === "Pending Review" && (
          <div className="glass-card" style={{ padding: "20px", borderLeft: "4px solid var(--gold)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Akoka Canal Cleanup</h3>
            <p style={{ color: "var(--gold)", fontSize: "0.875rem" }}>Awaiting Peer Review Consensus (1/2 Approvals)</p>
          </div>
        )}

        {activeTab === "Verified" && (
           <div className="glass-card" style={{ padding: "20px", borderLeft: "4px solid var(--green)" }}>
           <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Deliver Medical Supplies</h3>
           <p style={{ color: "var(--green)", fontSize: "0.875rem" }}>Verified by Mentor. +200 XP</p>
         </div>
        )}
      </div>
    </>
  );
}
