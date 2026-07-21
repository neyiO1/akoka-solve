"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminRightsPage() {
  const { user, isAdmin, role, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAdmin) return;
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data());
        });
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Fallback for UI testing
        if (user) {
          setUsers([
            { uid: user.uid, email: user.email, displayName: user.displayName, role: "master_admin" },
            { uid: "mock_2", email: "testuser@gmail.com", displayName: "Test User", role: "user" }
          ]);
        }
      } finally {
        setFetching(false);
      }
    };
    
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const toggleAdminRole = async (targetUserId, currentRole) => {
    if (role !== "master_admin") {
      alert("Only the Master Admin can change roles.");
      return;
    }
    
    try {
      const newRole = currentRole === "admin" ? "user" : "admin";
      await updateDoc(doc(db, "users", targetUserId), {
        role: newRole
      });
      
      setUsers(users.map(u => u.uid === targetUserId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (loading || fetching) {
    return <div style={{ padding: "40px", color: "var(--cream)" }}>Loading Admin Dashboard...</div>;
  }

  if (!isAdmin) return null;

  return (
    <div style={{ padding: "20px", background: "rgba(13,27,42,0.5)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "8px", color: "var(--cream)" }}>Admin Rights Management</h1>
      <p style={{ color: "var(--grey-light)", marginBottom: "32px" }}>
        Master Admin Panel: Manage which registered users have administrative privileges.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {users.map((u) => (
          <div key={u.uid} style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            padding: "16px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img src={u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName || 'User'}&background=random`} alt="Profile" style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.125rem", color: "var(--cream)" }}>{u.displayName}</div>
                <div style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>{u.email}</div>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <span style={{ 
                padding: "6px 12px", 
                borderRadius: "20px", 
                fontSize: "0.75rem", 
                fontWeight: 700,
                textTransform: "uppercase",
                background: u.role === "master_admin" ? "rgba(201,168,76,0.2)" : u.role === "admin" ? "rgba(220,38,38,0.2)" : "rgba(30,138,94,0.2)",
                color: u.role === "master_admin" ? "var(--gold)" : u.role === "admin" ? "var(--crimson)" : "var(--green)",
                border: `1px solid ${u.role === "master_admin" ? "rgba(201,168,76,0.3)" : u.role === "admin" ? "rgba(220,38,38,0.3)" : "rgba(30,138,94,0.3)"}`
              }}>
                {u.role}
              </span>

              {role === "master_admin" && u.role !== "master_admin" && (
                <button
                  onClick={() => toggleAdminRole(u.uid, u.role)}
                  className="btn-outline"
                  style={{
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    borderColor: u.role === "admin" ? "var(--grey-light)" : "var(--crimson)",
                    color: u.role === "admin" ? "var(--grey-light)" : "var(--crimson)"
                  }}
                >
                  {u.role === "admin" ? "Revoke Admin" : "Make Admin"}
                </button>
              )}
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--grey-light)" }}>
            No users registered yet.
          </div>
        )}
      </div>
    </div>
  );
}
