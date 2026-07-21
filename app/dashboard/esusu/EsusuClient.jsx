"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePaystackPayment } from "react-paystack";
import { useAuth } from "@/context/AuthContext";

export default function EsusuClient() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [contributionAmount, setContributionAmount] = useState(10000); // Default ₦10,000
  const [poolTotal, setPoolTotal] = useState(50000); // Default pool total ₦50,000

  useEffect(() => {
    // Load pool total from local storage as a fallback
    const savedPool = localStorage.getItem("akoka_esusu_pool");
    if (savedPool) {
      setPoolTotal(parseInt(savedPool, 10));
    }
  }, []);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.email || "student@unilag.edu.ng",
    amount: contributionAmount * 100, // Amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY || "pk_test_462b857d474bdd15ff19252bedaee50b55e1f070",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    console.log("Paystack Payment complete! Reference:", reference);
    setPaymentSuccess(true);
    
    // Optimistically update the global pool total
    const newPoolTotal = poolTotal + contributionAmount;
    setPoolTotal(newPoolTotal);
    localStorage.setItem("akoka_esusu_pool", newPoolTotal.toString());
    
    setTimeout(() => {
      setPaymentSuccess(false);
      setIsModalOpen(false);
    }, 4000);
  };

  const onClosePaystack = () => {
    console.log("Paystack closed by user");
  };

  const handleContributeClick = () => {
    if (!user) {
      alert("Please login to contribute to the Esusu Pool.");
      return;
    }
    initializePayment({ onSuccess, onClose: onClosePaystack });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--crimson)" }}>Esusu Smart Pool</h1>
          <p style={{ color: "var(--grey-light)", marginTop: "-5px" }}>Community funding powered by Paystack.</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.875rem", color: "var(--grey-light)" }}>Total Pool Volume</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--green)" }}>₦{poolTotal.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        <div className="glass-card" style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ width: "120px", height: "120px", borderRadius: "50%", border: "8px solid var(--crimson)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 700 }}>
            R2
          </div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>Active Round: 2</h2>
          <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "20px" }}>Current recipient is receiving payouts.</p>
          <button 
            className="btn-primary" 
            style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "var(--crimson)", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setIsModalOpen(true)}
          >
            Fund the Pool
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Rotation Queue</h3>
          
          {[
            { address: "Alice (Round 1)", status: "Paid Out (₦50,000)", active: false },
            { address: "You (Round 2)", status: "Receiving", active: true },
            { address: "Bob (Round 3)", status: "Next", active: false },
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

      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)" }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card" 
              style={{ padding: "30px", width: "90%", maxWidth: "400px", borderTop: "4px solid var(--crimson)", position: "relative" }}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "var(--cream)", fontSize: "1.5rem", cursor: "pointer" }}
              >
                &times;
              </button>

              {!paymentSuccess ? (
                <>
                  <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Deposit to Esusu</h2>
                  <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "20px" }}>
                    Your Naira deposit will be securely processed by Paystack.
                  </p>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "0.875rem", color: "var(--grey-light)" }}>Contribution Amount (₦)</label>
                    <input 
                      type="number" 
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(Number(e.target.value))}
                      style={{ 
                        width: "100%", 
                        padding: "12px", 
                        borderRadius: "8px", 
                        background: "rgba(0,0,0,0.3)", 
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "white",
                        fontSize: "1rem"
                      }}
                    />
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.3)", padding: "15px", borderRadius: "8px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--grey-light)", fontSize: "0.875rem" }}>
                      <span>Email:</span>
                      <span>{user?.email || "Not logged in"}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-primary" 
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "var(--crimson)", cursor: "pointer", fontWeight: "bold" }}
                    onClick={handleContributeClick}
                  >
                    Pay ₦{contributionAmount.toLocaleString()} with Paystack
                  </button>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ width: "60px", height: "60px", background: "var(--green)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "2rem" }}
                  >
                    ✓
                  </motion.div>
                  <h2 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "var(--green)" }}>Payment Successful!</h2>
                  <p style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>
                    Paystack has verified your ₦{contributionAmount.toLocaleString()} deposit. The Community Pool has been updated!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
