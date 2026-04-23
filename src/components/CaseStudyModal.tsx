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

  const renderSection = (label: string, content: string | undefined) => {
    if (!content) return null;
    const isSpecial = label === "OPPORTUNITY" && cs.slug === "metago-coin";
    return (
      <motion.div 
        style={{ marginBottom: "2.5rem" }}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ 
          fontSize: "10px", 
          color: isSpecial ? "#f26522" : "rgba(0,0,0,0.4)", 
          fontFamily: "var(--font-mono)", 
          marginBottom: "0.75rem", 
          fontWeight: isSpecial ? 700 : 600,
          letterSpacing: isSpecial ? "0.05em" : "normal"
        }}>
          {label}
        </div>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: 1.6, 
          color: "rgba(0,0,0,0.7)", 
          fontWeight: 400,
          whiteSpace: "pre-wrap" 
        }}>
          {renderText(content)}
        </p>
      </motion.div>
    );
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
              ["YEAR", cs.year],
              ["ROLE", cs.role],
              ["DURATION", cs.duration],
              ["EVENT", cs.event],
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
            
            {/* Conditional Rendering for Sections based on slug and available keys */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Context is always first */}
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

                {/* Gotham Market Exposure Stats */}
                {cs.slug === "gotham-risk-intelligence" && (
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(3, 1fr)", 
                    gap: "12px", 
                    marginTop: "1.5rem",
                    padding: "1.25rem",
                    background: "rgba(0,0,0,0.02)",
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.05)"
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontWeight: 600, marginBottom: "4px" }}>ANNUAL LOSS</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-mono)" }}>RP10–15T</div>
                    </div>
                    <div style={{ textAlign: "center", borderLeft: "1px solid rgba(0,0,0,0.1)", borderRight: "1px solid rgba(0,0,0,0.1)" }}>
                      <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontWeight: 600, marginBottom: "4px" }}>NEW VICTIMS / YR</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-mono)" }}>0.8–1.2M</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontWeight: 600, marginBottom: "4px" }}>AVG. INFLOW / PAX</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", fontFamily: "var(--font-mono)" }}>RP10–25M</div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Order and Labels for specific projects */}
              {cs.slug === "gotham-risk-intelligence" ? (
                <>
                  {renderSection("PROBLEM", cs.problem)}
                  {renderSection("CHALLENGE", cs.challenge)}
                  {renderSection("APPROACH", cs.approach)}
                </>
              ) : cs.slug === "privy-acceleration" ? (
                <>
                  {renderSection("PROBLEM", cs.problem)}
                  
                  {/* BENEFITS Visualization */}
                  <motion.div 
                    style={{ marginBottom: "2.5rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>BENEFITS</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                      {[
                        { title: "Skill Development", desc: "Intensive capability enhancement across technical and functional roles, bridging the gap between theory and execution.", icon: "📈" },
                        { title: "Grade Level Adjustment", desc: "Successful participants receive a formal grade level adjustment reflecting their elevated competency.", icon: "🎖️" },
                        { title: "Career Progression", desc: "Direct pathway to higher-impact positions with expanded organizational responsibilities.", icon: "🚀" },
                        { title: "Compensation Increase", desc: "Passing the program entitles participants to a higher base salary adjustment and optimized compensation structure.", icon: "💰" }
                      ].map((benefit, i) => (
                        <div key={benefit.title} style={{ padding: "1.25rem", background: "rgba(240, 232, 255, 0.3)", borderRadius: "12px", border: "1px solid rgba(168, 85, 247, 0.1)" }}>
                          <div style={{ fontSize: "24px", marginBottom: "0.75rem" }}>{benefit.icon}</div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>{benefit.title}</div>
                          <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}>{benefit.desc}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {renderSection("CHALLENGE", cs.approach)}

                  {/* Program Phases Visualization */}
                  <motion.div 
                    style={{ marginBottom: "2.5rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>PROGRAM JOURNEY</div>
                    <div style={{ marginBottom: "1.5rem", fontSize: "16px", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>
                      A structured end-to-end journey designed to evaluate, transform, and certify organizational readiness.
                    </div>
                    <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
                      {/* Vertical connector line */}
                      <div style={{ position: "absolute", left: "6px", top: "10px", bottom: "10px", width: "2px", background: "linear-gradient(to bottom, #a855f7 0%, #a855f7 70%, rgba(168, 85, 247, 0.1) 100%)" }} />
                      
                      {[
                        { title: "Pre-Test Enrollment & Assessment", desc: "Strategic filtering and initial skill benchmarking to identify potential.", tag: "Entry" },
                        { title: "5-Month Intensive Acceleration Training", desc: "Hands-on technical growth supported by continuous expert mentorship.", tag: "Learning" },
                        { title: "Capstone Project", desc: "Practical application of learned skills through high-stakes, collaborative projects.", tag: "Execution" },
                        { title: "Post-Test Evaluation", desc: "Comprehensive assessment of newly acquired technical and functional competencies.", tag: "Evaluation" },
                        { title: "Final Presentation", desc: "Outcome showcase to senior leadership, demonstrating business impact readiness.", tag: "Validation" },
                        { title: "Graduation", desc: "Official certification and transition into elevated roles within the organization.", tag: "Outcome" }
                      ].map((phase, i) => (
                        <div key={phase.title} style={{ position: "relative", marginBottom: "1.25rem" }}>
                          <div style={{ 
                            position: "absolute", 
                            left: "-1.5rem", 
                            width: "14px", 
                            height: "14px", 
                            borderRadius: "50%", 
                            background: "white", 
                            border: "3px solid #a855f7",
                            zIndex: 2,
                            top: "3px"
                          }} />
                          <div style={{ 
                            display: "inline-block", 
                            fontSize: "9px", 
                            background: "rgba(168, 85, 247, 0.1)", 
                            color: "#a855f7", 
                            padding: "2px 8px", 
                            borderRadius: "10px", 
                            fontWeight: 700,
                            marginBottom: "4px",
                            textTransform: "uppercase"
                          }}>{phase.tag}</div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>{phase.title}</div>
                          <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", lineHeight: 1.4 }}>{phase.desc}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Program Tracks */}
                  <motion.div 
                    style={{ marginBottom: "2.5rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>PROGRAM TRACKS</div>
                    <div style={{ fontSize: "16px", color: "rgba(0,0,0,0.6)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                      The program engaged over 250+ participants across multiple specialized technical tracks, supported by a network of 30+ mentors to ensure high-quality learning outcomes.
                    </div>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", 
                      gap: "0.75rem" 
                    }}>
                      {[
                        { name: "SQA", classes: 10 },
                        { name: "Backend", classes: 9 },
                        { name: "PM", classes: 5 },
                        { name: "Frontend", classes: 4 },
                        { name: "UI", classes: 2 },
                        { name: "Android", classes: 1 },
                        { name: "iOS", classes: 1 },
                        { name: "UX Writing", classes: 1 }
                      ].map(track => (
                        <div key={track.name} style={{ 
                          padding: "12px", 
                          background: "white", 
                          border: "1px solid rgba(168, 85, 247, 0.15)", 
                          borderRadius: "12px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          boxShadow: "0 2px 4px rgba(168, 85, 247, 0.03)"
                        }}>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>{track.name}</span>
                          <span style={{ fontSize: "11px", fontWeight: 600, color: "#a855f7", background: "rgba(168, 85, 247, 0.1)", padding: "2px 8px", borderRadius: "10px" }}>{track.classes} Classes</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Areas of Ownership */}
                  <motion.div 
                    style={{ marginBottom: "2.5rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>AREAS OF OWNERSHIP</div>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                      gap: "1rem" 
                    }}>
                      {[
                        { title: "Platform Management", desc: "End-to-end administration of Algobash for Pre-Test, Quiz, and Post-Test assessments." },
                        { title: "Education Quality", desc: "Overseeing quality control for on-site classes (7–9 PM, Mon–Fri) over a 6-month period." },
                        { title: "Operations & Logistics", desc: "Coordinating multi-location educational logistics and class scheduling." },
                        { title: "Feedback Systems", desc: "Designing and managing program-wide feedback loops using Google Forms." },
                        { title: "Data & Reporting", desc: "Ensuring accurate lifecycle data: cohorts, attendance, feedback tracking." },
                        { title: "Design & Branding", desc: "Directing visual identity, program logo, landing page wireframes & learning materials." }
                      ].map((item, i) => (
                        <div key={item.title} style={{ padding: "1rem", background: "rgba(0,0,0,0.02)", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.03)" }}>
                          <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>{item.title}</div>
                          <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", lineHeight: 1.5 }}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  {/* Program Offboarding & Reporting Support */}
                  <motion.div 
                    style={{ marginBottom: "2.5rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>PROGRAM OFFBOARDING & REPORTING</div>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                      gap: "1.25rem" 
                    }}>
                      {[
                        { 
                          category: "HR & Exit Coordination", 
                          items: ["Managed offboarding and exit clearance for non-passing participants.", "Partnered with HR to ensure sensitive restructuring processes were executed smoothly."] 
                        },
                        { 
                          category: "Reporting & Analytics", 
                          items: ["Coordinated operational reporting and systematic documentation processes.", "Automated distribution of participant report cards using mail merge for efficiency."] 
                        },
                        { 
                          category: "Final Asset Management", 
                          items: ["Consolidated final project submissions and source code repositories.", "Ensured end-to-end organization of all operational and performance materials."] 
                        }
                      ].map((cluster, i) => (
                        <div key={cluster.category} style={{ padding: "1.25rem", background: "rgba(168, 85, 247, 0.03)", borderRadius: "12px", border: "1px solid rgba(168, 85, 247, 0.1)" }}>
                          <div style={{ fontSize: "11px", fontWeight: 700, color: "#a855f7", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.025em" }}>{cluster.category}</div>
                          <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                            {cluster.items.map((item, idx) => (
                              <li key={idx} style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)", lineHeight: 1.5, position: "relative", paddingLeft: "12px" }}>
                                <span style={{ position: "absolute", left: 0, top: "6px", width: "4px", height: "4px", borderRadius: "50%", background: "#a855f7" }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              ) : cs.slug === "tv-ambient" ? (
                <>
                  {/* WHO WE LEARNED FROM */}
                  <motion.div 
                    style={{ marginBottom: "3rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "1rem", fontWeight: 600 }}>PARTICIPANT PROFILE</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "1.5rem", background: "#fdf8f0", borderRadius: "16px", border: "1px solid #f9ebda" }}>
                      <div style={{ fontSize: "32px" }}>👥</div>
                      <div>
                        <div style={{ fontSize: "18px", fontWeight: 600, color: "#1a1a1a", marginBottom: "4px" }}>3 Young Adults (18–35)</div>
                        <div style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}>
                          Living independently with high exposure to both broadcast and digital media. Transitioning from residual TV habits to digital-primary consumption.
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {renderSection("METHODS", cs.approach)}

                  {/* WHAT WE FOUND - CARDS */}
                  <motion.div 
                    style={{ marginBottom: "4rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "1.5rem", fontWeight: 600 }}>KEY FINDINGS</div>
                    <div 
                      style={{ 
                        display: "flex", 
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "1rem"
                      }}
                    >
                      {[
                        { title: "Human Backsound", desc: "Company over concentration; rhythmic companion to domestic life.", icon: "🔊", bg: "#fdf8f0" },
                        { title: "Live Anchors", desc: "Seasonal events create urgency that algorithms can't replicate.", icon: "⚽", bg: "#f0f7ff" },
                        { title: "Daily Boundary", desc: "A tool for ritual, marking the transition from work to home.", icon: "⏳", bg: "#f5f3ff" },
                        { title: "Shared Context", desc: "Shared environment over content; felt connection to the world.", icon: "🛋️", bg: "#f0fdf4" },
                        { title: "Effortless Value", desc: "Zero-choice consumption that respects mental load and fatigue.", icon: "🕊️", bg: "#fff1f2" }
                      ].map((item, i) => (
                        <motion.div 
                          key={item.title} 
                          whileHover={{ y: -5, boxShadow: "0 8px 25px rgba(0,0,0,0.05)" }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{ 
                            flex: "1 1 240px",
                            maxWidth: "calc(33.333% - 1rem)",
                            minWidth: "240px",
                            padding: "1.5rem", 
                            background: item.bg, 
                            border: "1px solid rgba(0,0,0,0.03)", 
                            borderRadius: "16px", 
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px"
                          }}
                        >
                          <div style={{ fontSize: "24px" }}>{item.icon}</div>
                          <div>
                            <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", marginBottom: "6px", lineHeight: 1.2 }}>{item.title}</div>
                            <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}>{item.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CORE INSIGHT - QUOTE */}
                  <motion.div 
                    style={{ marginBottom: "0.5rem", textAlign: "center", padding: "4rem 2rem", background: "linear-gradient(to bottom, #fff, #fdf8f0, #fff)", borderRadius: "24px 24px 0 0" }}
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div style={{ fontSize: "11px", color: "#f26522", fontWeight: 700, marginBottom: "1.5rem", letterSpacing: "0.1em" }}>CORE INSIGHT</div>
                    <div style={{ fontSize: "28px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3, maxWidth: "500px", margin: "0 auto" }}>
                      “TV isn’t being replaced — it’s being <span style={{ color: "#f26522" }}>reassigned.</span>”
                    </div>
                    <div style={{ marginTop: "1.5rem", fontSize: "15px", color: "rgba(0,0,0,0.5)", lineHeight: 1.6, maxWidth: "440px", margin: "1.5rem auto 0" }}>
                      It no longer competes for attention, but thrives as a medium that fills gaps, anchors routines, and removes the burden of choice.
                    </div>
                  </motion.div>

                  {/* THE OPPORTUNITY - EDITORIAL ORDERED LIST */}
                  <motion.div 
                    style={{ marginBottom: "4rem", padding: "2rem 0" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{ fontSize: "10px", color: "#f26522", fontFamily: "var(--font-mono)", marginBottom: "2rem", fontWeight: 700, letterSpacing: "0.1em" }}>STRATEGIC OPPORTUNITY</div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                      {[
                        { 
                          title: "Own the rituals", 
                          desc: "Dominating 'unattended' moments like the morning rush or evening wind-down."
                        },
                        { 
                          title: "Low-effort access", 
                          desc: "Curated, zero-click viewing paths that reduce cognitive fatigue and decision paralysis."
                        },
                        { 
                          title: "Shared environment", 
                          desc: "Communal content that anchors the household's social physical space."
                        },
                        { 
                          title: "The safe harbor", 
                          desc: "A reliable default companion in an age of overwhelming choice friction."
                        }
                      ].map((opp, idx) => (
                        <div key={opp.title} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: "1rem" }}>
                          <div style={{ 
                            fontSize: "12px", 
                            fontWeight: 700, 
                            color: "#f26522", 
                            fontFamily: "var(--font-mono)",
                            paddingTop: "2px"
                          }}>
                            0{idx + 1}
                          </div>
                          <div>
                            <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>
                              {opp.title}
                            </div>
                            <div style={{ fontSize: "14px", color: "rgba(0,0,0,0.5)", lineHeight: 1.6, maxWidth: "520px" }}>
                              {opp.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              ) : cs.slug === "metago-coin" ? (
                <>
                  {renderSection("OPPORTUNITY", cs.opportunity)}
                  {/* Impact Loop Visualization */}
                  <motion.div 
                    style={{ marginBottom: "2.5rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>IMPACT LOOP</div>
                    <div style={{ padding: "1.25rem", background: "rgba(242, 101, 34, 0.03)", borderRadius: "12px", border: "1px solid rgba(242, 101, 34, 0.1)" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        {[
                          "Hold", "Engage", "Earn", "Reinvest", "Scale Cinemas", "Increase Utility Demand"
                        ].map((step, idx, arr) => (
                          <React.Fragment key={step}>
                            <div style={{ 
                              padding: "6px 12px", 
                              background: "white", 
                              borderRadius: "16px", 
                              fontSize: "11px", 
                              fontWeight: 600,
                              color: "#f26522",
                              boxShadow: "0 1px 4px rgba(242, 101, 34, 0.05)",
                              border: "1px solid rgba(242, 101, 34, 0.1)"
                             }}>
                              {step}
                            </div>
                            {idx < arr.length - 1 && <span style={{ color: "rgba(242, 101, 34, 0.3)", fontSize: "10px" }}>→</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  {renderSection("APPROACH", cs.approach)}
                  {renderSection("STRATEGY", cs.strategy)}
                </>
              ) : cs.slug === "glance-fit" ? (
                <>
                  {renderSection("CHALLENGE", cs.challenge)}
                  {renderSection("OPPORTUNITY", cs.opportunity)}
                  
                  {/* Core Mechanism Visualization */}
                  <motion.div 
                    style={{ marginBottom: "3rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "1.25rem", fontWeight: 600 }}>CORE MECHANISM</div>
                    <div style={{ 
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "0.75rem",
                      position: "relative"
                    }}>
                      {[
                        { label: "Track", desc: "Daily activities", icon: "👟", color: "#4caf50" },
                        { label: "Reward", desc: "Earn points", icon: "💎", color: "#2196f3" },
                        { label: "Redeem", desc: "Get deals", icon: "🎁", color: "#ff9800" },
                        { label: "Re-engage", desc: "Personalized", icon: "♻️", color: "#f44336" }
                      ].map((step, i) => (
                        <motion.div 
                          key={step.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          whileHover={{ y: -5, boxShadow: `0 8px 24px ${step.color}15` }}
                          style={{ 
                            textAlign: "center", 
                            padding: "1rem 0.5rem", 
                            background: "white", 
                            borderRadius: "12px", 
                            border: `1px solid ${step.color}20`,
                            boxShadow: `0 4px 12px ${step.color}08`,
                            position: "relative"
                          }}
                        >
                          <motion.div 
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                            style={{ 
                              fontSize: "20px", 
                              marginBottom: "0.5rem",
                              width: "40px",
                              height: "40px",
                              margin: "0 auto 0.75rem",
                              background: `${step.color}10`,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            {step.icon}
                          </motion.div>
                          <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{step.label}</div>
                          <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", lineHeight: 1.2 }}>{step.desc}</div>
                          
                          {i < 3 && (
                            <div style={{ 
                              position: "absolute", 
                              top: "50%", 
                              right: "-8px", 
                              transform: "translateY(-50%)", 
                              fontSize: "12px", 
                              color: "rgba(0,0,0,0.2)",
                              zIndex: 1
                            }}>→</div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {renderSection("APPROACH", cs.approach)}
                  
                  {/* Economic Bridge Visualization */}
                  <motion.div 
                    style={{ marginBottom: "3rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      padding: "2rem", 
                      background: "rgba(242, 101, 34, 0.03)", 
                      borderRadius: "16px", 
                      border: "1px solid rgba(242, 101, 34, 0.1)", 
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      <div style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none" }}>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M0,50 Q25,45 50,50 T100,50" fill="none" stroke="#f26522" strokeWidth="0.5" />
                        </svg>
                      </div>

                      <div style={{ flex: 1, textAlign: "center", zIndex: 1 }}>
                        <div style={{ fontSize: "10px", color: "#f26522", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "8px" }}>UTILITY</div>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a" }}>Real usage</div>
                      </div>
                      
                      <div style={{ width: "120px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)" }} />
                        <div style={{ 
                          position: "absolute", 
                          padding: "4px 10px", 
                          background: "white", 
                          border: "1px solid rgba(0,0,0,0.06)", 
                          borderRadius: "12px", 
                          fontSize: "9px", 
                          fontWeight: 800, 
                          color: "rgba(0,0,0,0.4)", 
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                        }}>BRIDGE</div>
                      </div>

                      <div style={{ flex: 1, textAlign: "center", zIndex: 1 }}>
                        <div style={{ fontSize: "10px", color: "#4caf50", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "8px" }}>CIRCULATION</div>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a" }}>Economic flow</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Expanding the Loop Visualization */}
                  <motion.div 
                    style={{ marginBottom: "2.5rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>EXPANDING THE LOOP</div>
                    
                    <div style={{ marginBottom: "1.5rem", fontSize: "16px", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>
                      {renderText(cs.expansion || "")}
                    </div>

                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                      gap: "1rem",
                      padding: "1.5rem",
                      background: "rgba(0,0,0,0.02)",
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.05)"
                    }}>
                      {[
                        { title: "Affiliate", desc: "Direct Referral", icon: "👤" },
                        { title: "Fitness Advocate", desc: "Network Layer", icon: "🤝" },
                        { title: "Business Dev", desc: "Group-Based", icon: "🏢" }
                      ].map((item, i) => (
                        <motion.div 
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ x: 5, background: "rgba(0,0,0,0.01)" }}
                          style={{ padding: "1rem", background: "white", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.03)", display: "flex", alignItems: "center", gap: "12px" }}
                        >
                          <motion.div 
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            style={{ fontSize: "20px" }}
                          >
                            {item.icon}
                          </motion.div>
                          <div>
                            <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{item.title}</div>
                            <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", fontFamily: "var(--font-mono)" }}>{item.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* The System Behind It Visualization */}
                  <motion.div 
                    style={{ marginBottom: "2.5rem" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontWeight: 600 }}>THE SYSTEM BEHIND IT</div>
                    
                    <div style={{ marginBottom: "1.5rem", fontSize: "16px", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>
                      {renderText(cs.system || "")}
                    </div>

                    <div style={{ 
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "1rem",
                    }}>
                      {[
                        { title: "Subscription Economy", desc: "Recurring revenue models", icon: "💳" },
                        { title: "Gamification Layer", desc: "Points and achievements", icon: "🎮" },
                        { title: "Utility Layer Tokens", desc: "Payments and incentives", icon: "🪙" },
                        { title: "Network-Driven Growth", desc: "Multi-layer referral incentives", icon: "🕸️" }
                      ].map((sys, i) => (
                        <motion.div 
                          key={sys.title}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ y: -4, background: "linear-gradient(135deg, rgba(255,255,255,1), rgba(212, 240, 232, 0.4))", border: "1px solid rgba(76, 175, 80, 0.3)" }}
                          style={{ 
                            padding: "1rem", 
                            background: "linear-gradient(135deg, rgba(255,255,255,1), rgba(212, 240, 232, 0.2))",
                            borderRadius: "10px",
                            border: "1px solid rgba(76, 175, 80, 0.1)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                          }}
                        >
                          <motion.div 
                             animate={{ scale: [1, 1.1, 1] }}
                             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                             style={{ fontSize: "18px", marginTop: "2px" }}
                          >
                            {sys.icon}
                          </motion.div>
                          <div>
                            <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{sys.title}</div>
                            <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", lineHeight: 1.4 }}>{sys.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  {renderSection("PROBLEM", cs.problem)}
                  {renderSection("CHALLENGE", cs.challenge)}
                  {renderSection("APPROACH", cs.approach)}
                </>
              )}
            </div>

            {/* Gallery — each case study uses a different layout based on cs.id */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
            {cs.gallery && cs.gallery.length === 4 && cs.slug !== "tv-ambient" && (() => {
              const imgs = cs.gallery;
              const ph: React.CSSProperties = {
                borderRadius: "12px",
                overflow: "hidden",
                background: "#f0f0f0",
                position: "relative",
                cursor: "zoom-in",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.03)"
              };

              const GalleryItem = ({ src, height, style = {}, parallax = 0.15 }: { src: string, height: string, style?: any, parallax?: number }) => {
                const [hovered, setHovered] = useState(false);
                const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100 * parallax]);

                return (
                  <div 
                    style={{ ...ph, height, ...style }} 
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => setLightboxImg(src)}
                  >
                    <motion.div
                      style={{ 
                        height: "150%", 
                        width: "100%", 
                        position: "absolute", 
                        top: "-25%",
                        y: parallaxY
                      }}
                      animate={{ scale: hovered ? 1.05 : 1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProgressiveImage src={src} alt="" />
                    </motion.div>
                  </div>
                );
              };

              // 1. Gotham: "The Investigation"
              if (cs.slug === "gotham-risk-intelligence") return (
                <div style={{ marginBottom: "4rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>THE INVESTIGATION</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "12px" }}>
                    <GalleryItem src={imgs[0]} height="380px" parallax={0.1} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <GalleryItem src={imgs[1]} height="184px" parallax={0.2} />
                      <GalleryItem src={imgs[2]} height="184px" parallax={0.05} />
                    </div>
                  </div>
                </div>
              );

              // 2. MetaGo: "Cinematic Premiere"
              if (cs.slug === "metago-coin") return (
                <div style={{ marginBottom: "4rem" }}>
                  <div style={{ fontSize: "10px", color: "#f26522", fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1rem" }}>STUDIO REEL</div>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", alignItems: "end" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <GalleryItem src={imgs[0]} height="240px" parallax={0.08} />
                      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "16px" }}>
                         <GalleryItem src={imgs[1]} height="160px" parallax={0.12} />
                         <GalleryItem src={imgs[2]} height="160px" parallax={0.05} />
                      </div>
                    </div>
                    <GalleryItem src={imgs[3]} height="416px" parallax={0.2} />
                  </div>
                </div>
              );

              // 3. Toll Voice: "Zero-Gaze Safety"
              if (cs.slug === "toll-voice-assistant") return (
                <div style={{ marginBottom: "4rem" }}>
                  <div style={{ fontSize: "10px", color: "#2196f3", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>VUI INTERACTION</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <GalleryItem src={imgs[0]} height="280px" style={{ borderRadius: "24px" }} />
                    <div style={{ marginTop: "40px" }}>
                       <GalleryItem src={imgs[1]} height="280px" style={{ borderRadius: "24px" }} />
                    </div>
                    <GalleryItem src={imgs[2]} height="280px" style={{ borderRadius: "24px", marginTop: "-40px" }} />
                    <GalleryItem src={imgs[3]} height="280px" style={{ borderRadius: "24px" }} />
                  </div>
                </div>
              );

              // 4. Glance Fit: "Mobile Rewards Ecosystem"
              if (cs.slug === "glance-fit") return (
                <div style={{ marginBottom: "4rem" }}>
                  <div style={{ fontSize: "10px", color: "#4caf50", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>MOBILE ECOSYSTEM</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                    <GalleryItem src={imgs[0]} height="320px" style={{ borderRadius: "20px" }} parallax={0.2} />
                    <GalleryItem src={imgs[1]} height="320px" style={{ borderRadius: "20px", marginTop: "24px" }} parallax={0.1} />
                    <GalleryItem src={imgs[2]} height="320px" style={{ borderRadius: "20px", marginTop: "48px" }} parallax={0.15} />
                    <GalleryItem src={imgs[3]} height="320px" style={{ borderRadius: "20px", marginTop: "72px" }} parallax={0.05} />
                  </div>
                </div>
              );

              // 5. Privy: "Operational Scale"
              if (cs.slug === "privy-acceleration") return (
                <div style={{ marginBottom: "4rem" }}>
                  <div style={{ fontSize: "10px", color: "#a855f7", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>PROCESS ARCHIVE</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                     <GalleryItem src={imgs[0]} height="200px" />
                     <GalleryItem src={imgs[1]} height="200px" />
                     <GalleryItem src={imgs[2]} height="200px" />
                     <GalleryItem src={imgs[3]} height="200px" />
                  </div>
                </div>
              );

              // 6. TV Ambient: "The Screen Experience"
              if (cs.slug === "tv-ambient") return (
                <div style={{ marginBottom: "4rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>RESEARCH ARTIFACTS</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <GalleryItem src={imgs[0]} height="240px" parallax={0.05} />
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px" }}>
                       <GalleryItem src={imgs[1]} height="180px" parallax={0.1} />
                       <GalleryItem src={imgs[2]} height="180px" parallax={0.15} />
                    </div>
                  </div>
                </div>
              );

              // 7. K-Shop: "Social Discovery Feed"
              if (cs.slug === "k-shop") return (
                <div style={{ marginBottom: "4rem" }}>
                  <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>APP ARCHITECTURE</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", alignItems: "center" }}>
                    <GalleryItem src={imgs[0]} height="200px" />
                    <GalleryItem src={imgs[1]} height="260px" style={{ transform: "rotate(-2deg)", zIndex: 2, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }} />
                    <GalleryItem src={imgs[2]} height="220px" style={{ transform: "rotate(2deg)" }} />
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

                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.3)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "not-allowed",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    width: "fit-content",
                    textDecoration: "none",
                  }}
                >
                  View My Process & Thinking (Coming Soon)
                  <span style={{ opacity: 0.5 }}>→</span>
                </div>
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
