import { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let raf: number;
    const stars: { x: number; y: number; s: number; o: number }[] = [];
    const starCount = 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          s: Math.random() * 1.5 + 0.5,
          o: Math.random() * 0.4 + 0.1
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 20;
      targetY = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      stars.forEach(s => {
        // Floating movement
        s.y -= 0.15;
        if (s.y < -10) s.y = canvas.height + 10;

        const px = s.x + mouseX * (s.s * 0.5);
        const py = s.y + mouseY * (s.s * 0.5);

        ctx.fillStyle = `rgba(0, 0, 0, ${s.o})`;
        ctx.beginPath();
        ctx.arc(px, py, s.s, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.12
      }}
    />
  );
}
