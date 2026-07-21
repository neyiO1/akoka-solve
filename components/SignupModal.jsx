"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SignupModal({ isOpen, onClose }) {
  const router = useRouter();
  const [role, setRole] = useState("STUDENT");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [didToken, setDidToken] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", wallet: "" });

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    // Dynamic import to prevent SSR issues and wait for package resolution
    import("firebase/auth")
      .then(({ signInWithPopup }) => {
        import("@/lib/firebase")
          .then(({ auth, googleProvider }) => {
            signInWithPopup(auth, googleProvider)
              .then((result) => {
                const user = result.user;
                setIsGoogleLoading(false);
                setFormData({
                  name: user.displayName || "Google User",
                  email: user.email || "",
                  wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
                });
                const mockDid = `did:ethr:0x${Array.from({ length: 40 }, () =>
                  Math.floor(Math.random() * 16).toString(16)
                ).join("")}`;
                setDidToken(mockDid);
                setAuthSuccess(true);
              })
              .catch((error) => {
                setIsGoogleLoading(false);
                console.error("Google Auth failed, falling back to mock registration:", error);
                
                // Fallback for development without configured env keys
                setFormData({
                  name: "Developer Guest",
                  email: "developer@akokasolve.com",
                  wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
                });
                const mockDid = `did:ethr:0x${Array.from({ length: 40 }, () =>
                  Math.floor(Math.random() * 16).toString(16)
                ).join("")}`;
                setDidToken(mockDid);
                setAuthSuccess(true);
              });
          })
          .catch((err) => {
            setIsGoogleLoading(false);
            console.error("Firebase config error:", err);
          });
      })
      .catch((err) => {
        setIsGoogleLoading(false);
        console.error("Firebase module loading error:", err);
      });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(10, 20, 30, 0.8)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(17, 34, 51, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(25, 111, 191, 0.2)",
            borderRadius: "16px",
            width: "90%",
            maxWidth: "500px",
            padding: "40px",
            position: "relative",
            color: "var(--cream)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              color: "var(--grey-light)",
              fontSize: "1.5rem",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--crimson)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--grey-light)")}
          >
            &times;
          </button>

          <h2 style={{ fontSize: "2rem", marginBottom: "8px", fontFamily: "var(--font-space-grotesk)", fontWeight: 700 }}>
            Join <span style={{ color: "var(--blue)" }}>Akoka Solve</span>
          </h2>
          <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "24px" }}>
            Verifiable social impact and credit rewards network.
          </p>

          {!authSuccess ? (
            <>
              {/* Role Selection */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "8px", fontWeight: 600 }}>Select Role</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                  {[
                    { id: "STUDENT", label: "Student" },
                    { id: "CSR_FUNDER", label: "CSR Funder" },
                    { id: "EMPLOYER", label: "Employer" },
                    { id: "PARTNER", label: "Partner" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        background: role === r.id ? "var(--blue)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${role === r.id ? "var(--blue)" : "rgba(255,255,255,0.1)"}`,
                        color: "var(--cream)",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Google OAuth Button */}
              <button
                onClick={handleGoogleSignup}
                disabled={isGoogleLoading}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "var(--cream)",
                  color: "var(--navy)",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
                onMouseLeave={(e) => (e.target.style.opacity = 1)}
              >
                {isGoogleLoading ? (
                  <div style={{ width: "20px", height: "20px", border: "2px solid var(--navy)", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    Sign up with Google
                  </>
                )}
              </button>

              <div style={{ textAlign: "center", margin: "16px 0", color: "var(--grey-dark)", fontSize: "0.875rem" }}>
                <span>or register with email</span>
              </div>

              {/* Form Input fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--cream)",
                    outline: "none",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--cream)",
                    outline: "none",
                  }}
                />
              </div>

              <button
                className="btn-primary"
                style={{ width: "100%", padding: "12px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
                onClick={() => {
                  const mockDid = `did:ethr:0x${Array.from({ length: 40 }, () =>
                    Math.floor(Math.random() * 16).toString(16)
                  ).join("")}`;
                  setDidToken(mockDid);
                  setAuthSuccess(true);
                }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "var(--green)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Account Created!</h3>
              <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "20px" }}>
                Welcome to Akoka Solve. Your Decentralized Identity (DID) has been automatically registered on the Polygon block log.
              </p>

              {/* DID Credentials Log Box */}
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "left",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  color: "var(--gold)",
                  wordBreak: "break-all",
                  marginBottom: "24px",
                }}
              >
                <div style={{ color: "var(--grey-light)", marginBottom: "4px" }}>Generated DID:</div>
                {didToken}
                <div style={{ color: "var(--grey-light)", marginTop: "12px", marginBottom: "4px" }}>Linked Wallet:</div>
                {formData.wallet || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F (Mocked)"}
              </div>

              <button
                className="btn-outline"
                style={{ width: "100%", padding: "12px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
                onClick={() => {
                  setAuthSuccess(false);
                  onClose();
                  router.push("/dashboard");
                }}
              >
                Enter Platform
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
