"use client";
import SectionWrapper from "@/components/SectionWrapper";

export default function PlatformPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <SectionWrapper bg="dark" id="platform-hero" style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <span className="badge" style={{ marginBottom: "16px" }}>Bypass Innovation</span>
          <h1 style={{ fontSize: "3rem", marginBottom: "16px" }}>The Akoka Solve Platform</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "800px", margin: "0 auto" }}>
            Engineered for high-latency, low-bandwidth environments. We don't wait for legacy infrastructure to catch up.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="navy" id="lagos-model">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
          <div>
            <span className="badge" style={{ marginBottom: "16px" }}>The Solution</span>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "24px" }}>The Lagos Model of Bypass Innovation</h2>
            <p style={{ fontSize: "1.125rem", color: "var(--grey-light)", marginBottom: "24px" }}>
              Instead of waiting for legacy infrastructure to modernize, we architect <strong>Bypass Innovation</strong> — transforming systemic constraints into lean, scalable advantages.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px", padding: 0 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)" }}></div>
                <span>Low-bandwidth architecture (&lt;2MB)</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--blue)" }}></div>
                <span>Decentralized Identity (SSI) trust layer</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--crimson)" }}></div>
                <span>Local offline-sync capabilities</span>
              </li>
            </ul>
          </div>
          
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
            <svg viewBox="0 0 400 200" style={{ width: "100%", height: "auto" }}>
              <path d="M 50 150 Q 200 20 350 150" fill="none" stroke="var(--gold)" strokeWidth="4" strokeDasharray="10 10" className="animate-spin-slow" />
              <circle cx="50" cy="150" r="12" fill="var(--crimson)" />
              <circle cx="350" cy="150" r="12" fill="var(--blue)" />
              <text x="200" y="80" fill="var(--cream)" fontSize="14" textAnchor="middle" fontFamily="var(--font-space-grotesk)">Adaptive Platform Ecosystem</text>
              <text x="200" y="180" fill="var(--grey-dark)" fontSize="12" textAnchor="middle" opacity="0.5">Legacy Infrastructure Blockade</text>
              <rect x="150" y="160" width="100" height="20" fill="var(--grey-dark)" opacity="0.3" rx="4" />
            </svg>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="dark" id="esusu">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="badge" style={{ marginBottom: "16px" }}>Collateral-Free Capital</span>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>The Digital Esusu</h2>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "700px", margin: "0 auto" }}>
            Where Trust Becomes Programmable. We digitize the traditional Nigerian savings pool.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px", position: "relative" }}>
          <div className="glass-card" style={{ flex: "1 1 300px", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", margin: "0 auto 24px", background: "rgba(25, 111, 191, 0.2)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>1. Digitize the Pool</h3>
            <p style={{ color: "var(--grey-light)" }}>A trustless, transparent treasury pooled by community stakeholders and external funders.</p>
          </div>
          
          <div className="glass-card" style={{ flex: "1 1 300px", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", margin: "0 auto 24px", background: "rgba(30, 138, 94, 0.2)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>2. Smart Contract Verification</h3>
            <p style={{ color: "var(--grey-light)" }}>Local validators confirm the social impact outcome, triggering an automated consensus sequence.</p>
          </div>
          
          <div className="glass-card" style={{ flex: "1 1 300px", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", margin: "0 auto 24px", background: "rgba(201, 168, 76, 0.2)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>3. Immutable Issuance</h3>
            <p style={{ color: "var(--grey-light)" }}>Unforgeable credentials are minted, releasing collateral-free seed capital directly to the student.</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="navy" id="offline-mode">
        <div style={{ background: "linear-gradient(135deg, rgba(25, 111, 191, 0.2), rgba(13, 27, 42, 0.9))", border: "1px solid var(--blue)", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" style={{ marginBottom: "16px" }}><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 9.86a10.94 10.94 0 0 0-3 2.69M14.07 14.07A3 3 0 0 1 9.93 9.93M8.5 4.5A11 11 0 0 1 23 12.55M1 12.55A11 11 0 0 1 15.5 4.5"/></svg>
          <h2 style={{ fontSize: "2rem", marginBottom: "16px" }}>Extreme Low-Connectivity Native</h2>
          <p style={{ fontSize: "1.125rem", color: "var(--grey-light)", maxWidth: "600px", margin: "0 auto" }}>
            Service Worker sync, IndexedDB caching, and automated SMS/USSD fallbacks ensure students can complete tasks even in offline zones.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="dark" id="regulatory" style={{ overflow: "hidden" }}>
        <p style={{ textAlign: "center", color: "var(--grey-light)", marginBottom: "24px", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "2px" }}>Fully Compliant With</p>
        <div style={{ display: "flex", gap: "40px", overflowX: "auto", paddingBottom: "20px", opacity: 0.7, scrollbarWidth: "none" }}>
          <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>CBN / BOFIA</span>
          <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>NDPR 2019</span>
          <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>NITDA</span>
          <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>NYSC</span>
          <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>NDIC</span>
          <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>NIMC Act</span>
          <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>Cybercrimes Act 2015</span>
          <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>AML-CFT 2013</span>
        </div>
      </SectionWrapper>
    </div>
  );
}
