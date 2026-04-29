import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const constellations = [
  { x: 0.72, y: 0.18, size: 2.5 },
  { x: 0.85, y: 0.22, size: 2 },
  { x: 0.76, y: 0.38, size: 1.5 },
  { x: 0.79, y: 0.42, size: 1.8 },
  { x: 0.82, y: 0.46, size: 1.5 },
  { x: 0.7, y: 0.58, size: 2.2 },
  { x: 0.87, y: 0.55, size: 2.8 },
  { x: 0.75, y: 0.28, size: 1.2 },
  { x: 0.88, y: 0.33, size: 1.2 },
  { x: 0.78, y: 0.62, size: 1.2 },
  { x: 0.84, y: 0.65, size: 1 },
];

const connections = [
  [0, 7], [7, 2], [2, 3], [3, 4], [4, 8], [0, 2], [1, 8], [2, 5], [4, 6], [5, 9], [9, 10], [6, 10]
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState('');
  const satelliteX = useRef(-0.25);
  const stars = useRef<{ x: number; y: number; r: number; alpha: number; twinkleSpeed: number; twinkleOffset: number; }[]>([]);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      stars.current = Array.from({ length: 230 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.2,
        alpha: Math.random() * 0.55 + 0.25,
        twinkleSpeed: Math.random() * 0.012 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    init();
    window.addEventListener('resize', init);

    let frame = 0;
    const draw = () => {
      frame += 0.016;
      ctx.clearRect(0, 0, width, height);
      
      // Clear background
      ctx.fillStyle = '#111213';
      ctx.fillRect(0, 0, width, height);

      // Vignette
      const gradient = ctx.createRadialGradient(width / 2, height / 2, height * 0.15, width / 2, height / 2, height * 0.9);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Twinkling stars
      stars.current.forEach(star => {
        const twinkle = Math.sin(frame * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.22;
        const alpha = Math.max(0.08, star.alpha + twinkle);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      // Markers / Crosshairs
      const markers = [
        { x: 0.08, y: 0.62, size: 8, color: 'rgba(255,90,90,0.65)' },
        { x: 0.22, y: 0.78, size: 5, color: 'rgba(255,255,255,0.25)' },
        { x: 0.92, y: 0.13, size: 10, color: 'rgba(255,255,255,0.38)' },
        { x: 0.5, y: 0.07, size: 5, color: 'rgba(255,255,255,0.28)' },
        { x: 0.34, y: 0.52, size: 6, color: 'rgba(255,70,70,0.45)' },
        { x: 0.62, y: 0.88, size: 7, color: 'rgba(255,255,255,0.2)' },
        { x: 0.14, y: 0.33, size: 4, color: 'rgba(255,255,255,0.22)' },
        { x: 0.88, y: 0.78, size: 6, color: "rgba(80,200,255,0.3)" }
      ];

      markers.forEach(({ x, y, size, color }) => {
        const mx = x * width;
        const my = y * height;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mx - size, my);
        ctx.lineTo(mx + size, my);
        ctx.moveTo(mx, my - size);
        ctx.lineTo(mx, my + size);
        ctx.stroke();
      });

      // Frame corners
      const corners = [{ x: 0.17, y: 0.64 }, { x: 0.66, y: 0.21 }];
      corners.forEach(({ x, y }) => {
        const cx = x * width;
        const cy = y * height;
        ctx.strokeStyle = 'rgba(255,255,255,0.28)';
        ctx.lineWidth = 1.2;
        [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
          ctx.beginPath();
          ctx.moveTo(cx + 18 * sx, cy + 4 * sy);
          ctx.lineTo(cx + 18 * sx, cy + 18 * sy);
          ctx.lineTo(cx + 4 * sx, cy + 18 * sy);
          ctx.stroke();
        });
      });

      // Constellation logic
      const mapPos = (p: { x: number, y: number }) => ({
        x: (0.65 + 0.35 * p.x) * width * 0.98,
        y: (0.08 + 0.8 * p.y) * height
      });

      connections.forEach(([i, j]) => {
        const p1 = mapPos(constellations[i]);
        const p2 = mapPos(constellations[j]);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = 'rgba(180,200,255,0.16)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      constellations.forEach((p, i) => {
        const { x, y } = mapPos(p);
        const pulse = 0.72 + Math.sin(frame * 0.55 + i) * 0.18;
        
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.size * 5);
        g.addColorStop(0, `rgba(180,210,255,${0.38 * pulse})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, p.size * 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(220,235,255,${pulse})`;
        ctx.fill();
      });

      // Planet / Moon
      const px = width * 0.82, py = height * 0.73;
      const pg = ctx.createRadialGradient(px - 10.8, py - 10.8, 1.8, px, py, 36);
      pg.addColorStop(0, "rgba(155,155,165,0.88)");
      pg.addColorStop(0.5, "rgba(85,85,97,0.7)");
      pg.addColorStop(1, "rgba(20,20,30,0.0)");
      ctx.beginPath();
      ctx.arc(px, py, 36, 0, 2 * Math.PI);
      ctx.fillStyle = pg;
      ctx.fill();

      // Satellite animation
      satelliteX.current += 0.00012;
      if (satelliteX.current > 1.3) satelliteX.current = -0.3;
      
      const sx = satelliteX.current * width;
      const sy = height * 0.16;
      const rot = 22 * Math.PI / 180;
      
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(rot);
      
      // Trail
      const trail = ctx.createLinearGradient(-130, 0, 0, 0);
      trail.addColorStop(0, "rgba(255,255,255,0)");
      trail.addColorStop(1, "rgba(255,255,255,0.1)");
      ctx.strokeStyle = trail;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-130, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(rot);
      // Body
      ctx.fillStyle = "rgba(200,205,220,0.92)";
      ctx.fillRect(-9, -4, 18, 8);
      // Solar panels
      ctx.fillStyle = "rgba(90,130,195,0.85)";
      ctx.fillRect(-24, -3, 13, 6);
      ctx.fillRect(11, -3, 13, 6);
      // Antenna
      ctx.strokeStyle = "rgba(220,225,240,0.65)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(0, -11);
      ctx.stroke();
      ctx.restore();

      // Orbital path
      ctx.beginPath();
      ctx.ellipse(width * 0.38, -height * 0.08, width * 0.68, height * 0.43, -0.18, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    // Wheel listener for "Enter" transition
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) {
        onEnter();
      }
    };
    window.addEventListener('wheel', handleWheel);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', init);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onEnter]);

  return (
    <motion.div 
      className="welcome-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <canvas ref={canvasRef} className="star-canvas" />
      
      <div className="welcome-center">
        <div className="frame-box">
          <span className="fb tl" />
          <span className="fb tr" />
          
          <div className="welcome-inner">
            <p className="welcome-label">WELCOME TO</p>
            <h1 className="welcome-title">Vhendy's Satelit</h1>
            
            <div className="title-divider">
              <span className="div-line" />
              <span className="div-dot" />
              <span className="div-line" />
            </div>

            <div className="scroll-prompt">
              <p className="scroll-text">SCROLL TO EXPLORE</p>
              <div className="scroll-arrow-wrap">
                <span className="scroll-shaft" />
                <div className="scroll-box">↓</div>
              </div>
            </div>
          </div>

          <span className="fb bl" />
          <span className="fb br" />
        </div>
      </div>

      <div className="hud-left">
        <p className="hud-clock">{time}</p>
        <p className="hud-status">
          <span className="status-dot" />
          ALL SYSTEMS OPERATIONAL
        </p>
      </div>

      <div className="hud-right">
        <p className="hud-coords">01°29'N &nbsp; 124°50'E</p>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
