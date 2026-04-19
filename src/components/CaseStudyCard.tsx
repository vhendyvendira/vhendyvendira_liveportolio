import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';

interface CaseStudyCardProps {
  cs: CaseStudy;
  index: number;
  navigate: (path: string) => void;
  visible?: boolean;
  key?: React.Key;
}

export default function CaseStudyCard({ cs, index, navigate, visible = true }: CaseStudyCardProps) {
  const [hov, setHov] = useState(false);
  
  return (
    <motion.div
      className="case-study-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigate(`/work/${cs.slug}`)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={visible ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-100px 0px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, // Maintains staggering
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <div className="card-container">
        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "11px", color: "#f26522", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{cs.index}</span>
            <div style={{ width: "1px", height: "10px", background: "rgba(0,0,0,0.1)" }} />
            <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>{cs.year}</span>
          </div>
          
          <h3 style={{ 
            fontSize: "24px", fontWeight: 600, letterSpacing: "-0.025em", color: "#1a1a1a", 
            marginBottom: "0.75rem", transition: "color 0.2s ease"
          }}>{cs.title}</h3>
          
          <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(0,0,0,0.6)", marginBottom: "1.5rem", maxWidth: "480px" }}>
            {cs.description.split("—")[0].trim().replace(/\.$/, "")}
          </p>
          
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {cs.tags.map(t => (
              <span key={t} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "white", border: "1px solid rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.5)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
          
          <div style={{ 
            fontSize: "12px", color: "#f26522", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", 
            opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-8px)", 
            transition: "all 0.2s ease" 
          }}>
            <span>Review Full Specs</span><span style={{ fontSize: "14px" }}>→</span>
          </div>
        </div>

        {/* Image */}
        <div className="card-image-wrap" style={{ 
          background: "#fafafa",
          boxShadow: hov ? "0 20px 40px rgba(0,0,0,0.06)" : "0 4px 12px rgba(0,0,0,0.02)", 
          transform: hov ? "translateY(-4px)" : "translateY(0)" 
        }}>
          <img 
            src={cs.image} 
            alt={cs.title} 
            referrerPolicy="no-referrer"
            style={{ opacity: hov ? 1 : 0.9, transition: "opacity 0.3s ease" }} 
          />
        </div>
      </div>
    </motion.div>
  );
}
