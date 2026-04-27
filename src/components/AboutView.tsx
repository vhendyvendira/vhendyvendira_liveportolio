import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProgressiveImage from './ProgressiveImage';
import MusicPlayer from './MusicPlayer';
import WorldClock from './WorldClock';
import RunningActivity from './RunningActivity';
import ReadingActivity from './ReadingActivity';
import LanguageActivity from './LanguageActivity';
import GardeningActivity from './GardeningActivity';

interface SemanticTermProps {
  term: string;
  info: string;
  imgSrc?: string;
}

function SemanticTerm({ term, info, imgSrc }: SemanticTermProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <span 
      className="semantic-term"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        color: '#1a1a1a', 
        fontWeight: 500, 
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        cursor: 'help',
        position: 'relative'
      }}
    >
      {term}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'fixed',
              left: mousePos.x + 20,
              top: mousePos.y - 40,
              zIndex: 1000,
              pointerEvents: 'none',
              width: imgSrc ? '200px' : '160px',
              backgroundColor: '#fff',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '8px',
              padding: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              fontSize: '11px',
              lineHeight: 1.4,
              color: 'rgba(0,0,0,0.6)',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {imgSrc && (
              <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px', background: '#f5f5f5' }}>
                <img src={imgSrc} alt={term} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{term}</div>
            {info}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

interface AboutViewProps {
  navigate: (path: string) => void;
}

export default function AboutView({ navigate }: AboutViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLogicMode, setIsLogicMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const els = containerRef.current.querySelectorAll('.about-story-item');
      if (!els || els.length === 0) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-story-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      
      els.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const STORY = [
    {
      label: 'Origin',
      body: (
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.7)' }}>
          I entered <SemanticTerm term="product development" info="From ideation to final rollout, focusing on bridging the gap between vision and execution." /> through a non-linear path. With a background in information systems and early experience in marketing communications, I learned that no knowledge is wasted—each piece shaping how I think about clarity: what a product solves, why it exists, and why it matters. 
        </p>
      ),
    },
    {
      label: 'Perspective',
      body: (
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.7)' }}>
          I tend to start with questions rather than answers, often thinking through a <SemanticTerm term="first-principles" info="Breaking problems down to their most basic components to build fresh, unbiased solutions." /> lens. Even in the AI era, taking the time to define the problem well still matters. To me, products are shaped by real needs—and clarified through the act of building, testing, and refining over time.
        </p>
      ),
    },
    {
      label: 'Direction',
      body: (
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.7)' }}>
          I’m currently focused on products that absorb complexity so users don’t have to—especially in Web3, financial, healthcare, and enterprise contexts where clarity is critical. With AI, I take a more hands-on approach to building, turning ideas into working products through <SemanticTerm term="rapid iteration" info="A cycle of shipping, learning, and refining that drastically reduces time-to-market." /> and continuous learning.
        </p>
      ),
    },
  ];

  return (
    <div 
      className="about-full-container" 
      ref={containerRef}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '120px 120px',
        position: 'relative'
      }}
    >
      <div className="about-content">
        <div className="about-page">
          {/* Header */}
          <div className="about-story-item" style={{ marginBottom: '2.5rem' }}>
            <span className="about-label">Personal Narrative</span>
          </div>

          <div className="about-story-item" style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '3rem', lineHeight: 1.2, fontWeight: 600, letterSpacing: '-0.04em', color: '#1a1a1a' }}>
              <div>I make things legible —</div>
              <div style={{ color: 'rgba(0,0,0,0.35)' }}>for people, for teams,</div>
              <div style={{ color: 'rgba(0,0,0,0.35)' }}>for the future.</div>
            </h1>
          </div>

          <div className="about-story-item" style={{ marginBottom: '4rem' }}>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(0,0,0,0.6)', maxWidth: '540px' }}>
              Building products and teams people choose, trust, and grow with.
            </p>
          </div>

          {/* Simple Image */}
          <div className="about-story-item" style={{ marginBottom: '6rem' }}>
            <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: '8px', overflow: 'hidden', background: '#f5f5f5', position: 'relative' }}>
              <ProgressiveImage 
                src="/about-images/google-singapore-2022.png" 
                alt="Working environment at Google Singapore"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>IASTI, 2022</p>
          </div>

          <hr className="about-rule" />

          {/* Story Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginBottom: '6rem' }}>
            {STORY.map(({ label, body }) => (
              <div key={label} className="about-story-item">
                <div style={{ marginBottom: '1rem' }}>
                   <p style={{ fontSize: '11px', fontWeight: 600, color: '#f26522', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>{label}</p>
                </div>
                <div>
                  {body}
                </div>
              </div>
            ))}
          </div>

          <hr className="about-rule" />

          {/* Arsenal vs Mentality Section */}
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
              
              {/* THE ARSENAL */}
              <div className="about-story-item">
                <div style={{ marginBottom: '2rem' }}>
                  <span className="about-label" style={{ color: '#000', opacity: 0.4 }}>01 / THE ARSENAL</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>Hard Skills & Tools</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { h: 'Product Design', p: 'Shaping flows from concept to UI using Whimsical & Figma.' },
                    { h: 'Technical Frameworks', p: 'Using JavaScript to navigate constraints and inform design decisions.' },
                    { h: 'AI Implementation', p: 'Designing AI flows with Claude, Cursor, Lovable, Antigravity.' },
                    { h: 'Program Operations', p: 'Structuring workflows with Jira, ClickUp, Trello from plan to delivery.' },
                  ].map((item, idx) => (
                    <div key={idx} style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '1.5rem' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '0.25rem' }}>{item.h}</h4>
                      <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(0,0,0,0.5)' }}>{item.p}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* THE MENTALITY */}
              <div className="about-story-item">
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span className="about-label" style={{ color: '#f26522' }}>02 / THE MENTALITY</span>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>Operating Principles</h3>
                  </div>
                  
                  {/* Surprising Moment: The Switch */}
                  <div 
                    onClick={() => setIsLogicMode(!isLogicMode)}
                    style={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '4px 8px', 
                      background: isLogicMode ? 'rgba(242, 101, 34, 0.1)' : 'rgba(0,0,0,0.03)',
                      borderRadius: '40px',
                      transition: 'all 0.3s ease',
                      border: isLogicMode ? '1px solid rgba(242, 101, 34, 0.2)' : '1px solid transparent'
                    }}
                  >
                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: isLogicMode ? '#f26522' : 'rgba(0,0,0,0.3)' }}>
                      {isLogicMode ? 'FIRST PRINCIPLES ON' : 'POLISH MODE'}
                    </span>
                    <div style={{ 
                      width: '24px', 
                      height: '12px', 
                      background: isLogicMode ? '#f26522' : 'rgba(0,0,0,0.1)', 
                      borderRadius: '10px', 
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px'
                    }}>
                      <motion.div 
                        animate={{ x: isLogicMode ? 12 : 0 }}
                        style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }} 
                      />
                    </div>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  {/* Logic mode grid background reveal */}
                  <AnimatePresence>
                    {isLogicMode && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ 
                          position: 'absolute', 
                          inset: '-20px', 
                          zIndex: -1, 
                          backgroundImage: 'radial-gradient(rgba(242, 101, 34, 0.15) 1px, transparent 1px)', 
                          backgroundSize: '20px 20px',
                          pointerEvents: 'none'
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                      { 
                        h: isLogicMode ? 'Root-Cause Analysis' : 'Understand the Real Problem', 
                        p: isLogicMode ? 'Bypass surface symptoms; identify the first-principles logic before architecting a solution.' : 'Start by identifying the root cause and current state before deciding.' 
                      },
                      { 
                        h: isLogicMode ? 'Contextual Mapping' : 'Context-Driven Decisions', 
                        p: isLogicMode ? 'Initiative is variable, calibrated to system maturity and organizational velocity.' : 'Knowing when to take initiative and when to align with direction.' 
                      },
                      { 
                        h: isLogicMode ? 'Constraint Reframing' : 'Think Beyond Constraints', 
                        p: isLogicMode ? 'Treating friction as a boundary marker rather than a terminal point. Re-routing as a default loop.' : 'When blocked, explore alternative paths instead of forcing solutions.' 
                      },
                      { 
                        h: isLogicMode ? 'Systemic Harmony' : 'Calm, Collaborative Thinking', 
                        p: isLogicMode ? 'Aligning human variables to reduce friction in the final delivery output.' : 'Staying composed, understanding how others think, and aligning decisions.' 
                      },
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx + (isLogicMode ? 'logic' : 'polish')}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ 
                          position: 'relative',
                          background: (isLogicMode || idx === 0) ? (isLogicMode ? '#fff' : '#fafafa') : 'transparent', 
                          padding: (isLogicMode || idx === 0) ? '1.25rem' : '0 0 0 1.5rem', 
                          borderRadius: '8px', 
                          borderLeft: (isLogicMode || idx === 0) ? 'none' : '1px solid rgba(0,0,0,0.1)',
                          border: isLogicMode ? '1px solid rgba(242, 101, 34, 0.1)' : 'none',
                          boxShadow: isLogicMode ? '0 10px 30px rgba(242, 101, 34, 0.05)' : 'none'
                        }}
                      >
                        {/* Logic mode "measurement" marks */}
                        {isLogicMode && (
                          <div style={{ position: 'absolute', top: '-5px', left: '-5px', fontSize: '8px', color: '#f26522', fontFamily: 'var(--font-mono)' }}>+</div>
                        )}
                        {isLogicMode && (
                          <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', fontSize: '8px', color: '#f26522', fontFamily: 'var(--font-mono)' }}>+</div>
                        )}

                        <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '0.25rem', color: isLogicMode ? '#f26522' : '#1a1a1a' }}>{item.h}</h4>
                        <p style={{ fontSize: '14px', lineHeight: 1.5, color: isLogicMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }}>{item.p}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

            </div> {/* End Grid */}
          </div> {/* End Arsenal/Mentality Wrapper */}

          <hr className="about-rule" />

          {/* Beyond What I Know Section */}
          <div className="about-story-item" style={{ marginTop: '6rem', marginBottom: '6rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="about-label" style={{ color: '#000', opacity: 0.4 }}>03 / GROWTH</span>
              <h3 style={{ fontSize: '24px', fontWeight: 600, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>Beyond What I Know</h3>
            </div>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', maxWidth: '600px' }}>
              I grew by taking on problems I wasn’t fully ready for —{' '}
              <motion.span
                initial={{ opacity: 0.2, filter: 'blur(4px)' }}
                whileHover={{ opacity: 1, filter: 'blur(0px)' }}
                whileTap={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ cursor: 'default', display: 'inline-block' }}
              >
                and learning through them.
              </motion.span>
            </p>
          </div>

          <hr className="about-rule" />

          {/* Contact */}
          <div className="about-story-item" style={{ marginBottom: '4rem' }}>
            <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)', marginBottom: '2.5rem' }}>
              Curriculum vitae — available on request or below.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" className="about-cta-link" style={{ fontSize: '16px', fontWeight: 600 }}>
                View full CV
                <span style={{ fontSize: '18px' }}>→</span>
              </a>
              
              <div style={{ marginTop: '0.75rem', fontSize: '14px', color: 'rgba(0,0,0,0.4)', lineHeight: 1.6 }}>
                <a href="mailto:vhendyvendira@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>vhendyvendira@gmail.com · Jakarta, ID · Open to Collaboration</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MusicPlayer />
      <WorldClock />
      <RunningActivity />
      <ReadingActivity />
      <LanguageActivity />
      <GardeningActivity />
    </div>
  );
}
