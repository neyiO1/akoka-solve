"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CVPage() {
  const cvRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cvRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Akoka_Solve_Impact_CV.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    }
    setIsDownloading(false);
  };

  const handleLinkedInShare = () => {
    const text = encodeURIComponent("I just verified my social impact with Akoka Solve! 🌍\n\nCheck out my Decentralized CV on the Akoka Solve platform.\n\n#AkokaSolve #SocialImpact #Web3 #Changemaker");
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${text}`, "_blank");
  };

  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Digital CV</h1>
      <p style={{ color: "var(--grey-light)", marginTop: "-10px", marginBottom: "20px" }}>Verified by Akoka Solve Platform</p>

      <div 
        ref={cvRef}
        className="glass-card" 
        style={{ padding: "40px", maxWidth: "800px", borderTop: "4px solid var(--blue)", background: "var(--navy)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "2rem", color: "var(--cream)" }}>Changemaker</h2>
            <p style={{ color: "var(--blue)" }}>Tier 2 Verifiable Contributor</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ background: "var(--green)", color: "var(--navy)", padding: "4px 8px", borderRadius: "8px", fontWeight: 700, fontSize: "0.875rem", display: "inline-block", marginBottom: "8px" }}>Platform Verified</div>
            <div style={{ fontSize: "0.75rem", color: "var(--grey-light)", fontFamily: "monospace" }}>Hash: 0x3f8a...9c21</div>
          </div>
        </div>

        <h3 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "var(--grey-light)" }}>Verified Social Impact</h3>
        <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
          <li style={{ background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", display: "flex", justifyContent: "space-between", color: "var(--cream)" }}>
            <span>Delivered 100 Medical Supplies to Yaba Clinic</span>
            <span style={{ color: "var(--green)", fontWeight: 700 }}>VERIFIED</span>
          </li>
          <li style={{ background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", display: "flex", justifyContent: "space-between", color: "var(--cream)" }}>
            <span>Organized Akoka Canal Cleanup</span>
            <span style={{ color: "var(--green)", fontWeight: 700 }}>VERIFIED</span>
          </li>
        </ul>

        <div data-html2canvas-ignore style={{ display: "flex", gap: "12px" }}>
          <button 
            className="btn-primary" 
            style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: 600, cursor: "pointer", opacity: isDownloading ? 0.7 : 1 }}
            onClick={handleDownloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
          <button 
            className="btn-outline" 
            style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
            onClick={handleLinkedInShare}
          >
            Share to LinkedIn
          </button>
        </div>
      </div>
    </>
  );
}
