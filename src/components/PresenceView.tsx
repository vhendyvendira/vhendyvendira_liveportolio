import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

interface PresenceViewProps {
  navigate: (path: string) => void;
}

interface ImageMoment {
  src: string;
  alt: string;
  backstory: string;
}

export default function PresenceView({ navigate }: PresenceViewProps) {
  const [selectedImage, setSelectedImage] = useState<ImageMoment | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const styles = {
    lbl: { fontSize: "11px", fontWeight: 600, color: "#f26522", fontFamily: "var(--font-mono)", textTransform: "uppercase" as const, letterSpacing: "0.1em" },
    rule: { height: "1px", background: "rgba(0,0,0,0.05)", border: "none" },
    cap: { fontSize: "11px", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)" },
    pull: { fontSize: "18px", lineHeight: 1.6, color: "rgba(0,0,0,0.6)", fontWeight: 500 },
    entryT: { fontSize: "20px", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.02em" },
    entryR: { fontSize: "11px", fontWeight: 600, color: "#f26522", fontFamily: "var(--font-mono)", textTransform: "uppercase" as const },
    entryD: { fontSize: "15px", lineHeight: 1.7, color: "rgba(0,0,0,0.6)" },
    commT: { fontSize: "16px", fontWeight: 600, color: "#1a1a1a" },
    commD: { fontSize: "14px", lineHeight: 1.6, color: "rgba(0,0,0,0.6)" }
  };

  const REEL_IMAGES: ImageMoment[] = [
    { 
      src: "/presence-images/vhendy-with-angga-iqbal-jogja.jpg", 
      alt: "Jogja Professional Meetup",
      backstory: "Community is the multiplier; sharing space with fellow creators in Jogja reminded me that innovation is a social act."
    },
    { 
      src: "/presence-images/vhendy-hafidz.png", 
      alt: "Portrait moment",
      backstory: "Quiet moments of reflection are where system optimizations are often born, away from the screen."
    },
    { 
      src: "/presence-images/vhendy-on-kanvas-confrence.png", 
      alt: "Guest Speaker at Kanvas Conference",
      backstory: "Speaking at Kanvas was about operational empathy—ensuring that design systems actually serve the people using them."
    },
    { 
      src: "/presence-images/vhendy-femmy-nabila.jpeg", 
      alt: "Community with Femmy & Nabila",
      backstory: "Building in community means growing together; these shared moments define the mission behind the work."
    },
    { 
      src: "/presence-images/vhendy-andrew-singapore.jpg", 
      alt: "Startup Summit Singapore",
      backstory: "Singapore's pace of innovation is a reminder that operational speed is a competitive advantage when paired with clarity."
    }
  ];

  return (
    <div className="about-full-container">
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              backgroundColor: 'rgba(255, 255, 255, 0.98)', 
              zIndex: 2000, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ maxWidth: '900px', width: '100%', position: 'relative' }}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                style={{ width: '100%', borderRadius: '4px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }} 
              />
              <div style={{ marginTop: '2rem', maxWidth: '600px' }}>
                <div style={{ ...styles.lbl, marginBottom: '0.75rem' }}>The Backstory</div>
                <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#1a1a1a', fontWeight: 500 }}>
                  {selectedImage.backstory}
                </p>
                <div style={{ marginTop: '1rem', ...styles.cap }}>{selectedImage.alt}</div>
              </div>
            </motion.div>
            
            <button 
              onClick={() => setSelectedImage(null)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="about-back-btn" onClick={() => navigate("/")}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back</span>
      </button>

      <div className="about-content">
        <div className="about-page" style={{ paddingBottom: "8rem" }}>
          {/* Header */}
          <div style={{ marginBottom: "4rem" }}>
            <div className="scroll-reveal" style={{ ...styles.lbl, marginBottom: "1.5rem" }}>Public Presence</div>
            <h1 className="scroll-reveal stagger-1" style={{ fontSize: "3rem", lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#1a1a1a", marginBottom: "1.5rem" }}>
              Showing up — learning, sharing, and building together.
            </h1>
          </div>

          {/* Featured moment */}
          <div style={{ marginBottom: "6rem" }}>
            <div className="scroll-reveal" style={{ ...styles.lbl, marginBottom: "2rem" }}>Featured Moment</div>
            <div style={{ marginBottom: "2.5rem" }}>
              <div 
                className="scroll-reveal img-reveal stagger-1" 
                onClick={() => setSelectedImage({
                  src: "/presence-images/iddr-apple-event-2025.png",
                  alt: "Apple Developer Academy Event 2025",
                  backstory: "Networking with the Apple ecosystem taught me that simplicity in developer tools requires the most complex engineering."
                })}
                style={{ width: "100%", borderRadius: "8px", background: "#f5f5f5", overflow: "hidden", aspectRatio: "16/9", position: 'relative', cursor: 'zoom-in' }}
              >
                <ProgressiveImage
                  src="/presence-images/iddr-apple-event-2025.png"
                  alt="Apple Developer Academy Event 2025"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="scroll-reveal stagger-2" style={{ marginTop: "1rem", ...styles.cap }}>
                Apple Developer Academy, Binus · Jakarta 2025
              </div>
            </div>
            
            <div className="scroll-reveal stagger-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={styles.entryT}>Indonesia Design Research & Apple Developer Academy, Binus - Event</span>
              <span style={styles.entryR}>Participant</span>
            </div>
            <p className="scroll-reveal stagger-2" style={{ ...styles.entryD, marginBottom: "2rem" }}>
              Engaging with the regional design community at events like “Design That Sells: How UI/UX Drives Business Growth.” These sessions are critical for bridging the gap between product intuition and measurable business outcomes.
            </p>
            <p className="scroll-reveal stagger-3" style={styles.pull}>"One-sided design fails. Great design is diplomacy."</p>
          </div>

          <hr className="scroll-reveal" style={{ ...styles.rule, marginBottom: "6rem" }} />

          {/* Speaking & Mentorship */}
          <div style={{ marginBottom: "6rem" }}>
            <div className="scroll-reveal stagger-1" style={{ ...styles.lbl, marginBottom: "3rem" }}>Speaking & Mentorship</div>
            
            <div className="scroll-reveal stagger-1" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span style={styles.entryT}>Kanvas Conference 2025, MyEduSolve</span>
                <span style={styles.entryR}>Guest Speaker</span>
              </div>
              <p className="scroll-reveal stagger-2" style={styles.entryD}>Workshop lead on Inclusivity Design Mapping. Focused on teaching participants the mechanics of intent-based interface design and Wizard of Oz testing for AI systems.</p>
            </div>

            <div className="scroll-reveal stagger-2" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span style={styles.entryT}>MSIB Kampus Merdeka, Binar Academy</span>
                <span style={styles.entryR}>Design Mentor</span>
              </div>
              <p className="scroll-reveal stagger-3" style={styles.entryD}>Mentoring cross-disciplinary students in UI/UX fundamentals. Supporting the transition from academic theory to industry-ready product execution through structured projects.</p>
            </div>
            
            <div className="scroll-reveal img-reveal stagger-3" style={{ padding: "2rem 0 0" }}>
              <div 
                onClick={() => setSelectedImage({
                  src: "/presence-images/uix-mentor-binaracademy-2022.png",
                  alt: "Mentorship Session — Binar Academy, 2022",
                  backstory: "Guiding the next generation of designers reinforced that the best way to master a craft is to teach its first principles."
                })}
                style={{ width: "100%", aspectRatio: "2/1", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5", position: 'relative', cursor: 'zoom-in' }}
              >
                <ProgressiveImage
                  src="/presence-images/uix-mentor-binaracademy-2022.png"
                  alt="Mentorship Session — Binar Academy, 2022"
                  style={{ width: "100%", height: "100%" }}
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ marginTop: "1rem", ...styles.cap }}>
                Mentorship Session — Binar Academy, 2022
              </div>
            </div>
          </div>

          {/* Community */}
          <div style={{ marginBottom: "6rem" }}>
            <div className="scroll-reveal" style={{ ...styles.lbl, marginBottom: "2rem" }}>Community Involvement</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div className="scroll-reveal stagger-1">
                <p style={styles.commT}>Connect Group (CG) GMS</p>
                <p style={styles.commD}>Active in a local spiritual community (Church CG – GMS), with a belief that every blessing and ability comes from God—not solely from personal strength or logic.</p>
              </div>
              <div className="scroll-reveal stagger-2">
                <p style={styles.commT}>Interaction Design Foundation (IxDF)</p>
                <p style={styles.commD}>Contributing to a global UX community by sharing insights on career growth and user-centered design, while engaging in meaningful discussions and learning from diverse perspectives across the field.</p>
              </div>
              <div className="scroll-reveal stagger-3">
                <p style={styles.commT}>Indonesia Design Research (IDDR)</p>
                <p style={styles.commD}>Active member of the national research community, focused on creating a network effect for emerging designers in the region.</p>
              </div>
            </div>
          </div>

          <hr className="scroll-reveal" style={{ ...styles.rule, marginBottom: "6rem" }} />

          {/* Travel Reflections */}
          <div style={{ marginBottom: "6rem", position: 'relative' }}>
            <div className="scroll-reveal" style={{ ...styles.lbl, marginBottom: "3rem" }}>Travel Reflections</div>
            
            {/* The Path Line */}
            <div className="scroll-reveal" style={{ 
              position: 'absolute', 
              left: '7px', 
              top: '100px', 
              bottom: '100px', 
              width: '1px', 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(242, 101, 34, 0.4), rgba(0,0,0,0.1))',
              zIndex: 0
            }} />

            {/* Singapore 2022 - Top Node */}
            <div className="scroll-reveal stagger-1" style={{ marginBottom: "5rem", position: 'relative', zIndex: 1, paddingLeft: '2.5rem' }}>
              <div style={{ 
                position: 'absolute', 
                left: '-2.25rem', 
                top: '0.5rem', 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: '#fff', 
                border: '2px solid rgba(0,0,0,0.2)',
                zIndex: 2
              }} />

              <div style={{ marginBottom: "1rem" }}>
                <div style={styles.entryT}>Clarke Quay, Singapore (2022)</div>
                <div style={styles.cap}>REF: STARTUP SUMMIT 01</div>
              </div>
              <p style={styles.entryD}>
                Engaging in cross-border startup pitching and regional summits. First international expansion of operational perspective, visiting regional offices and tech hubs.
              </p>
            </div>

            {/* Bali 2025 - Bottom Node (Focus) */}
            <div style={{ position: 'relative', zIndex: 1, paddingLeft: '2.5rem' }}>
              <div style={{ 
                position: 'absolute', 
                left: '-2.25rem', 
                top: '0.5rem', 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: '#fff', 
                border: '2px solid #f26522',
                boxShadow: '0 0 10px rgba(242, 101, 34, 0.3)',
                zIndex: 2
              }} />
              
              <div className="scroll-reveal stagger-1" style={{ marginBottom: "1.5rem" }}>
                <div style={styles.entryT}>Bali, Denpasar (2025)</div>
                <div style={styles.cap}>REF: REST & RECOVERY</div>
              </div>
              <p className="scroll-reveal stagger-2" style={{ ...styles.entryD, marginBottom: "2rem" }}>
                Documenting the importance of recovery for long-term operational excellence. Stepping out of daily routines to gain objective perspective on complex systems.
              </p>
              <div className="scroll-reveal img-reveal stagger-3" style={{ display: "flex", gap: "1rem" }}>
                <div 
                  onClick={() => setSelectedImage({
                    src: "/presence-images/vhendy-bali-airport-2025.46.36.jpeg",
                    alt: "Bali Airport 2025",
                    backstory: "Recovery isn't downtime; it's the recalibration period necessary for high-performance leadership."
                  })}
                  style={{ flex: 1, aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5", position: 'relative', cursor: 'zoom-in' }}
                >
                  <ProgressiveImage 
                    src="/presence-images/vhendy-bali-airport-2025.46.36.jpeg" 
                    alt="Bali Airport 2025" 
                    style={{ width: "100%", height: "100%" }} 
                    imgStyle={{ objectFit: "cover" }}
                  />
                </div>
                <div 
                  onClick={() => setSelectedImage({
                    src: "/presence-images/pantaimelasti.jpeg",
                    alt: "Pantai Melasti",
                    backstory: "Finding perspective at the edge of the world helps in prioritizing what truly matters in product roadmaps."
                  })}
                  style={{ flex: 1, aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5", position: 'relative', cursor: 'zoom-in' }}
                >
                  <ProgressiveImage 
                    src="/presence-images/pantaimelasti.jpeg" 
                    alt="Pantai Melasti" 
                    style={{ width: "100%", height: "100%" }} 
                    imgStyle={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="scroll-reveal" style={{ ...styles.rule, marginBottom: "6rem" }} />

          {/* Closing Narrative & Reel */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 className="scroll-reveal stagger-1" style={{ 
              fontSize: "2.5rem", 
              lineHeight: 1.2, 
              fontWeight: 600, 
              letterSpacing: "-0.04em", 
              color: "#1a1a1a",
              marginBottom: "3rem"
            }}>
              <div className="scroll-reveal stagger-1">It’s never just the work.</div>
              <div className="scroll-reveal stagger-2" style={{ color: "rgba(0,0,0,0.35)" }}>It’s the rooms you choose to be in.</div>
            </h2>
          </div>

          {/* Presence Reel - Visual Breakout with Safe Margins */}
          <div className="scroll-reveal" style={{ 
            width: "calc(100vw - 6rem)", 
            maxWidth: "none", 
            position: "relative", 
            left: "50%", 
            transform: "translateX(-50%)",
            marginBottom: "6rem"
          }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(5, 1fr)", 
              gap: "16px",
              width: "100%"
            }}>
              {REEL_IMAGES.map((img, i) => (
                <div 
                  key={i} 
                  className={`scroll-reveal stagger-${i + 1}`} 
                  onClick={() => setSelectedImage(img)}
                  style={{ 
                    aspectRatio: "1/1.25", 
                    background: "#f0f0f0", 
                    borderRadius: "12px", 
                    overflow: "hidden",
                    position: 'relative',
                    marginTop: i % 2 === 1 ? "2rem" : "0", 
                    transform: i === 2 ? "scale(1.05)" : "none", 
                    zIndex: i === 2 ? 2 : 1,
                    cursor: 'zoom-in'
                  }}
                >
                  <ProgressiveImage 
                    src={img.src}
                    alt={img.alt} 
                    className="presence-reel-img"
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                    }}
                    imgStyle={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className="scroll-reveal" style={{ ...styles.rule, marginBottom: "4rem" }} />

          <div className="scroll-reveal stagger-1" style={{ textAlign: "center", padding: "0 2rem" }}>
            <p className="scroll-reveal stagger-2" style={{ ...styles.pull, marginBottom: "1.5rem" }}>Live In the Future Then Build What's Missing - Y.C</p>
            <span className="scroll-reveal stagger-3" style={styles.cap}>V. VENDIRA // 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
