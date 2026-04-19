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

/* ================================================
   HOOKS
================================================ */
function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, "") || "";
  if (hash.startsWith("work/")) {
    return { page: "work" as const, slug: hash.replace("work/", "") };
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
    // Force homepage on every full page initialization/mount
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

function useTypewriter(text: string, speed = 50, delay = 0, active = true) {
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
        setDisplayed(text.slice(0, i + 1));
        i++;
        setProgress(i / text.length);
        
        const jitter = (Math.random() - 0.5) * (speed * 0.4);
        timeoutId = window.setTimeout(type, Math.max(10, speed + jitter));
      } else {
        setDone(true);
        setProgress(1);
      }
    };

    const startTimeout = window.setTimeout(type, delay);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(timeoutId);
    };
  }, [text, speed, delay, active]);

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
      headline: "Hello from the Flight Deck, I’m Vhendy Vendira!", 
      subhead: "6+ years in satellite life, helping startups find their orbit through collaborative & intentional product design." 
    },
    from_about: { 
      headline: "Back on the Deck — informed by real signals.", 
      subhead: "I translate customer insights into clear product decisions, balancing user needs, business impact, and technical constraints." 
    },
    from_presence: { 
      headline: "Back in Orbit — focused on outcomes.", 
      subhead: "I drive products from ambiguous ideas to shipped solutions, aligning teams and delivering measurable impact at scale." 
    }
  };

  const [hlId, setHlId] = useState<keyof typeof HEADLINES>(() => {
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const isReload = navEntry?.type === "reload";

    if (isReload) {
      sessionStorage.removeItem('navSource');
      return 'first_visit';
    }

    const src = sessionStorage.getItem('navSource');
    if (src === 'about') return 'from_about';
    if (src === 'presence') return 'from_presence';
    return 'first_visit';
  });

  const [isLoading, setIsLoading] = useState(true);

  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (rightPanelRef.current) {
        setShowScrollTop(rightPanelRef.current.scrollTop > 300);
      }
    };
    const panel = rightPanelRef.current;
    if (panel) {
      panel.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (panel) panel.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    rightPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (route.page === 'about') sessionStorage.setItem('navSource', 'about');
    if (route.page === 'presence') sessionStorage.setItem('navSource', 'presence');
    
    if (route.page === 'home') {
      const src = sessionStorage.getItem('navSource');
      if (src) {
        setHlId(src === 'about' ? 'from_about' : 'from_presence');
        sessionStorage.removeItem('navSource');
      }
    }
  }, [route.page]);

  const headlineData = HEADLINES[hlId];

  const { displayed: typedTitle, done: titleDone, progress: titleProgress } = useTypewriter(headlineData.headline, 45, 400, !isLoading);

  const [listVisible, setListVisible] = useState(false);
  const [subheadVisible, setSubheadVisible] = useState(false);

  useEffect(() => {
    if (titleProgress >= 0.5 && !listVisible) {
      setListVisible(true);
    }
    if (titleProgress >= 0.75 && !subheadVisible) {
      setSubheadVisible(true);
    }
  }, [titleProgress, listVisible, subheadVisible]);

  useEffect(() => {
    setListVisible(false);
    setSubheadVisible(false);
  }, [hlId]);

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

  /* ── Home Layout State ── */
  const [vis, setVis] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState(headlineData.headline);
  const [currentSubhead, setCurrentSubhead] = useState(headlineData.subhead);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>

      <GalaxyBackground />
      {route.page === "about" ? (
        <AboutView navigate={navigate} />
      ) : route.page === "presence" ? (
        <PresenceView navigate={navigate} />
      ) : (
        <div className="portfolio-root" style={!!activeCS ? { pointerEvents: "none", userSelect: "none" } : {}}>
          {/* LEFT */}
          <div className="left-panel">
            <div style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }}>
              <OrbitalCanvas />
            </div>
            <div className="left-panel-intro" style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#f26522" }} />
                <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                  ARTEMIS II "ALL" 2026
                </span>
              </div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#1a1a1a", marginBottom: "1.5rem" }}>
                <div style={{ transition: "opacity 0.4s ease" }}>
                  {typedTitle}
                  {!titleDone && <span className="type-cursor" />}
                </div>
              </h1>
              <p style={{ 
                fontSize: "16px", 
                lineHeight: 1.6, 
                color: "rgba(0,0,0,0.6)", 
                opacity: subheadVisible ? 1 : 0, 
                transform: subheadVisible ? "translateY(0)" : "translateY(14px)", 
                transition: "transform 0.6s ease-out, opacity 0.5s ease-out" 
              }}>
                {headlineData.subhead}
              </p>
            </div>

            <div style={{ position: "relative", zIndex: 2, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(8px)", transition: "all 0.5s ease 0.1s" }}>
              <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {[
                  { label: "Selected Work", path: "home" },
                  { label: "About Story", path: "about" },
                  { label: "Public Presence", path: "presence" }
                ].map(item => {
                  const isActive = (route.page === item.path) || (route.page === "work" && item.path === "home") || (route.page === "home" && item.path === "home");
                  return (
                    <button
                      key={item.label}
                      className={`nav-item${isActive ? " active" : ""}`}
                      onClick={() => navigate(item.path === "home" ? "/" : `/${item.path}`)}
                    >
                      {item.label}
                    </button>
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
                <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>CUREATED MISSIONS</span>
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
          <CaseStudyModal cs={activeCS} onClose={() => navigate("/")} />
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
