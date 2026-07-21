"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpecPanel({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", marginBottom: "16px", overflow: "hidden", background: "rgba(255,255,255,0.02)" }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: isOpen ? "rgba(255,255,255,0.05)" : "transparent", border: "none", color: "var(--cream)", cursor: "pointer", fontSize: "1.125rem", fontWeight: 500, transition: "background 0.2s ease" }}
      >
        <span>{title}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div style={{ padding: "0 20px 20px 20px", color: "var(--grey-light)", lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "16px", paddingTop: "16px" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
