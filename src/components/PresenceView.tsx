import React, { useEffect } from 'react';

interface PresenceViewProps {
  navigate: (path: string) => void;
}

export default function PresenceView({ navigate }: PresenceViewProps) {
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

  return (
    <div className="about-full-container">
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
              <div className="scroll-reveal img-reveal stagger-1" style={{ width: "100%", borderRadius: "8px", background: "#f5f5f5", overflow: "hidden", aspectRatio: "16/9" }}>
                <img
                  src="/presence-images/iddr-apple-event-2025.png"
                  alt="Apple Developer Academy Event 2025"
                  referrerPolicy="no-referrer"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
            <div className="scroll-reveal stagger-1" style={{ marginBottom: "3rem" }}>Speaking & Mentorship</div>
            
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
              <div style={{ width: "100%", aspectRatio: "2/1", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5" }}>
                <img
                  src="https://picsum.photos/seed/mentorship/1200/600"
                  alt="Mentorship Session"
                  referrerPolicy="no-referrer"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          <div style={{ marginBottom: "6rem" }}>
            <div className="scroll-reveal" style={{ ...styles.lbl, marginBottom: "3rem" }}>Travel Reflections</div>
            
            <div style={{ marginBottom: "5rem" }}>
              <div className="scroll-reveal stagger-1" style={{ marginBottom: "1.5rem" }}>
                <div style={styles.entryT}>Bali, Denpasar</div>
                <div style={styles.cap}>REF: REST & RECOVERY</div>
              </div>
              <p className="scroll-reveal stagger-2" style={{ ...styles.entryD, marginBottom: "2rem" }}>
                Documenting the importance of recovery for long-term operational excellence. Stepping out of daily routines to gain objective perspective on complex systems.
              </p>
              <div className="scroll-reveal img-reveal stagger-3" style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1, aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5" }}>
                  <img src="https://picsum.photos/seed/bali1/800/600" alt="Bali" referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5" }}>
                  <img src="https://picsum.photos/seed/bali2/800/600" alt="Bali Coast" referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>

            <div className="scroll-reveal stagger-4">
              <div style={{ marginBottom: "1rem" }}>
                <div style={styles.entryT}>Clarke Quay, Singapore</div>
                <div style={styles.cap}>REF: STARTUP SUMMIT 01</div>
              </div>
              <p className="scroll-reveal stagger-5" style={styles.entryD}>
                Engaging in cross-border startup pitching and regional summits. First international expansion of operational perspective, visiting regional offices and tech hubs.
              </p>
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
              {["academy", "stage", "mentorship", "summit", "field"].map((seed, i) => (
                <div key={seed} className={`scroll-reveal stagger-${i + 1}`} style={{ 
                  aspectRatio: "1/1.25", 
                  background: "#f0f0f0", 
                  borderRadius: "12px", 
                  overflow: "hidden" 
                }}>
                  <img 
                    src={`https://picsum.photos/seed/vhendy-presence-${seed}/800/1000`} 
                    alt={`${seed} presence moment`} 
                    referrerPolicy="no-referrer"
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" 
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
