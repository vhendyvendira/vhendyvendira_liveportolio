import React from 'react';
import { motion } from 'motion/react';

const COMPANIES = [
  { name: "Google", info: "Cloud & AI Research", logo: "/images-company-logo/google-logo.png" },
  { name: "IBM", info: "Enterprise Design Thinking", logo: "/images-company-logo/ibm-logo.png" },
  { name: "McKinsey", info: "Global Strategy & Insights", logo: "/images-company-logo/mckinsey-&-company.png" },
  { name: "Anthropic", info: "AI Alignment & Ethics", logo: "/images-company-logo/anthropic-logo.png", scale: 0.8 },
  { name: "RWS Group", info: "Linguistic & Tech Solutions", logo: "/images-company-logo/rws-group.png" }
];

export default function LearningSection({ visible }: { visible: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={visible ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        marginTop: "10rem",
        paddingTop: "5rem",
        borderTop: "1px solid rgba(0,0,0,0.04)",
        paddingBottom: "8rem"
      }}
    >
      <div style={{ marginBottom: "4rem" }}>
        <h3 style={{ 
          fontSize: "10px", 
          letterSpacing: "0.15em", 
          color: "rgba(0,0,0,0.35)", 
          fontFamily: "var(--font-mono)", 
          fontWeight: 600,
          textTransform: "uppercase",
          marginBottom: "1.25rem"
        }}>
          Learning from World-Class Companies
        </h3>
        <p style={{ 
          fontSize: "15px", 
          lineHeight: 1.65, 
          color: "rgba(0,0,0,0.5)",
          maxWidth: "480px",
          fontWeight: 400
        }}>
          Continuously learning from industry leaders—staying current through evolving skills and insights.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", 
        gap: "3rem 2rem" 
      }}>
        {COMPANIES.map((company, i) => (
          <motion.div 
            key={company.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={visible ? { opacity: 1, y: 0 } : {}}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', cursor: 'default' }}
          >
            <motion.div 
              style={{ marginBottom: "1rem", height: "16px", display: "flex", alignItems: "center" }}
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                referrerPolicy="no-referrer"
                style={{ 
                  height: company.scale ? `${100 * company.scale}%` : "100%", 
                  width: "auto",
                  display: "block"
                }} 
              />
            </motion.div>
            <div style={{ 
              fontSize: "15px", 
              fontWeight: 600, 
              color: "#1a1a1a", 
              marginBottom: "6px",
              letterSpacing: "-0.01em"
            }}>
              {company.name}
            </div>
            <div style={{ 
              fontSize: "11px", 
              color: "rgba(0,0,0,0.35)", 
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              letterSpacing: "0.02em"
            }}>
              {company.info}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
