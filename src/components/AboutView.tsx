import React, { useEffect, useRef } from 'react';

interface AboutViewProps {
  navigate: (path: string) => void;
}

export default function AboutView({ navigate }: AboutViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
          I approached product development through a non-traditional path. Starting in strategic communications, I learned that a product’s success depends on its legibility: what problem it solves and why it matters. This foundational perspective drives my work today. 
        </p>
      ),
    },
    {
      label: 'Philosophy',
      body: (
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.7)' }}>
          I prioritize questions over immediate answers. In an era of rapid automation, the most valuable skill is defining the problem with precision. I see products as intentional responses to actual friction, where clarity is the ultimate outcome.
        </p>
      ),
    },
    {
      label: 'Current Focus',
      body: (
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.7)' }}>
          Currently, I am exploring how to absorb complexity for end-users in mission-critical environments. I am drawn to solving difficult problems with deliberate, small-scale iterations that lead to resilient long-term systems.
        </p>
      ),
    },
  ];

  return (
    <div className="about-full-container" ref={containerRef}>
      <button className="about-back-btn" onClick={() => navigate("/")}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back</span>
      </button>

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
              Product designer and former mission controller. Dedicated to refining the intersection of technical systems and human experience.
            </p>
          </div>

          {/* Simple Image */}
          <div className="about-story-item" style={{ marginBottom: '6rem' }}>
            <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: '8px', overflow: 'hidden', background: '#f5f5f5' }}>
              <img 
                src="https://picsum.photos/seed/operational/1200/750" 
                alt="Working environment"
                referrerPolicy="no-referrer"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>Google APAC Summit, 2022</p>
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

          {/* Principles */}
          <div style={{ marginBottom: '4rem' }}>
            <div className="about-story-item" style={{ marginBottom: '3rem' }}>
              <span className="about-label">Operating Principles</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem' }}>
              {[
                { n: '01', h: 'Clarity over cleverness', p: "Effective design is often invisible. The goal is to make outcomes feel intuitive, not ingenious." },
                { n: '02', h: 'Constraints drive focus', p: "Intentional limitations are tools for creativity, not barriers to it." },
                { n: '03', h: 'Human-centric systems', p: 'Systems should adapt to human needs, rather than forcing people to adjust to technical rigidity.' },
                { n: '04', h: 'Data informs intuition', p: 'I use quantitative signals to validate qualitative instincts, ensuring solutions are anchored in reality.' },
              ].map(({ n, h, p }) => (
                <div key={n} className="about-story-item">
                  <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>{n}</div>
                  <div className="about-p-body">
                    <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '0.5rem' }}>{h}</h4>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(0,0,0,0.6)' }}>{p}</p>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
}
