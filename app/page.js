"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SignupModal from "@/components/SignupModal";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      <SectionWrapper bg="dark" id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "80px" }}>
        {/* Animated Background */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.1, backgroundImage: "linear-gradient(var(--blue) 1px, transparent 1px), linear-gradient(90deg, var(--blue) 1px, transparent 1px)", backgroundSize: "50px 50px" }} className="animate-pulse-glow"></div>
        
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px" }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ flex: "1 1 400px" }}>
            <span className="badge" style={{ marginBottom: "24px", background: "rgba(201,168,76,0.1)", color: "var(--gold)", border: "1px solid var(--gold)" }}>The Lagos Model</span>
            <h1 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1.1, marginBottom: "24px", textShadow: "0 0 40px rgba(25, 111, 191, 0.3)" }}>
              Tradeable Impact & <br/><span style={{ color: "var(--gold)" }}>Grassroots Innovation</span>
            </h1>
            <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", marginBottom: "40px", maxWidth: "600px" }}>
              For the Lagos Megacity. We bypass legacy infrastructure to empower UNILAG youth through verifiable, decentralized skill building.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem", boxShadow: "0 0 20px rgba(201,168,76,0.2)", cursor: "pointer" }} onClick={() => setIsSignupOpen(true)}>Join the Network</button>
              <Link href="/console" style={{ textDecoration: "none" }}>
                <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "1.125rem", color: "var(--gold)", border: "1px solid var(--gold)", cursor: "pointer" }}>Interactive Dev Console</button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} style={{ flex: "1 1 400px", position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(25, 111, 191, 0.2)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(45deg, rgba(25,111,191,0.2), transparent)", zIndex: 2 }}></div>
            <Image 
              src="/lagos_ecosystem.jpg" 
              alt="Lagos Startup Ecosystem" 
              width={800} 
              height={600} 
              style={{ width: "100%", height: "auto", display: "block", transform: "scale(1.05)", transition: "transform 10s linear" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            />
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
          <span className="badge" style={{ marginBottom: "16px", background: "rgba(25,111,191,0.2)", color: "var(--blue)" }}>Core Engine</span>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>The Akoka Flywheel</h2>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "700px", margin: "0 auto" }}>
            A self-sustaining cycle of human capital development, local impact, and economic empowerment.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
          <div style={{ flex: "1 1 400px", position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <Image 
              src="/flywheel.jpg" 
              alt="Akoka Flywheel Concept" 
              width={600} 
              height={600} 
              style={{ width: "100%", height: "auto", display: "block" }} 
            />
          </div>

          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "32px" }}>
            <div className="glass-card" style={{ borderLeft: "4px solid var(--blue)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(25,111,191,0.2)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: "bold", marginBottom: "12px" }}>1</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "8px", color: "var(--blue)" }}>Learn</h3>
              <p style={{ color: "var(--grey-light)" }}>Gamified, micro-learning modules mapped to real-world skills — bypassing theoretical gaps.</p>
            </div>

            <div className="glass-card" style={{ borderLeft: "4px solid var(--crimson)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(139,26,43,0.2)", color: "var(--crimson)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: "bold", marginBottom: "12px" }}>2</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "8px", color: "var(--crimson)" }}>Impact</h3>
              <p style={{ color: "var(--grey-light)" }}>Applying acquired skills directly to solve pressing civic, environmental, and health challenges.</p>
            </div>

            <div className="glass-card" style={{ borderLeft: "4px solid var(--gold)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(201,168,76,0.2)", color: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: "bold", marginBottom: "12px" }}>3</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "8px", color: "var(--gold)" }}>Earn</h3>
              <p style={{ color: "var(--grey-light)" }}>Unlocking digital tokens, blockchain credentials, and Esusu-backed micro-funding.</p>
            </div>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "60px" }}>
          <button onClick={() => setIsSignupOpen(true)} className="glass-card" style={{ padding: 0, overflow: "hidden", textAlign: "left", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <Image src="/changemaker.jpg" alt="Changemaker" width={400} height={300} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "24px", borderTop: "4px solid var(--blue)" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "var(--cream)" }}>Changemaker</h3>
              <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>I'm a UNILAG student ready to solve community problems.</p>
            </div>
          </button>
          
          <button onClick={() => setIsSignupOpen(true)} className="glass-card" style={{ padding: 0, overflow: "hidden", textAlign: "left", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <Image src="/csr_funder.jpg" alt="CSR Funder" width={400} height={300} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "24px", borderTop: "4px solid var(--gold)" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "var(--cream)" }}>CSR Funder</h3>
              <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>I want to invest in verified grassroots impact.</p>
            </div>
          </button>

          <button onClick={() => setIsSignupOpen(true)} className="glass-card" style={{ padding: 0, overflow: "hidden", textAlign: "left", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <Image src="/employer.jpg" alt="Employer" width={400} height={300} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "24px", borderTop: "4px solid var(--green)" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "var(--cream)" }}>Employer</h3>
              <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>I want to verify candidates' real-world skills.</p>
            </div>
          </button>

          <button onClick={() => setIsSignupOpen(true)} className="glass-card" style={{ padding: 0, overflow: "hidden", textAlign: "left", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <Image src="/partner.jpg" alt="Partner" width={400} height={300} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "24px", borderTop: "4px solid var(--crimson)" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "var(--cream)" }}>Partner</h3>
              <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>I represent an institution or NGO.</p>
            </div>
          </button>
        </div>
      </SectionWrapper>

      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
}
