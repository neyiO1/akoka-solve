"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("Active");
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasksList = [];
        querySnapshot.forEach((doc) => {
          tasksList.push({ id: doc.id, ...doc.data() });
        });
        
        // Seed dummy tasks if DB is empty
        if (tasksList.length === 0 && user) {
          const dummyTasks = [
            { id: "task_1", title: "Tutor Year 1 CS Students", status: "Available", description: "Required proof: Photo of session + Attendance sheet.", assignedTo: null },
            { id: "task_2", title: "Akoka Canal Cleanup", status: "Available", description: "Clear waste from the canal segment near UNILAG gate.", assignedTo: null },
            { id: "task_3", title: "Deliver Medical Supplies", status: "Available", description: "Deliver 5 boxes of basic aid to the primary health center.", assignedTo: null }
          ];
          for (const t of dummyTasks) {
            await setDoc(doc(db, "tasks", t.id), t);
            tasksList.push(t);
          }
        }
        
        setTasks(tasksList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.code === 'permission-denied') {
          console.warn("Firestore rules are blocking access. Please update your Firebase Security Rules to allow read/write in test mode.");
        }
        
        // Fallback to dummy data so the UI doesn't break
        if (user) {
          setTasks([
            { id: "task_1", title: "Tutor Year 1 CS Students", status: "Available", description: "Required proof: Photo of session + Attendance sheet.", assignedTo: null },
            { id: "task_2", title: "Akoka Canal Cleanup", status: "Available", description: "Clear waste from the canal segment near UNILAG gate.", assignedTo: null }
          ]);
        }
      } finally {
        setIsFetching(false);
      }
    };
    
    if (!loading) fetchTasks();
  }, [loading, user]);

  const claimTask = async (taskId) => {
    if (!user) {
      alert("Please login to claim a task.");
      return;
    }
    try {
      await updateDoc(doc(db, "tasks", taskId), {
        status: "Active",
        assignedTo: user.uid
      });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: "Active", assignedTo: user.uid } : t));
    } catch (error) {
      console.error("Error claiming task:", error);
    }
  };

  const submitProof = async (taskId) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), {
        status: "Pending Review"
      });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: "Pending Review" } : t));
    } catch (error) {
      console.error("Error submitting proof:", error);
    }
  };

  if (loading || isFetching) {
    return <div style={{ color: "var(--cream)", padding: "20px" }}>Loading tasks...</div>;
  }

  // Filter tasks based on the tab
  let displayedTasks = [];
  if (activeTab === "Available") {
    displayedTasks = tasks.filter(t => t.status === "Available");
  } else if (activeTab === "Active") {
    displayedTasks = tasks.filter(t => t.status === "Active" && t.assignedTo === user?.uid);
  } else if (activeTab === "Pending Review") {
    displayedTasks = tasks.filter(t => t.status === "Pending Review" && t.assignedTo === user?.uid);
  } else if (activeTab === "Verified") {
    displayedTasks = tasks.filter(t => t.status === "Verified" && t.assignedTo === user?.uid);
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>My Tasks</h1>
        <button className="btn-primary" style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "0.875rem" }}>
          Submit Offline Proof
        </button>
      </div>

      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px", overflowX: "auto" }}>
        {["Available", "Active", "Pending Review", "Verified"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              background: "none", 
              border: "none", 
              color: activeTab === tab ? "var(--cream)" : "var(--grey-light)",
              fontWeight: activeTab === tab ? 700 : 500,
              fontSize: "1rem",
              cursor: "pointer",
              position: "relative",
              whiteSpace: "nowrap"
            }}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="underline" style={{ position: "absolute", bottom: "-13px", left: 0, right: 0, height: "2px", background: "var(--blue)" }} />
            )}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
        {displayedTasks.map(task => (
          <div key={task.id} className="glass-card" style={{ padding: "20px", borderLeft: `4px solid ${task.status === "Pending Review" ? "var(--gold)" : task.status === "Verified" ? "var(--green)" : "var(--blue)"}` }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>{task.title}</h3>
            <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "16px" }}>{task.description}</p>
            
            {task.status === "Available" && (
              <button className="btn-primary" style={{ padding: "6px 12px", fontSize: "0.875rem" }} onClick={() => claimTask(task.id)}>
                Claim Task
              </button>
            )}
            
            {task.status === "Active" && (
              <button className="btn-outline" style={{ padding: "6px 12px", fontSize: "0.875rem" }} onClick={() => submitProof(task.id)}>
                Submit Proof
              </button>
            )}
            
            {task.status === "Pending Review" && (
              <p style={{ color: "var(--gold)", fontSize: "0.875rem", margin: 0 }}>Awaiting Peer Review Consensus (1/2 Approvals)</p>
            )}
            
            {task.status === "Verified" && (
              <p style={{ color: "var(--green)", fontSize: "0.875rem", margin: 0 }}>Verified by Mentor. +200 XP</p>
            )}
          </div>
        ))}
        
        {displayedTasks.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--grey-light)" }}>
            No {activeTab.toLowerCase()} tasks found.
          </div>
        )}
      </div>
    </>
  );
}
