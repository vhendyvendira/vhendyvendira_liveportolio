import React from 'react';
import { motion } from 'motion/react';
import { soundService } from '../services/soundService';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: '#1a1a1a', // Dark grey background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Enhanced Starfield */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
        {[...Array(60)].map((_, i) => {
          const size = Math.random() * 2 + 0.5;
          return (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 2000 - 1000, 
                y: Math.random() * 2000 - 1000,
                opacity: Math.random() * 0.7 + 0.3
              }}
              animate={{ 
                x: (Math.random() * 15 - 7.5) + 'px',
                y: (Math.random() * 15 - 7.5) + 'px',
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                repeatType: 'reverse',
                ease: 'easeInOut' 
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: size + 'px',
                height: size + 'px',
                backgroundColor: i % 10 === 0 ? '#f26522' : '#fff', // Occasional tinted star
                borderRadius: '50%',
                filter: size > 1.5 ? 'blur(0.5px)' : 'none',
                boxShadow: size > 2 ? '0 0 10px rgba(255,255,255,0.4)' : 'none'
              }}
            />
          );
        })}
      </div>

      {/* Orbital Satellite (The System Focal Point) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: '70vh',
          height: '70vh',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-4px',
            left: '50%',
            width: '6px',
            height: '6px',
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 15px rgba(255,255,255,0.8)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '50%',
        }} />
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '600px', padding: '0 2rem' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ 
            fontSize: '11px', 
            fontFamily: 'var(--font-mono)', 
            color: 'rgba(255,255,255,0.3)', 
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1rem'
          }}>
            SYSTEM_ACCESS_GRANTED
          </span>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 500, 
            color: '#fff', 
            letterSpacing: '-0.03em', 
            marginBottom: '1.5rem' 
          }}>
            Welcome — you’ve arrived
          </h1>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: 1.6, 
            color: 'rgba(255,255,255,0.5)', 
            marginBottom: '3rem',
            fontWeight: 400
          }}>
            We’re about to enter orbit — where systems, products, <br className="hidden md:block" /> and thinking take form.
          </p>

          <motion.button
            onClick={() => {
              soundService.play('click');
              onEnter();
            }}
            onMouseEnter={() => soundService.play('hover')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: '40px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            Enter Orbit
          </motion.button>
        </motion.div>
      </div>

      {/* Grid Pattern Foreground */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
}
