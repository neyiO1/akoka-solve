"use client";

import { motion } from "framer-motion";

export default function EsusuPage() {
  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--crimson)" }}>Esusu Smart Pool</h1>
      <p style={{ color: "var(--grey-light)", marginTop: "-10px", marginBottom: "20px" }}>Decentralized Web3 Ledger (Polygon Amoy Testnet)</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        <div className="glass-card" style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ width: "120px", height: "120px", borderRadius: "50%", border: "8px solid var(--crimson)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 700 }}>
            R2
          </div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>Active Round: 2</h2>
          <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "20px" }}>Current recipient is receiving payouts.</p>
          <button className="btn-primary" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "var(--crimson)" }}>Contribute to Pool</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Rotation Queue</h3>
          
          {[
            { address: "0x71C...976F (You)", status: "Paid Out (Round 1)", active: false },
            { address: "0x89F...A12B", status: "Receiving (Round 2)", active: true },
            { address: "0x3A2...6C2F", status: "Next (Round 3)", active: false },
          ].map((m, i) => (
            <div key={i} style={{ 
              background: m.active ? "rgba(139, 26, 43, 0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${m.active ? "var(--crimson)" : "rgba(255,255,255,0.1)"}`,
              padding: "16px",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{ fontWeight: 600 }}>{m.address}</span>
              <span style={{ fontSize: "0.875rem", color: m.active ? "var(--crimson)" : "var(--grey-light)" }}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
