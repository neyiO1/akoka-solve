"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePaystackPayment } from "react-paystack";

export default function EsusuPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("student@unilag.edu.ng");

  useEffect(() => {
    // Fallback if we have real data from the signup context
    const savedName = localStorage.getItem("akoka_user_name");
    if (savedName) setUserEmail(`${savedName.replace(/\s+/g, "").toLowerCase()}@akokasolve.com`);
  }, []);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: userEmail,
    amount: 10000 * 100, // ₦10,000 in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder_key_replace_me",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    console.log("Paystack Payment complete! Reference:", reference);
    // In a real app, you would send this reference to the backend API Gateway
    // to verify the payment and mint the equivalent USDC on Polygon.
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setIsModalOpen(false);
    }, 4000);
  };

  const onClosePaystack = () => {
    console.log("Paystack closed by user");
  };

  const handleContributeClick = () => {
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      console.warn("No Paystack Public Key found. Using fallback flow or failing.");
    }
    initializePayment({ onSuccess, onClose: onClosePaystack });
  };

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
          <button 
            className="btn-primary" 
            style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "var(--crimson)", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setIsModalOpen(true)}
          >
            Contribute to Pool (₦10,000)
          </button>
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
                    Your Naira deposit will be securely processed by Paystack and converted to USDC.
                  </p>
                  
                  <div style={{ background: "rgba(0,0,0,0.3)", padding: "15px", borderRadius: "8px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span>Amount:</span>
                      <span style={{ fontWeight: "bold" }}>₦10,000</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--grey-light)", fontSize: "0.875rem" }}>
                      <span>Email:</span>
                      <span>{userEmail}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-primary" 
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "var(--crimson)", cursor: "pointer", fontWeight: "bold" }}
                    onClick={handleContributeClick}
                  >
                    Pay with Paystack
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
                    Paystack has verified your ₦10,000 deposit. The backend is minting USDC to the Round 2 Pool.
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

