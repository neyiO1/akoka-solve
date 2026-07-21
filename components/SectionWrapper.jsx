"use client";
import { motion } from "framer-motion";

export default function SectionWrapper({ children, bg = "navy", id = "", className = "", style = {} }) {
  let background = "var(--navy)";
  let color = "var(--cream)";
  
  if (bg === "cream") {
    background = "var(--cream)";
    color = "var(--navy)";
  } else if (bg === "dark") {
    background = "linear-gradient(135deg, var(--navy), #1a2c42)";
  } else if (bg === "transparent") {
    background = "transparent";
  }

  return (
    <section id={id} className={`section ${className}`} style={{ background, color, ...style }}>
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
