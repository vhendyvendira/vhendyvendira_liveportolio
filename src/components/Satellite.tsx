import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, FastForward } from 'lucide-react';
import { satelliteStore, SatelliteData, SatelliteStoreState } from '../lib/satelliteStore';

interface SatelliteProps {
  isHidden?: boolean;
}

const SatelliteInstance: React.FC<{ 
  sat: SatelliteData, 
  isHidden: boolean 
}> = ({ sat, isHidden }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    if (isInteracted) {
      const timer = setTimeout(() => setIsInteracted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInteracted]);

  const handleInteraction = () => {
    setIsInteracted(true);
  };

  const getSpeedLabel = () => {
    if (sat.speedMultiplier === 0.5) return '0.5x';
    if (sat.speedMultiplier === 2) return '2x';
    return '1x';
  };

  const cycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    let next;
    if (sat.speedMultiplier === 1) next = 2;
    else if (sat.speedMultiplier === 2) next = 0.5;
    else next = 1;
    satelliteStore.updateSatellite(sat.id, { speedMultiplier: next });
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    satelliteStore.updateSatellite(sat.id, { isPaused: !sat.isPaused });
  };

  const handleDragStart = () => {
    setIsInteracted(true);
    satelliteStore.updateSatellite(sat.id, { isDragging: true });
  };

  const handleDragEnd = (_: any, info: any) => {
    satelliteStore.updateSatellite(sat.id, { 
      isDragging: false, 
      baseX: sat.baseX + info.offset.x,
      baseY: sat.baseY + info.offset.y,
      x: sat.x + info.offset.x,
      y: sat.y + info.offset.y
    });
  };

  const handleDrag = (_: any, info: any) => {
    satelliteStore.updateSatellite(sat.id, {
      x: sat.x + info.delta.x,
      y: sat.y + info.delta.y,
      baseX: sat.baseX + info.delta.x,
      baseY: sat.baseY + info.delta.y
    });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onClick={handleInteraction}
      initial={false}
      animate={{
        opacity: isHidden ? 0 : (isHovered || isInteracted || sat.isDragging ? 1 : 0.25),
        scale: isInteracted || isHovered ? 1.05 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: sat.x,
        y: sat.y,
        zIndex: 9999,
        cursor: 'grab',
        pointerEvents: isHidden ? 'none' : 'auto',
        visibility: isHidden ? 'hidden' : 'visible',
      }}
      whileDrag={{ cursor: 'grabbing', scale: 1.1 }}
    >
      <div style={{ position: 'relative' }}>
        {/* Trails */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: sat.isPaused ? 0 : [0, 0.4, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'rgba(139, 92, 246, 0.4)',
                borderRadius: '50%',
                left: `${-20 - (i * 12)}px`,
                top: '0px',
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>

        {/* Satellite Visual Group */}
        <motion.div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            scale: [1, 1.03, 1],
            rotate: [-1, 1, -1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ position: 'relative' }}
        >
          {/* Main Satellite Visual */}
          <div style={{ position: 'relative' }}>
            {/* Antennas */}
            <motion.div 
              animate={{ rotate: sat.isPaused ? 0 : [0, 8, 0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ 
                position: 'absolute', 
                top: '-8px', 
                left: '50%', 
                width: '1px', 
                height: '10px', 
                background: '#6b7280',
                transformOrigin: 'bottom'
              }}
            />
            
            {/* Solar Panels */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <motion.div 
                animate={{ skewY: sat.isPaused ? 0 : [0, 10, 0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ width: '12px', height: '18px', background: 'linear-gradient(to bottom, #4b5563, #1f2937)', borderRadius: '2px', border: '0.5px solid rgba(139, 92, 246, 0.3)' }} 
              />
              <div style={{ width: '18px', height: '14px', background: '#9ca3af', borderRadius: '3px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', border: '1px solid #6b7280', position: 'relative', overflow: 'hidden' }}>
                {/* Eyes (Cute Factor) */}
                <div style={{ display: 'flex', gap: '4px', position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)' }}>
                  <motion.div 
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, times: [0, 0.8, 0.85, 0.9, 1] }}
                    style={{ width: '2px', height: '3px', background: '#1f2937', borderRadius: '1px' }}
                  />
                  <motion.div 
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, times: [0, 0.8, 0.85, 0.9, 1] }}
                    style={{ width: '2px', height: '3px', background: '#1f2937', borderRadius: '1px' }}
                  />
                </div>

                {/* Blinking Power Light */}
                <motion.div 
                  animate={{ opacity: sat.isPaused ? 0.2 : [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ 
                    position: 'absolute', 
                    top: '1px', 
                    right: '1px', 
                    width: '2px', 
                    height: '2px', 
                    background: '#8b5cf6', 
                    borderRadius: '50%',
                    boxShadow: '0 0 4px #8b5cf6'
                  }} 
                />
              </div>
              <motion.div 
                animate={{ skewY: sat.isPaused ? 0 : [0, -10, 0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ width: '12px', height: '18px', background: 'linear-gradient(to bottom, #4b5563, #1f2937)', borderRadius: '2px', border: '0.5px solid rgba(139, 92, 246, 0.3)' }} 
              />
            </div>
          </div>

          {/* Hover Controls & Label */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 5, x: '-50%' }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  marginTop: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  pointerEvents: 'auto'
                }}
              >
                {/* Control Panel */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '4px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(4px)'
                }}>
                  <button 
                    onClick={togglePause}
                    style={{ 
                      padding: '4px', 
                      borderRadius: '4px', 
                      display: 'flex', 
                      background: 'none', 
                      cursor: 'pointer',
                      border: 'none',
                      color: 'rgba(0,0,0,0.6)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                  >
                    {sat.isPaused ? <Play size={10} fill="currentColor" /> : <Pause size={10} fill="currentColor" />}
                  </button>
                  <div style={{ width: '1px', height: '10px', background: 'rgba(0,0,0,0.1)' }} />
                  <button 
                    onClick={cycleSpeed}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '2px', 
                      padding: '2px 4px', 
                      borderRadius: '4px', 
                      fontSize: '8px', 
                      fontFamily: 'var(--font-mono)',
                      background: 'none',
                      cursor: 'pointer',
                      border: 'none',
                      color: 'rgba(0,0,0,0.6)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                  >
                    <FastForward size={8} />
                    {getSpeedLabel()}
                  </button>
                </div>
                
                {/* Identification Label */}
                <span style={{
                  fontSize: '7px',
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(0,0,0,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  PAL-SAT-{sat.id.toUpperCase()}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Satellite: React.FC<SatelliteProps> = ({ isHidden = false }) => {
  const [storeState, setStoreState] = useState<SatelliteStoreState>(satelliteStore.get());

  useEffect(() => {
    return satelliteStore.subscribe((newState) => {
      setStoreState(newState);
    });
  }, []);

  return (
    <>
      {storeState.satellites.map(sat => (
        <SatelliteInstance key={sat.id} sat={sat} isHidden={isHidden} />
      ))}
    </>
  );
};

export default Satellite;
