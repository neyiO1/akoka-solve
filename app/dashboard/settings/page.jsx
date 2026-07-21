"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function SettingsPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
    localStorage.removeItem("akoka_user_name");
    router.push("/");
  };

  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Settings</h1>
      
      <div className="glass-card" style={{ padding: "30px", maxWidth: "600px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--grey-light)" }}>Decentralized ID (DID)</label>
            <input type="text" readOnly value="did:ethr:0x3f8a9...9c21" style={{ width: "100%", padding: "12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "var(--cream)" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--grey-light)" }}>Linked Wallet Address</label>
            <input type="text" readOnly value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" style={{ width: "100%", padding: "12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "var(--cream)" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--grey-light)" }}>Email Notifications</label>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)", padding: "16px", borderRadius: "8px" }}>
              <span>Receive alerts for new AI tasks</span>
              <div style={{ width: "40px", height: "20px", background: "var(--blue)", borderRadius: "10px", position: "relative" }}>
                <div style={{ width: "16px", height: "16px", background: "var(--cream)", borderRadius: "50%", position: "absolute", top: "2px", right: "2px" }}></div>
              </div>
            </div>
          </div>

          <button 
            className="btn-outline" 
            style={{ marginTop: "20px", padding: "12px", borderRadius: "8px", color: "var(--crimson)", borderColor: "var(--crimson)", fontWeight: 600, cursor: "pointer" }}
            onClick={handleSignOut}
          >
            Sign Out
          </button>

        </div>
      </div>
    </>
  );
}
