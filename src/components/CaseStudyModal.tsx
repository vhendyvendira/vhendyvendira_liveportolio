import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { CaseStudy } from '../types';
import ProgressiveImage from './ProgressiveImage';

interface CaseStudyModalProps {
  cs: CaseStudy;
  onClose: () => void;
}

export default function CaseStudyModal({ cs, onClose }: CaseStudyModalProps) {
  const [ctaHov, setCtaHov] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Calculate mask progress
  const maskString = (scrolledToBottom && ctaHov)
    ? "linear-gradient(to bottom, transparent, black 150px, black 100%)"
    : "linear-gradient(to bottom, transparent, black 150px, black calc(100% - 150px), transparent)";

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
        ref={containerRef}
        className="modal-panel"
        onScroll={(e: React.UIEvent<HTMLDivElement>) => {
          const target = e.currentTarget;
          const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 20;
          setScrolledToBottom(isBottom);
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
        style={{
          maskImage: maskString,
          WebkitMaskImage: maskString,
          transition: "mask-image 0.4s ease, -webkit-mask-image 0.4s ease"
        }}
      >
        {/* Progress Bar */}
        <motion.div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "#f26522",
            transformOrigin: "0%",
            zIndex: 100,
            scaleX
          }}
        />

        {/* Close Button UI fixed at top */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

        {/* Hero image with inner zoom effect */}
        <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#f5f5f5" }}>
          <motion.div
            style={{ width: "100%", height: "100%", opacity: heroOpacity, scale: heroScale }}
          >
            <ProgressiveImage 
              src={cs.image} 
              alt={cs.title} 
            />
          </motion.div>
        </div>

        {/* Body content */}
        <div style={{ padding: "3rem 4rem 4rem" }}>
          <motion.div 
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ fontSize: "11px", color: "#f26522", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{cs.index}</span>
            <div style={{ width: "1px", height: "10px", background: "rgba(0,0,0,0.1)" }} />
            <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>{cs.year}</span>
          </motion.div>

          <motion.h2 
            style={{ fontSize: "2.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "#1a1a1a", lineHeight: 1.1, marginBottom: "1.5rem" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {cs.title}
          </motion.h2>

          {/* Tags */}
          <motion.div 
            style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "2.5rem" }}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {cs.tags.map(t => (
              <span key={t} style={{ fontSize: "10px", padding: "4px 12px", borderRadius: "4px", background: "#f5f5f5", color: "rgba(0,0,0,0.5)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>{t}</span>
            ))}
          </motion.div>

          {/* Meta Grid - Staggered items */}
          <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            {([
              ["ROLE", cs.role],
              ["DURATION", cs.duration],
              ["LOCATION", cs.event],
              ["TEAM", cs.team],
              ["TOOLS", cs.tools.join(" · ")],
              ["PROJECT TYPE", cs.projectType]
            ] as [string, string][]).map(([k, v], idx) => (
              <motion.div 
                key={k}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (idx * 0.05), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", marginBottom: "4px", fontWeight: 400, letterSpacing: "0.08em" }}>{k}</div>
                <div style={{ fontSize: "13.5px", color: "#1a1a1a", fontWeight: 500, lineHeight: 1.4 }}>{v}</div>
              </motion.div>
            ))}
          </div>

          {/* Body Text with Drawing Divider */}
          <div style={{ position: "relative", paddingTop: "2.5rem" }}>
            <motion.div 
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(0,0,0,0.05)" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.45, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            
            <motion.p 
              style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(0,0,0,0.7)", marginBottom: "3rem", maxWidth: "100%" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {cs.description}
            </motion.p>

            <motion.div 
              style={{ marginBottom: "2.5rem" }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>PROBLEM</div>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(0,0,0,0.7)" }}>
                {cs.problem}
              </p>
            </motion.div>

            <motion.div 
              style={{ marginBottom: "2.5rem" }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>CHALLENGE</div>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#1a1a1a", fontWeight: 500 }}>
                {cs.challenge}
              </p>
            </motion.div>

            <motion.div 
              style={{ marginBottom: "2.5rem" }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>APPROACH</div>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(0,0,0,0.7)" }}>
                {cs.approach}
              </p>
            </motion.div>

            {/* Gallery — each case study uses a different layout based on cs.id */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
            {cs.gallery && cs.gallery.length === 4 && (() => {
              const imgs = cs.gallery;
              const imgStyle: React.CSSProperties = {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: "6px"
              };
              const ph: React.CSSProperties = {
                borderRadius: "6px",
                overflow: "hidden",
                background: "#f5f5f5"
              };

              // Layout 1: Gotham — 1 large top + 2 small bottom
              if (cs.id === 1) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ ...ph, height: "220px" }}><ProgressiveImage src={imgs[0]} alt="" /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                      <div style={{ ...ph, height: "120px" }}><ProgressiveImage src={imgs[1]} alt="" /></div>
                      <div style={{ ...ph, height: "120px" }}><ProgressiveImage src={imgs[2]} alt="" /></div>
                    </div>
                  </div>
                </div>
              );

              // Layout 2: MetaGo — masonry 3 kolom
              if (cs.id === 2) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", alignItems: "start" }}>
                    <div style={{ ...ph, height: "200px" }}><ProgressiveImage src={imgs[0]} alt="" /></div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ ...ph, height: "96px" }}><ProgressiveImage src={imgs[1]} alt="" /></div>
                      <div style={{ ...ph, height: "96px" }}><ProgressiveImage src={imgs[2]} alt="" /></div>
                    </div>
                    <div style={{ ...ph, height: "160px", marginTop: "20px" }}><ProgressiveImage src={imgs[3]} alt="" /></div>
                  </div>
                </div>
              );

              // Layout 3: Glance Fit — 4 portrait sejajar (cocok mobile screenshot)
              if (cs.id === 3) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
                    {imgs.map((src, i) => (
                      <div key={i} style={{ ...ph, height: "180px" }}><ProgressiveImage src={src} alt="" style={{ borderRadius: "10px" }} /></div>
                    ))}
                  </div>
                </div>
              );

              // Layout 4: Privy — editorial split (3fr + 2fr stack)
              if (cs.id === 4) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "6px" }}>
                    <div style={{ ...ph, height: "230px" }}><ProgressiveImage src={imgs[0]} alt="" /></div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ ...ph, height: "112px" }}><ProgressiveImage src={imgs[1]} alt="" /></div>
                      <div style={{ ...ph, height: "112px" }}><ProgressiveImage src={imgs[2]} alt="" /></div>
                    </div>
                  </div>
                </div>
              );

              // Layout 5: TV Research — 2 landscape sinematik
              if (cs.id === 5) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ ...ph, height: "130px" }}><ProgressiveImage src={imgs[0]} alt="" /></div>
                    <div style={{ ...ph, height: "130px" }}><ProgressiveImage src={imgs[1]} alt="" /></div>
                  </div>
                </div>
              );

              // Layout 6: K-Shop — offset overlap (tengah naik)
              if (cs.id === 6) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", alignItems: "center", padding: "16px 0" }}>
                    <div style={{ ...ph, height: "150px" }}><ProgressiveImage src={imgs[0]} alt="" /></div>
                    <div style={{ ...ph, height: "150px", transform: "translateY(-16px)", boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }}><ProgressiveImage src={imgs[1]} alt="" /></div>
                    <div style={{ ...ph, height: "150px", transform: "translateY(8px)" }}><ProgressiveImage src={imgs[2]} alt="" /></div>
                  </div>
                </div>
              );

              return null;
            })()}
            </motion.div>

            <motion.div 
              style={{ marginBottom: "3rem" }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ fontSize: "10px", color: "#f26522", fontFamily: "var(--font-mono)", marginBottom: "1rem", fontWeight: 600 }}>OUTCOME</div>
              <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#1a1a1a", fontWeight: 500 }}>
                {cs.outcome}
              </p>
            </motion.div>

            {/* CTA inline with content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{ marginTop: "2rem" }}
            >
              {cs.externalLink ? (
                <a
                  href={cs.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
