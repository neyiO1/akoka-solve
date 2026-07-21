"use client";
import React, { useEffect, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "var(--font-inter)",
  themeVariables: {
    primaryColor: '#0D1B2A',
    primaryTextColor: '#F5F0E8',
    primaryBorderColor: '#C9A84C',
    lineColor: '#1A6FBF',
    secondaryColor: '#1A6FBF',
    tertiaryColor: '#8B1A2B'
  }
});

export default function MermaidDiagram({ chart, id }) {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-svg-${id}`, chart);
        setSvg(svg);
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };
    renderChart();
  }, [chart, id]);

  return (
    <div 
      style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", overflowX: "auto", display: "flex", justifyContent: "center", minHeight: "300px", alignItems: "center" }}
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}
