"use client";
import { useState } from "react";

export default function EndpointCard({ method, path, title, description, children }) {
  const [expanded, setExpanded] = useState(false);
  
  const methodColor = {
    GET: "var(--blue)",
    POST: "var(--green)",
    PUT: "var(--gold)",
    DELETE: "var(--crimson)"
  }[method] || "var(--grey-light)";

  return (
    <div className="glass-card" style={{ marginBottom: "24px", padding: 0, overflow: "hidden" }}>
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{ padding: "20px 24px", display: "flex", gap: "16px", alignItems: "center", cursor: "pointer", background: expanded ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.2s ease" }}
      >
        <span style={{ fontWeight: "bold", padding: "6px 10px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", color: methodColor, fontSize: "0.875rem", minWidth: "60px", textAlign: "center", border: `1px solid ${methodColor}40` }}>{method}</span>
        <span style={{ fontFamily: "var(--font-inter), monospace", fontSize: "1.125rem", color: "var(--cream)", flex: 1, letterSpacing: "0.5px" }}>{path}</span>
        <span style={{ color: "var(--grey-light)", transition: "transform 0.3s ease", transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
      
      {expanded && (
        <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 style={{ fontSize: "1.25rem", margin: "24px 0 12px", color: "var(--cream)" }}>{title}</h3>
          <p style={{ color: "var(--grey-light)", marginBottom: "24px", lineHeight: 1.6 }}>{description}</p>
          {children}
        </div>
      )}
    </div>
  );
}
