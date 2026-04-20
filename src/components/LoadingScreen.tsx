import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOG_LINES = [
  "INITIALIZING SAT OPS 01...",
  "ESTABLISHING SECURE UPLINK...",
  "CALIBRATING ORBITAL SENSORS...",
  "SYNCING VHENDY VENDIRA. DATA...",
  "READY FOR DEPLOYMENT."
];

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 600);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onFinished]);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setCurrentLine(prev => (prev < LOG_LINES.length - 1 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(lineTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#f5f4f2',
        zIndex: 5000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'baseline',
          marginBottom: '1rem'
        }}>
          <span style={{ 
            fontSize: '10px', 
            fontFamily: 'var(--font-mono)', 
            color: '#f26522',
            fontWeight: 600
          }}>
            SYSTEM BOOT
          </span>
          <span style={{ 
            fontSize: '10px', 
            fontFamily: 'var(--font-mono)', 
            color: 'rgba(0,0,0,0.4)'
          }}>
            {Math.floor(progress)}%
          </span>
        </div>

        {/* Outer Bar */}
        <div style={{ 
          width: '100%', 
          height: '2px', 
          background: 'rgba(0,0,0,0.05)',
          position: 'relative',
          marginBottom: '2rem',
          overflow: 'hidden'
        }}>
          {/* Inner Fill */}
          <motion.div 
            style={{ 
              position: 'absolute',
              inset: 0,
              background: '#1a1a1a',
              originX: 0
            }}
            animate={{ scaleX: progress / 100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
          />
        </div>

        <div style={{ height: '20px', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentLine}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(0,0,0,0.5)',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {LOG_LINES[currentLine]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
}
