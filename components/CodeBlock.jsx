"use client";
export default function CodeBlock({ code, language = "json" }) {
  return (
    <div style={{ position: "relative", background: "#0a0a0a", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", marginTop: "16px" }}>
      <div style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem", color: "var(--grey-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>{language}</span>
        <button onClick={() => navigator.clipboard.writeText(code)} style={{ background: "none", border: "none", color: "var(--cream)", cursor: "pointer", fontSize: "0.75rem" }}>Copy</button>
      </div>
      <pre style={{ margin: 0, padding: "16px", overflowX: "auto", fontSize: "0.875rem", color: "var(--cream)", fontFamily: "var(--font-inter), monospace", lineHeight: 1.5 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
