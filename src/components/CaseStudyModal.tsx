import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { CaseStudy } from '../types';
import ProgressiveImage from './ProgressiveImage';

interface CaseStudyModalProps {
  cs: CaseStudy;
  onClose: () => void;
  navigate: (path: string) => void;
}

export default function CaseStudyModal({ cs, onClose, navigate }: CaseStudyModalProps) {
  const [ctaHov, setCtaHov] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Cinematic Hero transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 0.8, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 40]);

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

  const renderText = (text: string) => {
    if (!text) return null;
    // Split by both **bold** and ==highlight==
    const parts = text.split(/(\*\*.*?\*\*|==.*?==)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        return (
          <span 
            key={i} 
            style={{ 
              fontWeight: 600,
              color: "#1a1a1a",
              borderBottom: "1px solid rgba(242, 101, 34, 0.2)",
              display: "inline",
            }}
          >
            {content}
          </span>
        );
      }
      if (part.startsWith('==') && part.endsWith('==')) {
        const content = part.slice(2, -2);
        return (
          <span 
            key={i} 
            style={{ 
              background: "rgba(255, 235, 59, 0.25)", // Soft yellow
              padding: "0 2px",
              borderRadius: "2px",
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
              color: "#1a1a1a",
              fontWeight: "inherit"
            }}
          >
            {content}
          </span>
        );
      }
      return part;
    });
  };

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

        {/* Hero image or Video with inner zoom effect */}
        <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#f5f5f5", position: "relative" }}>
          {cs.videoUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={cs.videoUrl}
              title={`${cs.title} Video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          ) : (
            <motion.div
              style={{ 
                width: "100%", 
                height: "100%", 
                opacity: heroOpacity, 
                scale: heroScale,
                y: heroY 
              }}
            >
              <ProgressiveImage 
                src={cs.image} 
                alt={cs.title} 
              />
            </motion.div>
          )}
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
            
            <motion.div 
              style={{ marginBottom: "2.5rem" }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>CONTEXT</div>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(0,0,0,0.7)", whiteSpace: "pre-wrap" }}>
                {renderText(cs.context)}
              </p>
            </motion.div>

            {/* Conditional Order for Gotham */}
            {cs.slug === "gotham-risk-intelligence" ? (
              <>
                <motion.div 
                  style={{ marginBottom: "2.5rem" }}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>CHALLENGE</div>
                  <p style={{ 
                    fontSize: "15px", 
                    lineHeight: 1.6, 
                    color: "rgba(0,0,0,0.6)", 
                    fontWeight: 400,
                    whiteSpace: "pre-wrap" 
                  }}>
                    {renderText(cs.challenge)}
                  </p>
                </motion.div>

                <motion.div 
                  style={{ marginBottom: "2.5rem" }}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>PROBLEM</div>
                  <p style={{ 
                    fontSize: "18px", 
                    lineHeight: 1.6, 
                    color: "#1a1a1a", 
                    fontWeight: 600,
                    whiteSpace: "pre-wrap" 
                  }}>
                    {renderText(cs.problem)}
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div 
                  style={{ marginBottom: "2.5rem" }}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>PROBLEM</div>
                  <p style={{ 
                    fontSize: "16px", 
                    lineHeight: 1.6, 
                    color: "rgba(0,0,0,0.7)", 
                    fontWeight: 400,
                    whiteSpace: "pre-wrap" 
                  }}>
                    {renderText(cs.problem)}
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
                  <p style={{ 
                    fontSize: "16px", 
                    lineHeight: 1.6, 
                    color: "#1a1a1a", 
                    fontWeight: 500,
                    whiteSpace: "pre-wrap" 
                  }}>
                    {renderText(cs.challenge)}
                  </p>
                </motion.div>
              </>
            )}

            <motion.div 
              style={{ marginBottom: "2.5rem" }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>APPROACH</div>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(0,0,0,0.7)", whiteSpace: "pre-wrap" }}>
                {renderText(cs.approach)}
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
              const ph: React.CSSProperties = {
                borderRadius: "6px",
                overflow: "hidden",
                background: "#f5f5f5",
                position: "relative",
                cursor: "zoom-in"
              };

              const GalleryItem = ({ src, height, style = {} }: { src: string, height: string, style?: any, key?: any }) => {
                const [hovered, setHovered] = useState(false);
                // Subtle parallax shift based on global modal scroll
                const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

                return (
                  <div 
                    style={{ ...ph, height, ...style }} 
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => setLightboxImg(src)}
                  >
                    <motion.div
                      style={{ 
                        height: "140%", // More room for parallax
                        width: "100%", 
                        position: "absolute", 
                        top: "-20%",
                        y: parallaxY
                      }}
                      animate={{ 
                        scale: hovered ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProgressiveImage src={src} alt="" />
                    </motion.div>
                  </div>
                );
              };

              // Layout 1: Gotham
              if (cs.id === 1) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <GalleryItem src={imgs[0]} height="220px" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                      <GalleryItem src={imgs[1]} height="120px" />
                      <GalleryItem src={imgs[2]} height="120px" />
                    </div>
                  </div>
                </div>
              );

              // Layout 2: MetaGo
              if (cs.id === 2) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", alignItems: "start" }}>
                    <GalleryItem src={imgs[0]} height="200px" />
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <GalleryItem src={imgs[1]} height="96px" />
                      <GalleryItem src={imgs[2]} height="96px" />
                    </div>
                    <GalleryItem src={imgs[3]} height="160px" style={{ marginTop: "20px" }} />
                  </div>
                </div>
              );

              // Layout 3: Glance Fit
              if (cs.id === 3) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
                    {imgs.map((src, i) => (
                      <GalleryItem key={i} src={src} height="180px" />
                    ))}
                  </div>
                </div>
              );

              // Layout 4: Privy
              if (cs.id === 4) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "6px" }}>
                    <GalleryItem src={imgs[0]} height="230px" />
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <GalleryItem src={imgs[1]} height="112px" />
                      <GalleryItem src={imgs[2]} height="112px" />
                    </div>
                  </div>
                </div>
              );

              // Layout 5: TV Research
              if (cs.id === 5) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <GalleryItem src={imgs[0]} height="130px" />
                    <GalleryItem src={imgs[1]} height="130px" />
                  </div>
                </div>
              );

              // Layout 6: K-Shop
              if (cs.id === 6) return (
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-mono)", fontWeight: 400, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>GALLERY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", alignItems: "center", padding: "16px 0" }}>
                    <GalleryItem src={imgs[0]} height="150px" />
                    <GalleryItem src={imgs[1]} height="150px" style={{ transform: "translateY(-16px)", boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }} />
                    <GalleryItem src={imgs[2]} height="150px" style={{ transform: "translateY(8px)" }} />
                  </div>
                </div>
              );

              return null;
            })()}
            </motion.div>

            <motion.div 
              ref={outcomeRef}
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
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {cs.externalLink && (
                  <a
                    href={cs.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!scrolledToBottom && outcomeRef.current) {
                        e.preventDefault();
                        outcomeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
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
                )}

                <a
                  href={`#/report/${cs.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#f26522",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    width: "fit-content",
                    textDecoration: "none",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  View Detailed Report
                  <span style={{ transition: "transform 0.2s ease", transform: ctaHov ? "translate(4px, 0)" : "none" }}>→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-8 bg-black/90 cursor-zoom-out"
              onClick={() => setLightboxImg(null)}
            >
              <motion.img
                src={lightboxImg}
                alt="Enlarged gallery view"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                onClick={() => setLightboxImg(null)}
                style={{ position: "absolute", top: "2rem", right: "2rem", color: "white", fontSize: "2rem" }}
              >✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
