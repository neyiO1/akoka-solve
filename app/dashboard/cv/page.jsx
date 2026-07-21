"use client";

export default function CVPage() {
  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Digital CV</h1>
      <p style={{ color: "var(--grey-light)", marginTop: "-10px", marginBottom: "20px" }}>Verified by NYSC & UNILAG</p>

      <div className="glass-card" style={{ padding: "40px", maxWidth: "800px", borderTop: "4px solid var(--blue)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "2rem" }}>Changemaker</h2>
            <p style={{ color: "var(--blue)" }}>Tier 2 Verifiable Contributor</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ background: "var(--green)", color: "var(--navy)", padding: "4px 8px", borderRadius: "8px", fontWeight: 700, fontSize: "0.875rem", display: "inline-block", marginBottom: "8px" }}>NYSC Approved</div>
            <div style={{ fontSize: "0.75rem", color: "var(--grey-light)", fontFamily: "monospace" }}>Hash: 0x3f8a...9c21</div>
          </div>
        </div>

        <h3 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "var(--grey-light)" }}>Verified Social Impact</h3>
        <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
          <li style={{ background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <span>Delivered 100 Medical Supplies to Yaba Clinic</span>
            <span style={{ color: "var(--green)", fontWeight: 700 }}>VERIFIED</span>
          </li>
          <li style={{ background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <span>Organized Akoka Canal Cleanup</span>
            <span style={{ color: "var(--green)", fontWeight: 700 }}>VERIFIED</span>
          </li>
        </ul>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-primary" style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: 600 }}>Download PDF</button>
          <button className="btn-outline" style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: 600 }}>Share to LinkedIn</button>
        </div>
      </div>
    </>
  );
}
