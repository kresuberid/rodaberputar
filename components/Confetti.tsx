
import React, { useEffect, useRef } from 'react';

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI fix
    const dpr = window.devicePixelRatio || 1;
    
    let particles: any[] = [];
    const colors = ['#FFD700', '#FF4500', '#00BFFF', '#32CD32', '#FF69B4', '#FFFFFF', '#9370DB', '#F43F5E', '#10B981'];
    let animationId: number;

    // Updated createParticle to accept optional angle for directional bursts
    const createParticle = (x: number, y: number, burst: boolean, angleBase?: number) => {
      let angle;
      let velocity;

      if (burst && angleBase !== undefined) {
          // CANNON MODE: Directional explosion
          // Spread range: +/- 30 degrees (approx 0.5 radians)
          const spread = 0.6; 
          angle = angleBase + (Math.random() * spread - (spread / 2));
          // Higher velocity for cannons to reach top of screen
          velocity = Math.random() * 35 + 15; 
      } else {
          // RAIN/FALLBACK MODE
          angle = Math.random() * Math.PI * 2;
          velocity = burst ? (Math.random() * 25 + 10) : (Math.random() * 3 + 1); 
      }

      const size = Math.random() * 7 + 4; 
      
      return {
        x: x,
        y: y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: size,
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        friction: 0.96, // Slightly higher friction for air resistance
        gravity: 0.4,   // Heavier gravity for realistic arc
        opacity: 1,
        decay: Math.random() * 0.005 + 0.002,
        type: Math.random() > 0.5 ? 'circle' : 'rect'
      };
    };

    // --- INITIALIZE DUAL CANNONS ---
    const height = window.innerHeight;
    const width = window.innerWidth;
    
    // 1. Bottom Left Cannon (Shoots Up-Right: Angle approx -60 degrees or -1.0 radians)
    // 0 rad is Right, -PI/2 is Up.
    for(let i=0; i<250; i++) {
        particles.push(createParticle(0, height, true, -Math.PI / 4)); // -45 deg
    }

    // 2. Bottom Right Cannon (Shoots Up-Left: Angle approx -120 degrees or -2.3 radians)
    // -PI is Left.
    for(let i=0; i<250; i++) {
        particles.push(createParticle(width, height, true, -3 * Math.PI / 4)); // -135 deg
    }

    const update = () => {
        if (!canvas) return;
        
        // Resize check
        if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
             canvas.width = window.innerWidth * dpr;
             canvas.height = window.innerHeight * dpr;
             ctx.scale(dpr, dpr);
             canvas.style.width = `${window.innerWidth}px`;
             canvas.style.height = `${window.innerHeight}px`;
        }

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Continuous Rain spawn (slower but steady filler from top)
        if (particles.length < 300) {
            particles.push(createParticle(Math.random() * window.innerWidth, -20, false));
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            p.speedX *= p.friction;
            p.speedY *= p.friction;
            p.speedY += p.gravity;
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
                particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            
            if (p.type === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }
            
            ctx.restore();
        }
        
        animationId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[110]"
    />
  );
};

export default Confetti;
