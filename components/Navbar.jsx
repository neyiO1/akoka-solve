"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import SignupModal from "./SignupModal";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 49,
        }}
      >
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            transition: "all 0.3s ease",
            background: scrolled ? "rgba(13, 27, 42, 0.85)" : "transparent",
            backdropFilter: scrolled ? "blur(10px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
          }}
        >
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "80px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Logo size={40} />
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "1.25rem", color: "var(--cream)" }}>
                <span style={{ color: "var(--blue)" }}>AKOKA</span> SOLVE
              </span>
            </Link>
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <Link href="/platform" style={{ color: "var(--cream)", fontWeight: 500, transition: "color 0.2s ease" }} onMouseEnter={(e) => e.target.style.color = "var(--gold)"} onMouseLeave={(e) => e.target.style.color = "var(--cream)"}>Platform</Link>
              <Link href="/impact" style={{ color: "var(--cream)", fontWeight: 500, transition: "color 0.2s ease" }} onMouseEnter={(e) => e.target.style.color = "var(--green)"} onMouseLeave={(e) => e.target.style.color = "var(--cream)"}>Impact</Link>

              <Link href="/dashboard" className="btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
                Dashboard
              </Link>
              {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`} alt="Profile" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid var(--blue)" }} />
                  <button 
                    onClick={logout}
                    style={{ background: "none", border: "none", color: "var(--crimson)", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="btn-primary" 
                  style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", cursor: "pointer" }}
                  onClick={() => setIsSignupOpen(true)}
                >
                  Join Platform
                </button>
              )}
            </div>
          </div>
        </motion.header>
      </motion.div>

      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
}
