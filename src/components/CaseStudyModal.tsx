import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  cs: CaseStudy;
  onClose: () => void;
}

export default function CaseStudyModal({ cs, onClose }: CaseStudyModalProps) {
  const [ctaHov, setCtaHov] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      role="dialog" aria-modal="true" aria-label={cs.title}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ background: "rgba(0, 0, 0, 0.15)" }} // Slightly darker for smoother blend
    >
      <motion.div 
        className="modal-panel"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
      >
        {/* Close Button UI fixed at top */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

        {/* Hero image */}
        <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#f5f5f5" }}>
          <img src={cs.image} alt={cs.title} referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Body content */}
        <div style={{ padding: "3rem 4rem 4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "11px", color: "#f26522", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{cs.index}</span>
            <div style={{ width: "1px", height: "10px", background: "rgba(0,0,0,0.1)" }} />
            <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>{cs.year}</span>
          </div>

          <h2 style={{ fontSize: "2.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "#1a1a1a", lineHeight: 1.1, marginBottom: "1.5rem" }}>{cs.title}</h2>

          {/* Tags */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {cs.tags.map(t => (
              <span key={t} style={{ fontSize: "10px", padding: "4px 12px", borderRadius: "4px", background: "#f5f5f5", color: "rgba(0,0,0,0.5)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>{t}</span>
            ))}
          </div>

          {/* Meta Grid */}
          <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            {([["ROLE", cs.role], ["DURATION", cs.duration], ["LOCATION", cs.event]] as const).map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "4px", fontWeight: 600 }}>{k}</div>
                <div style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Body Text */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "2.5rem" }}>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(0,0,0,0.7)", marginBottom: "3rem", maxWidth: "100%" }}>
              {cs.description}
            </p>

            <div style={{ marginBottom: "3rem" }}>
              <div style={{ fontSize: "10px", color: "#f26522", fontFamily: "var(--font-mono)", marginBottom: "1rem", fontWeight: 600 }}>OUTCOME</div>
              <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#1a1a1a", fontWeight: 500 }}>
                {cs.outcome}
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          {cs.externalLink ? (
            <a
              href={cs.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#f26522",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
            >
              Launch Project
              <span style={{ transition: "transform 0.2s ease", transform: ctaHov ? "translate(2px, -2px)" : "none" }}>↗</span>
            </a>
          ) : (
            <div style={{ fontSize: "14px", color: "rgba(0,0,0,0.3)", fontWeight: 500 }}>
              Full report pending release
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
