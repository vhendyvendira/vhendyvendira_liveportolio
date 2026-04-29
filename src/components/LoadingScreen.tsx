import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOG_LINES = [
  "Initializing launch systems...",
  "Calibrating navigation for orbit...",
  "Preparing Dragon Starship for ignition...",
  "Running pre-launch diagnostics...",
  "Systems nominal. Ready for ignition."
];

export default function LoadingScreen({ onFinished, isReload = false }: { onFinished: () => void, isReload?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const speed = isReload ? 40 : 120; // Slightly faster for mission feel
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, isReload ? 100 : 1500); 
          return 100;
        }
        
        let step;
        if (isReload) {
          step = 12 + Math.random() * 15;
        } else {
          // Technical stuttering progress
          step = prev < 20 ? Math.random() * 5 : 
                 prev < 50 ? Math.random() * 3 : 
                 prev < 85 ? Math.random() * 8 : Math.random() * 12;
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
    }, 1600);
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
          height: '2px',
          background: 'rgba(26, 26, 26, 0.9)', 
          zIndex: 5000,
          pointerEvents: 'none'
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: '#ffffff',
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#1a1a1a', // Dark grey background
        zIndex: 5000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Scanlight Effect */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.02), transparent)',
          pointerEvents: 'none',
          zIndex: 1
        }}
        animate={{
          top: ['-10%', '110%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div style={{ width: '100%', maxWidth: '340px', position: 'relative', zIndex: 2 }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem'
        }}>
          {/* Mission Control Identification */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <span style={{ 
              fontSize: '10px', 
              fontFamily: 'var(--font-mono)', 
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.3em',
              fontWeight: 500,
              textTransform: 'uppercase'
            }}>
              Mission Command Center
            </span>
            <div style={{ height: '1px', width: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 auto' }} />
          </motion.div>

          {/* Centered Progress Indicator */}
          <div style={{ width: '100%' }}>
            {/* Minimal Technical Bar */}
            <div style={{ 
              width: '100%', 
              height: '2px', 
              background: 'rgba(255,255,255,0.05)',
              position: 'relative',
              borderRadius: '0px',
              overflow: 'hidden'
            }}>
              <motion.div 
                style={{ 
                  position: 'absolute',
                  inset: 0,
                  background: '#ffffff', // White accent for cinematic look
                  originX: 0
                }}
                animate={{ scaleX: progress / 100 }}
                transition={{ type: 'spring', damping: 30, stiffness: 45 }}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)'
            }}>
              <span>VELOCITY: {Math.floor(progress * 175).toLocaleString()} KM/H</span>
              <span>{Math.floor(progress).toString().padStart(3, '0')}%</span>
            </div>
          </div>

          {/* Mission Log Output */}
          <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLine}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <div style={{ 
                  width: '4px', 
                  height: '4px', 
                  borderRadius: '1px', 
                  background: '#ffffff',
                  boxShadow: '0 0 8px rgba(255,255,255,0.5)' 
                }} />
                <p style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center',
                  fontWeight: 400,
                  textTransform: 'uppercase'
                }}>
                  {LOG_LINES[currentLine]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay - Dark Theme */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 0.5px, transparent 0.5px)', 
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      {/* Frame details for cinematic feel */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>
        SYS_VER: 2.0.6-STARSHIP
      </div>
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>
        LAT: 28.5729° N | LONG: 80.6490° W
      </div>
    </motion.div>
  );
}
