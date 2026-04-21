import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { CASE_STUDIES } from './constants';
import CaseStudyModal from './components/CaseStudyModal';
import CaseStudyCard from './components/CaseStudyCard';
import AboutView from './components/AboutView';
import PresenceView from './components/PresenceView';
import GalaxyBackground from './components/GalaxyBackground';
import OrbitalCanvas from './components/OrbitalCanvas';
import SocialFooter from './components/SocialFooter';
import LoadingScreen from './components/LoadingScreen';
import ReportView from './components/ReportView';
import CustomCursor from './components/CustomCursor';
import Magnetic from './components/Magnetic';

/* ================================================
   HOOKS
================================================ */
function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, "") || "";
  if (hash.startsWith("work/")) {
    return { page: "work" as const, slug: hash.replace("work/", "") };
  }
  if (hash.startsWith("report/")) {
    return { page: "report" as const, slug: hash.replace("report/", "") };
  }
  if (hash === "about") {
    return { page: "about" as const, slug: null };
  }
  if (hash === "presence") {
    return { page: "presence" as const, slug: null };
  }
  return { page: "home" as const, slug: null };
}

function useHashRouter() {
  const [route, setRoute] = useState(() => {
    const initialHash = window.location.hash.replace(/^#\/?/, "");
    // If we have a report link, we allow it to load directly
    if (initialHash.startsWith("report/")) {
      return { page: "report" as const, slug: initialHash.replace("report/", "") };
    }
    // Otherwise, for home/about/presence, we force home state for the entrance experience
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    return { page: "home" as const, slug: null };
  });

  useEffect(() => {
    const handler = () => setRoute(parseHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = useCallback((path: string) => {
    window.location.hash = path === "/" ? "" : path;
  }, []);
  return { route, navigate };
}

function useTypewriter(text: string, active = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    
    let timeoutId: number;
    let i = 0;
    
    setDisplayed("");
    setDone(false);
    setProgress(0);

    const type = () => {
      if (i < text.length) {
        const char = text[i];
        const nextPartial = text.slice(0, i + 1);
        
        // Base speeds (tuned to fit 1.2-1.5s total duration)
        let delay = char === " " ? 15 : 22; 
        
        // Punctuation pauses
        if ([",", "—", ".", "&"].includes(char)) {
          delay = 120;
        }

        // Logic-based micro-pauses for specific phrases
        if (nextPartial.endsWith("Hi,")) delay = 160;
        if (nextPartial.endsWith("Vhendy")) delay = 220;
        if (nextPartial.endsWith("—")) delay = 180;

        // Apply a tiny bit of natural jitter to non-pauses
        if (delay < 100) {
          delay += (Math.random() - 0.5) * 10;
        }

        setDisplayed(nextPartial);
        i++;
        setProgress(i / text.length);
        
        timeoutId = window.setTimeout(type, delay);
      } else {
        setDone(true);
        setProgress(1);
      }
    };

    const startTimeout = window.setTimeout(type, 600);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(timeoutId);
    };
  }, [text, active]);

  return { displayed, done, progress };
}

/* ================================================
   COMPONENTS
================================================ */

export default function App() {
  const { route, navigate } = useHashRouter();
  const activeCS = route.page === "work" ? CASE_STUDIES.find(c => c.slug === route.slug) : null;

  const HEADLINES = {
    first_visit: { 
      headline: "Hi, I’m Vhendy — Product Designer & Builder", 
      subhead: "4+ years in product, with a background in marketing and education, focused on strategy and leveraging AI for growth." 
    },
    from_about: { 
      headline: "About me — Design × Engineering.", 
      subhead: "I design with intent and build to validate, grounding ideas in strategy, execution, and measurable impact." 
    },
    from_presence: { 
      headline: "Presence — Grounded in the Real World.", 
      subhead: "I turn real-world observations into insights that shape thoughtful design and scalable product decisions." 
    }
  };

  const [hlId, setHlId] = useState<keyof typeof HEADLINES>(() => {
    const src = sessionStorage.getItem('navSource');
    if (src === 'about') return 'from_about';
    if (src === 'presence') return 'from_presence';
    return 'first_visit';
  });

  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    return sessionStorage.getItem('hasSeenIntroAnimation') === 'true';
  });

  const [skipIntro, setSkipIntro] = useState(false);

  const [isLoading, setIsLoading] = useState(() => {
    const hash = window.location.hash.replace(/^#\/?/, "");
    return !hash.startsWith("report/");
  });

  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (rightPanelRef.current) {
        const top = rightPanelRef.current.scrollTop;
        setShowScrollTop(top > 300);
        // Persist scroll position for the list view
        if (route.page === 'home' || route.page === 'work') {
          sessionStorage.setItem('portfolioScrollTop', String(top));
        }
      }
    };
    const panel = rightPanelRef.current;
    if (panel) {
      panel.addEventListener('scroll', handleScroll);
      
      // Restore scroll position when returning to the list
      if (!isLoading && (route.page === 'home' || route.page === 'work')) {
        const saved = sessionStorage.getItem('portfolioScrollTop');
        if (saved) {
          panel.scrollTop = parseInt(saved, 10);
        }
      }
    }
    return () => {
      if (panel) panel.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, route.page]);

  const scrollToTop = () => {
    rightPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (route.page === 'about') sessionStorage.setItem('navSource', 'about');
    if (route.page === 'presence') sessionStorage.setItem('navSource', 'presence');
    if (route.page === 'report') sessionStorage.setItem('navSource', 'report');
    
    if (route.page === 'home') {
      const src = sessionStorage.getItem('navSource');
      if (src) {
        if (src === 'about') setHlId('from_about');
        else if (src === 'presence') setHlId('from_presence');
        // If returning from report, we might want a different headline or just skip delay
        sessionStorage.removeItem('navSource');
      }
    }
  }, [route.page]);

  const headlineData = HEADLINES[hlId];

  // Logic: Typewriter only for first_visit IF intro not seen yet and not skipped
  const shouldType = hlId === 'first_visit' && !hasSeenIntro && !skipIntro;

  const { displayed: typedTitle, done: titleDone, progress: titleProgress } = useTypewriter(
    headlineData.headline, 
    !isLoading && shouldType
  );

  const [listVisible, setListVisible] = useState(false);
  const [subheadVisible, setSubheadVisible] = useState(false);

  // Interaction Skip: scroll, wheel, or key to instantly finish intro
  useEffect(() => {
    if (!shouldType) return;

    const handleInteraction = () => setSkipIntro(true);

    window.addEventListener('wheel', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [shouldType]);

  useEffect(() => {
    if (shouldType) {
      if (titleProgress >= 0.4 && !subheadVisible) setSubheadVisible(true);
      if (titleProgress >= 0.8 && !listVisible) setListVisible(true);
      if (titleDone) sessionStorage.setItem('hasSeenIntroAnimation', 'true');
    } else {
      // Instant/Fade-up state: show everything quickly
      setSubheadVisible(true);
      setListVisible(true);
    }
  }, [titleProgress, titleDone, shouldType, subheadVisible, listVisible]);

  useEffect(() => {
    // Reset visibility states when changing headlines unless it's the returning state
    if (!hasSeenIntro) {
      setListVisible(false);
      setSubheadVisible(false);
    }
  }, [hlId, hasSeenIntro]);

  /* ── Footer ── */
  const [footerVisible, setFooterVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const rightPanel = document.querySelector('.right-panel');
    if (!rightPanel) return;

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const isNearBottom = (scrollTop + clientHeight) >= (scrollHeight * 0.9);
      const isScrollingDown = scrollTop > lastScrollY.current;

      if (isScrollingDown && isNearBottom) {
        setFooterVisible(true);
      } else if (scrollTop < lastScrollY.current) {
        setFooterVisible(false);
      }
      lastScrollY.current = scrollTop;
    };

    rightPanel.addEventListener("scroll", handleScroll, { passive: true });
    return () => rightPanel.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Keyboard Shortcuts ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if a case study is open and we aren't in a report
      if (!activeCS || route.page !== "work") return;

      if (e.key === 'Escape') {
        navigate("/");
      } else if (e.key === 'ArrowRight') {
        const currentIndex = CASE_STUDIES.findIndex(cs => cs.id === activeCS.id);
        const nextIndex = (currentIndex + 1) % CASE_STUDIES.length;
        navigate(`work/${CASE_STUDIES[nextIndex].slug}`);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = CASE_STUDIES.findIndex(cs => cs.id === activeCS.id);
        const prevIndex = (currentIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
        navigate(`work/${CASE_STUDIES[prevIndex].slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCS, route.page, navigate]);

  /* ── Home Layout State ── */

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>

      <GalaxyBackground />
      {route.page === "about" ? (
        <AboutView navigate={navigate} />
      ) : route.page === "presence" ? (
        <PresenceView navigate={navigate} />
      ) : route.page === "report" ? (
        <ReportView cs={CASE_STUDIES.find(c => c.slug === route.slug) || CASE_STUDIES[0]} navigate={navigate} />
      ) : (
        <div className="portfolio-root" style={!!activeCS ? { pointerEvents: "none", userSelect: "none" } : {}}>
          {/* LEFT */}
          <div className="left-panel">
            <div style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }}>
              <OrbitalCanvas />
            </div>
            <motion.div 
              className="left-panel-intro" 
              style={{ position: "relative", zIndex: 2 }}
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              <motion.div 
                style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ position: "relative", width: "8px", height: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div 
                    style={{ 
                      position: "absolute",
                      width: "100%", 
                      height: "100%", 
                      borderRadius: "50%", 
                      background: "#22c55e",
                      zIndex: 2,
                      boxShadow: "0 0 8px rgba(34, 197, 94, 0.4)"
                    }} 
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    style={{ 
                      position: "absolute",
                      width: "100%", 
                      height: "100%", 
                      borderRadius: "50%", 
                      background: "#22c55e",
                      zIndex: 1
                    }} 
                    animate={{ 
                      scale: [1, 2.8],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </div>
                <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                  VHENDY VENDIRA.
                </span>
              </motion.div>
              
              <h1 
                onClick={() => { if (shouldType) setSkipIntro(true); }}
                style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: 600, 
                  lineHeight: 1.1, 
                  letterSpacing: "-0.04em", 
                  color: "#1a1a1a", 
                  marginBottom: "1.5rem",
                  minHeight: "3.3em", 
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  cursor: shouldType ? "pointer" : "default"
                }}
              >
                <div key={hlId} style={{ position: "relative" }}>
                  {shouldType ? (
                    <div style={{ transition: "opacity 0.4s ease" }}>
                      {typedTitle}
                      <span className={`type-cursor ${titleDone ? 'done' : 'blinking'}`} />
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {headlineData.headline}
                    </motion.div>
                  )}
                </div>
              </h1>

              <AnimatePresence>
                {subheadVisible && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      fontSize: "16px", 
                      lineHeight: 1.6, 
                      color: "rgba(0,0,0,0.6)", 
                    }}
                  >
                    {headlineData.subhead}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {[
                  { label: "Selected Work", path: "home" },
                  { label: "About Story", path: "about" },
                  { label: "Public Presence", path: "presence" }
                ].map((item, i) => {
                  const isActive = (route.page === item.path) || (route.page === "work" && item.path === "home") || (route.page === "home" && item.path === "home");
                  return (
                    <Magnetic key={item.label} strength={0.1}>
                      <motion.button
                        className={`nav-item${isActive ? " active" : ""}`}
                        onClick={() => navigate(item.path === "home" ? "/" : `/${item.path}`)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={subheadVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: subheadVisible ? 0.3 + (i * 0.1) : 0,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        {item.label}
                      </motion.button>
                    </Magnetic>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-panel" ref={rightPanelRef}>
            <div style={{ width: "100%" }}>
              {/* Header Animates separately */}
              <motion.div 
                style={{ 
                  display: listVisible ? "flex" : "none", 
                  justifyContent: "space-between", 
                  alignItems: "baseline", 
                  paddingBottom: "3rem", 
                  borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={listVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>MISSION LAUNCHED </span>
                <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.3)", fontFamily: "var(--font-mono)" }}>0{CASE_STUDIES.length} // OPS</span>
              </motion.div>
              {CASE_STUDIES.map((cs, i) => (
                <CaseStudyCard key={cs.id} cs={cs} index={i} navigate={navigate} visible={listVisible} />
              ))}
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              style={{
                position: "fixed",
                bottom: "5.5rem", // Moved up to avoid overlap with social icons
                right: "2.1rem",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#1a1a1a",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "none",
                opacity: showScrollTop ? 1 : 0,
                transform: showScrollTop ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                pointerEvents: showScrollTop ? "auto" : "none",
                zIndex: 100,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f26522"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#1a1a1a"}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {activeCS && route.page !== "about" && (
          <CaseStudyModal cs={activeCS} onClose={() => navigate("/")} navigate={navigate} />
        )}
      </AnimatePresence>

      {route.page === "work" && !activeCS && (
        <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", background: "rgba(245,244,242,0.95)", zIndex: 200 }}>
          <p style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "24px", color: "#1a1a1a" }}>Case study not found.</p>
          <button onClick={() => navigate("/")} style={{ fontSize: "13px", color: "rgba(0,0,0,0.45)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>← Back to home</button>
        </div>
      )}

      <div className="year-footer">© 2026</div>
      <SocialFooter visible={footerVisible} />
    </>
  );
}
