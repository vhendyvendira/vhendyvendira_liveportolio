import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOG_LINES = [
  "Welcome in, glad you're here.",
  "Preparing a glimpse of my work...",
  "Let’s begin."
];

export default function LoadingScreen({ onFinished, isReload = false }: { onFinished: () => void, isReload?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const speed = isReload ? 40 : 150; // Faster progress for reloads
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, isReload ? 100 : 1200); 
          return 100;
        }
        
        let step;
        if (isReload) {
          step = 10 + Math.random() * 15; // Fast chunky steps
        } else {
          step = prev < 30 ? Math.random() * 8 : prev < 70 ? Math.random() * 5 : Math.random() * 15;
        }
        return prev + step;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [onFinished, isReload]);

  useEffect(() => {
    if (isReload) return;
    const lineTimer = setInterval(() => {
      setCurrentLine(prev => (prev < LOG_LINES.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(lineTimer);
  }, [isReload]);

  if (isReload) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px', // Thin top sync bar
          background: 'rgba(249, 248, 246, 0.9)', 
          zIndex: 5000,
          pointerEvents: 'none'
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: '#f26522',
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(242, 101, 34, 0.3)'
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#f9f8f6', // Warmer background
        zIndex: 5000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden'
      }}
    >
      {/* Breathing soft glow */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242, 101, 34, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div style={{ width: '100%', maxWidth: '340px', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem'
        }}>
          {/* Subtle Branding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center' }}
          >
            <span style={{ 
              fontSize: '11px', 
              fontFamily: 'var(--font-mono)', 
              color: 'rgba(0,0,0,0.3)',
              letterSpacing: '0.2em',
              fontWeight: 500
            }}>
              VHENDY VENDIRA.
            </span>
          </motion.div>

          {/* Centered Progress Indicator */}
          <div style={{ width: '100%' }}>
            {/* Minimal Bar */}
            <div style={{ 
              width: '100%', 
              height: '1px', 
              background: 'rgba(0,0,0,0.06)',
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <motion.div 
                style={{ 
                  position: 'absolute',
                  inset: 0,
                  background: '#f26522', // Accent color
                  originX: 0
                }}
                animate={{ scaleX: progress / 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 40 }}
              />
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '0.75rem'
            }}>
              <span style={{ 
                fontSize: '10px', 
                fontFamily: 'var(--font-mono)', 
                color: 'rgba(0,0,0,0.4)',
                letterSpacing: '0.1em'
              }}>
                {Math.floor(progress).toString().padStart(3, '0')}
              </span>
            </div>
          </div>

          {/* Log Lines with Fade/Slide */}
          <div style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLine}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(0,0,0,0.6)',
                  textAlign: 'center',
                  fontWeight: 400
                }}
              >
                {LOG_LINES[currentLine]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay - Subtle Texture */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 0.5px, transparent 0.5px)', 
        backgroundSize: '32px 32px',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
}
