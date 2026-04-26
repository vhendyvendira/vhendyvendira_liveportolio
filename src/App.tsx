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
import LearningSection from './components/LearningSection';
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
      subhead: "I don’t just think about products, I build to understand them." 
    },
    from_about: { 
      headline: "Designing with clarity, building with intent", 
      subhead: "4+ years in product, with marketing and edu background, now leveraging AI." 
    },
    from_presence: { 
      headline: "From real-world signals, to what gets built", 
      subhead: "I turn real-world insights into design and scalable product decisions." 
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

  const [isFirstVisit] = useState(() => {
    const visited = sessionStorage.getItem('vhendy_visited');
    if (!visited) {
      sessionStorage.setItem('vhendy_visited', 'true');
      return true;
    }
    return false;
  });

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 850);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ── Footer ── */
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    let showTimeout: ReturnType<typeof setTimeout> | null = null;
    let rafId: number;

    const handleScrollUpdate = () => {
      // Find the active scroll container
      // On mobile home, the window itself is the scroll container because portfolio-root height is auto
      // But on About/Presence/Report, they have their own scroll containers even on mobile
      const isFixedPage = route.page === 'about' || route.page === 'presence' || route.page === 'report';
      
      const container = (isMobile && !isFixedPage) ? document.documentElement : (
        rightPanelRef.current || 
        document.querySelector('.page-scroll-container') || 
        document.querySelector('.report-view')
      );
      
      if (!container) return;

      let scrollTop, scrollHeight, clientHeight;
      if (isMobile && !isFixedPage) {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      } else {
        ({ scrollTop, scrollHeight, clientHeight } = container as HTMLElement);
      }

      if (scrollHeight === 0) return;

      // Check if we are at the bottom (with buffer for accuracy) or if content is short
      const isShort = scrollHeight <= clientHeight + 50; // Increased buffer for mobile
      const distanceToBottom = scrollHeight - clientHeight - scrollTop;
      const isAtBottom = distanceToBottom <= 100 || isShort; // More generous buffer for mobile

      if (isAtBottom) {
        if (footerVisible) return;
        
        if (!showTimeout) {
          showTimeout = setTimeout(() => {
            setFooterVisible(true);
            showTimeout = null;
          }, isMobile ? 100 : 1000); // Faster appearance on mobile
        }
      } else {
        if (showTimeout) {
          clearTimeout(showTimeout);
          showTimeout = null;
        }
        if (footerVisible) {
          setFooterVisible(false);
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScrollUpdate);
    };

    /**
     * REQUIREMENT: Consistency across ALL pages
     * Capture phase allows detecting scroll on internal containers.
     */
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    // Initial check after layout settles
    const initTimeout = setTimeout(handleScrollUpdate, 300);

    return () => {
      if (showTimeout) clearTimeout(showTimeout);
      clearTimeout(initTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [footerVisible, route.page, activeCS, listVisible]);

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

  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Show status after 20s, then return to name after another 20s, repeating.
    const interval = setInterval(() => {
      setShowStatus(current => !current);
    }, 20000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-full">
      <CustomCursor />
      
      {(route.page === "about" || route.page === "presence" || route.page === "report") && (
        <button 
          className="about-back-btn" 
          onClick={() => navigate("/")}
          style={{ 
            opacity: 1, 
            transform: "none",
            /* Overriding any potential inherited animations if we were using framer motion previously */
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back</span>
        </button>
      )}

      <AnimatePresence>
        {isLoading && <LoadingScreen isReload={!isFirstVisit} onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>

      <GalaxyBackground />
          {route.page === "about" ? (
        <motion.div
          key="about"
          className="page-scroll-container"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "fixed", inset: 0, zIndex: 50, overflowY: "auto" }}
        >
          <AboutView navigate={navigate} />
        </motion.div>
      ) : route.page === "presence" ? (
        <motion.div
          key="presence"
          className="page-scroll-container"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "fixed", inset: 0, zIndex: 50, overflowY: "auto" }}
        >
          <PresenceView navigate={navigate} />
        </motion.div>
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
              className="intro-section" 
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
                className="status-indicator-wrap"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="status-dot-container">
                  <motion.div 
                    className="status-dot-main" 
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
                    className="status-dot-pulse" 
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
                <div className="status-text-container">
                  <AnimatePresence mode="wait">
                    {!showStatus ? (
                      <motion.span
                        key="name"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="status-text status-name"
                      >
                        VHENDY VENDIRA.
                      </motion.span>
                    ) : (
                      <motion.span
                        key="status"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="status-text status-available"
                      >
                        AVAILABLE FOR NEXT OPPORTUNITY.
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              
              <h1 
                className="main-headline"
                onClick={() => { if (shouldType) setSkipIntro(true); }}
              >
                <div key={hlId} style={{ position: "relative" }}>
                  {(() => {
                    const text = headlineData.headline;
                    const vIndex = text.indexOf("Vhendy");
                    const vEnd = vIndex + 6; // "Vhendy".length

                    if (shouldType) {
                      if (vIndex === -1) {
                        return (
                          <div style={{ transition: "opacity 0.4s ease" }}>
                            {typedTitle}
                            <span className={`type-cursor ${titleDone ? 'done' : 'blinking'}`} />
                          </div>
                        );
                      }

                      return (
                        <div style={{ transition: "opacity 0.4s ease" }}>
                          {typedTitle.length <= vIndex ? (
                            typedTitle
                          ) : (
                            <>
                              {text.slice(0, vIndex)}
                              <motion.span
                                className="vhendy-span"
                                animate={titleDone ? {
                                  filter: ["blur(2px)", "blur(0px)"],
                                  y: [2, 0],
                                  opacity: [0.85, 1],
                                } : {}}
                                transition={{
                                  delay: 0.25,
                                  duration: 0.6,
                                  ease: [0.16, 1, 0.3, 1]
                                }}
                              >
                                {typedTitle.slice(vIndex, Math.min(typedTitle.length, vEnd))}
                              </motion.span>
                              {typedTitle.length > vEnd && typedTitle.slice(vEnd)}
                            </>
                          )}
                          <span className={`type-cursor ${titleDone ? 'done' : 'blinking'}`} />
                        </div>
                      );
                    } else {
                      if (vIndex === -1) {
                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            {text}
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {text.slice(0, vIndex)}
                          <span className="vhendy-span">Vhendy</span>
                          {text.slice(vEnd)}
                        </motion.div>
                      );
                    }
                  })()}
                </div>
              </h1>

              <AnimatePresence>
                {subheadVisible && (
                  <motion.p 
                    className="main-subheadline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {headlineData.subhead}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="navigation-section">
              <nav className="nav-container">
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

              <LearningSection visible={listVisible} />
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

      <div className={`year-footer ${route.page !== '/' && route.page !== 'home' && route.page !== 'work' ? 'full-width' : ''} ${isMobile ? 'is-mobile' : ''}`}>© 2026</div>
      <SocialFooter 
        visible={footerVisible} 
        fullWidth={route.page !== '/' && route.page !== 'home' && route.page !== 'work'} 
        isMobile={isMobile}
      />
    </div>
  );
}
