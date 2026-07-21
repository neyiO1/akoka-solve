"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  return (
    <>
      <SectionWrapper bg="dark" id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Animated Background */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.1, backgroundImage: "linear-gradient(var(--blue) 1px, transparent 1px), linear-gradient(90deg, var(--blue) 1px, transparent 1px)", backgroundSize: "50px 50px" }} className="animate-pulse-glow"></div>
        
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="badge" style={{ marginBottom: "24px" }}>App Size: &lt;2MB</span>
            <h1 style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1.1, marginBottom: "24px" }}>
              Tradeable Impact & <br/><span style={{ color: "var(--gold)" }}>Grassroots Innovation</span>
            </h1>
            <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
              For the Lagos Megacity. We bypass legacy infrastructure to empower UNILAG youth through verifiable, decentralized skill building.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>Join the Network</button>
              <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>Explore Architecture</button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="navy" id="problem">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>The Twin Chasm</h2>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "700px", margin: "0 auto" }}>
            Lagos presents an unprecedented concentration of human capital, yet faces systemic gridlock.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginBottom: "60px" }}>
          <div className="glass-card" style={{ borderTop: "4px solid var(--blue)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--blue)" }}>1. The Skill Gap</h3>
            <p style={{ color: "var(--grey-light)" }}>
              A massive disconnect between theoretical university curricula and the practical, market-ready skills required by the modern economy.
            </p>
          </div>
          <div className="glass-card" style={{ borderTop: "4px solid var(--crimson)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--crimson)" }}>2. The Collateral Gap</h3>
            <p style={{ color: "var(--grey-light)" }}>
              Millions of capable youth are locked out of seed capital due to a lack of formal credit history or physical collateral.
            </p>
          </div>
        </div>

        <div style={{ background: "var(--navy)", padding: "32px", borderRadius: "12px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>
            "The traditional 'infrastructure-first' paradigm has failed. We cannot wait for legacy systems to catch up."
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="dark" id="intro">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem" }}>Introducing Akoka Solve</h2>
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", alignItems: "center" }}>
          <div style={{ flex: "1 1 250px", textAlign: "right" }}>
            <h3 style={{ fontSize: "1.25rem", color: "var(--gold)", marginBottom: "12px" }}>The Platform</h3>
            <p style={{ color: "var(--grey-light)" }}>A gamified mobile-first platform that connects UNILAG students to real-world community challenges.</p>
          </div>
          
          <div style={{ width: "120px", height: "120px", flexShrink: 0 }}>
            <svg viewBox="0 0 100 100" className="animate-spin-slow">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle cx="50" cy="10" r="6" fill="var(--gold)" />
              <circle cx="15" cy="70" r="6" fill="var(--crimson)" />
              <circle cx="85" cy="70" r="6" fill="var(--blue)" />
              <path d="M 50 10 L 15 70 L 85 70 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </svg>
          </div>

          <div style={{ flex: "1 1 250px", textAlign: "left" }}>
            <h3 style={{ fontSize: "1.25rem", color: "var(--blue)", marginBottom: "12px" }}>The Mission</h3>
            <p style={{ color: "var(--grey-light)" }}>Solve local problems, earn verifiable credentials on the blockchain, and unlock collateral-free funding.</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="navy" id="flywheel" className="section">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="badge" style={{ marginBottom: "16px" }}>Core Engine</span>
          <h2 style={{ fontSize: "2.5rem" }}>The Akoka Flywheel</h2>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "700px", margin: "0 auto" }}>
            A self-sustaining cycle of human capital development, local impact, and economic empowerment.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", position: "relative" }}>
          <div className="glass-card" style={{ borderTop: "4px solid var(--blue)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--blue)", color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>1</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--blue)" }}>Learn</h3>
            <p style={{ color: "var(--grey-light)" }}>
              Gamified, micro-learning modules mapped to real-world, market-ready skills — bypassing the theoretical gap of traditional education.
            </p>
          </div>

          <div className="glass-card" style={{ borderTop: "4px solid var(--crimson)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--crimson)", color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>2</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--crimson)" }}>Impact</h3>
            <p style={{ color: "var(--grey-light)" }}>
              Applying acquired skills directly to solve pressing civic, environmental, and health challenges within the Akoka community.
            </p>
          </div>

          <div className="glass-card" style={{ borderTop: "4px solid var(--gold)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--gold)", color: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>3</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--gold)" }}>Earn</h3>
            <p style={{ color: "var(--grey-light)" }}>
              Unlocking digital tokens, blockchain-verified credentials, and Esusu-backed micro-funding upon verified project completion.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="dark" id="impact-stats">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "24px", textAlign: "center" }}>
          <div className="glass-card">
            <h3 style={{ fontSize: "2.5rem", color: "var(--gold)", marginBottom: "8px" }}>40k+</h3>
            <p style={{ color: "var(--grey-light)" }}>UNILAG Students</p>
          </div>
          <div className="glass-card">
            <h3 style={{ fontSize: "2.5rem", color: "var(--crimson)", marginBottom: "8px" }}>42.5%</h3>
            <p style={{ color: "var(--grey-light)" }}>Youth Unemployment Addressed</p>
          </div>
          <div className="glass-card">
            <h3 style={{ fontSize: "2.5rem", color: "var(--blue)", marginBottom: "8px" }}>&lt;2MB</h3>
            <p style={{ color: "var(--grey-light)" }}>Mobile App Size</p>
          </div>
          <div className="glass-card">
            <h3 style={{ fontSize: "2.5rem", color: "var(--green)", marginBottom: "8px" }}>8:1</h3>
            <p style={{ color: "var(--grey-light)" }}>SROI Target</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="navy" id="vision-cta">
        <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "800px", margin: "0 auto 60px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "24px" }}>From Human Capital to Empowered Agency</h2>
          <p style={{ fontSize: "1.25rem", color: "var(--cream)" }}>
            We are building a stakeholder economy where verified social outcomes are transformed into economic value. Akoka Solve is laying the groundwork for an inclusive, sustainable, and youth-driven Lagos.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginBottom: "60px" }}>
          <button className="glass-card" style={{ borderLeft: "4px solid var(--crimson)", textAlign: "left", cursor: "pointer" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Changemaker</h3>
            <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>I'm a UNILAG student ready to solve community problems.</p>
          </button>
          <button className="glass-card" style={{ borderLeft: "4px solid var(--gold)", textAlign: "left", cursor: "pointer" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>CSR Funder</h3>
            <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>I want to invest in verified grassroots impact.</p>
          </button>
          <button className="glass-card" style={{ borderLeft: "4px solid var(--blue)", textAlign: "left", cursor: "pointer" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Employer</h3>
            <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>I want to verify candidates' real-world skills.</p>
          </button>
          <button className="glass-card" style={{ borderLeft: "4px solid var(--green)", textAlign: "left", cursor: "pointer" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Partner</h3>
            <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>I represent an institution or NGO.</p>
          </button>
        </div>
      </SectionWrapper>
    </>
  );
}
