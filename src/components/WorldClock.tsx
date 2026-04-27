import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import HoverTooltip from './HoverTooltip';

export default function WorldClock() {
  const [times, setTimes] = useState({
    gmt: new Date(),
    wib: new Date(),
    wita: new Date()
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      const now = new Date();
      setTimes({
        gmt: now,
        wib: now,
        wita: now
      });
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date, offset: number) => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const targetDate = new Date(utc + (3600000 * offset));
    
    return targetDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: 5 }}
      animate={{ 
        opacity: isHovered ? 0.95 : 0.4, 
        scale: isHovered ? 0.78 : 0.75, 
        rotate: isHovered ? 1 : 2.5 
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        left: isMobile ? '1rem' : 'clamp(1rem, 5vw, 4rem)',
        top: isMobile ? '12rem' : '22rem',
        zIndex: 10,
        pointerEvents: 'auto',
        transformOrigin: 'top left'
      }}
    >
      <HoverTooltip text="my timezone" isMobile={isMobile}>
        <div style={{
          background: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.03)',
          borderRadius: '16px',
          padding: '14px',
          width: '170px',
          boxShadow: isHovered ? '0 15px 35px rgba(0, 0, 0, 0.05)' : '0 8px 20px rgba(0, 0, 0, 0.02)',
          position: 'relative',
          transition: 'all 0.6s ease'
        }}>
          {/* Subtle "Tape" Decoration */}
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-1deg)',
            width: '50px',
            height: '16px',
            background: 'rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.02)',
            borderRadius: '2px'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ 
                fontSize: '9px', 
                fontFamily: 'var(--font-mono)', 
                color: 'rgba(0,0,0,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '4px'
              }}>Jakarta (WIB)</div>
              <div style={{ 
                fontSize: '15px', 
                fontWeight: 600, 
                color: '#1a1a1a',
                fontFamily: 'var(--font-mono)'
              }}>{formatTime(times.wib, 7)}</div>
            </div>

            <div style={{ height: '1px', background: 'rgba(0,0,0,0.04)', width: '40px' }} />

            <div>
              <div style={{ 
                fontSize: '9px', 
                fontFamily: 'var(--font-mono)', 
                color: 'rgba(0,0,0,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '4px'
              }}>Manado (WITA)</div>
              <div style={{ 
                fontSize: '15px', 
                fontWeight: 500, 
                color: 'rgba(0,0,0,0.6)',
                fontFamily: 'var(--font-mono)'
              }}>{formatTime(times.wita, 8)}</div>
            </div>

            <div>
              <div style={{ 
                fontSize: '9px', 
                fontFamily: 'var(--font-mono)', 
                color: 'rgba(0,0,0,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '4px'
              }}>London (GMT)</div>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: 400, 
                color: 'rgba(0,0,0,0.4)',
                fontFamily: 'var(--font-mono)'
              }}>{formatTime(times.gmt, 0)}</div>
            </div>
          </div>

          <div style={{ 
            marginTop: '16px', 
            fontSize: '8px', 
            fontFamily: 'var(--font-mono)', 
            color: 'rgba(0,0,0,0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textAlign: 'center'
          }}>
            Global Sync • 2026
          </div>
        </div>
      </HoverTooltip>
    </motion.div>
  );
}
