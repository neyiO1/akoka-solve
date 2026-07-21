"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [userName] = useState("Changemaker");
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/dashboard" },
    { name: "My Tasks", path: "/dashboard/tasks" },
    { name: "Esusu Pool", path: "/dashboard/esusu" },
    { name: "Digital CV", path: "/dashboard/cv" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "var(--navy)", 
      color: "var(--cream)",
      display: "flex",
      flexDirection: "column",
      paddingTop: "80px"
    }}>
      
      <div style={{ flex: 1, display: "flex", maxWidth: "1200px", margin: "0 auto", width: "100%", gap: "24px", padding: "20px" }}>
        
        {/* Sidebar */}
        <div className="dashboard-sidebar" style={{ 
          width: "250px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "10px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "16px",
          padding: "20px",
          height: "fit-content"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              C
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{userName}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--green)" }}>Tier 2 Verified</div>
            </div>
          </div>

          {links.map((item, i) => {
            const isActive = pathname === item.path;
            return (
              <Link key={i} href={item.path} style={{
                background: isActive ? "rgba(43, 108, 176, 0.2)" : "transparent",
                color: isActive ? "var(--blue)" : "var(--grey-light)",
                border: `1px solid ${isActive ? "rgba(43, 108, 176, 0.3)" : "transparent"}`,
                padding: "12px 16px",
                borderRadius: "8px",
                textAlign: "left",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={(e) => e.target.style.background = isActive ? "rgba(43, 108, 176, 0.2)" : "transparent"}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Main Feed Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
