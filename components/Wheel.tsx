
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { WheelEntry, ThemeConfig } from '../types';

interface WheelProps {
  items: WheelEntry[];
  theme: ThemeConfig;
  spinDuration: number;
  onSpinEnd: (winner: WheelEntry) => void;
  onTick: (speedFactor: number) => void;
  isSpinning: boolean;
  setIsSpinning: (state: boolean) => void;
  isHovered: boolean; 
}

export interface WheelRef {
  spin: () => void;
}

const Wheel = forwardRef<WheelRef, WheelProps>(({ 
  items, 
  theme, 
  spinDuration, 
  onSpinEnd, 
  onTick,
  isSpinning,
  setIsSpinning,
  isHovered
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Physics & State
  const rotationRef = useRef(0);
  const lastTickRef = useRef(-1);
  const reqIdRef = useRef<number>(0);
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // We use a ref to track spinning state inside callbacks (like ResizeObserver) 
  // without forcing the useEffect to re-run and kill the animation loop.
  const isSpinningRef = useRef(isSpinning);

  useEffect(() => {
      isSpinningRef.current = isSpinning;
  }, [isSpinning]);
  
  const DPI = typeof window !== 'undefined' ? window.devicePixelRatio || 2 : 2;

  // Helpers
  const normalizeAngle = (angle: number) => angle % (2 * Math.PI);
  
  const getSecureRandomFraction = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / (0xFFFFFFFF + 1);
  };

  // --- COLOR UTILS ---
  function adjustColorBrightness(hex: string, percent: number) {
      if(!hex) return '#000000';
      hex = hex.replace(/^\s*#|\s*$/g, '');
      if(hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
      const num = parseInt(hex, 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  // --- HEAVY LIFTING: Draw Static Wheel to Buffer ---
  const updateBuffer = (size: number) => {
      if (!bufferCanvasRef.current) bufferCanvasRef.current = document.createElement('canvas');
      const buffer = bufferCanvasRef.current;
      const ctx = buffer.getContext('2d');
      if (!ctx) return;

      buffer.width = size * DPI;
      buffer.height = size * DPI;
      
      const centerX = buffer.width / 2;
      const centerY = buffer.height / 2;
      const maxRadius = (size * DPI) / 2;
      
      // OPTIMIZED PADDING: 40 DPI
      const padding = 40 * DPI; 
      
      const rimThickness = 12 * DPI; 
      const outerRadius = maxRadius - padding; 
      const innerRadius = outerRadius - rimThickness; 
      const hubRadius = maxRadius * 0.18;

      ctx.clearRect(0, 0, buffer.width, buffer.height);

      // 1. LAYER ONE: SEGMENTS
      if (items.length > 0) {
          const arcSize = (2 * Math.PI) / items.length;
          const segmentRadius = innerRadius + (1 * DPI); 
          
          // DYNAMIC STROKE WIDTH:
          // If thousands of items, lines must be microscopic or they will cover the colors.
          let separatorWidth = 1 * DPI;
          if (items.length > 200) separatorWidth = 0.5 * DPI;
          if (items.length > 1000) separatorWidth = 0.2 * DPI;

          items.forEach((item, index) => {
            const startAngle = (index * arcSize); 
            const endAngle = startAngle + arcSize;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, segmentRadius, startAngle, endAngle);
            ctx.closePath();
            
            const baseColor = theme.wheelSegments[index % theme.wheelSegments.length];
            // Subtle Radial Gradient on Segments (Only if items < 500 for performance)
            if (items.length < 500) {
                const segGradient = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, segmentRadius
                );
                segGradient.addColorStop(0, baseColor);
                segGradient.addColorStop(1, adjustColorBrightness(baseColor, -8)); 
                ctx.fillStyle = segGradient;
            } else {
                ctx.fillStyle = baseColor;
            }

            ctx.fill();
            
            // Clean segment separators
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = separatorWidth; 
            ctx.stroke();
          });
      }

      // 2. LAYER TWO: OUTER RIM
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius - (rimThickness/2), 0, 2 * Math.PI);
      ctx.lineWidth = rimThickness;
      
      const rimGrad = ctx.createLinearGradient(0, 0, buffer.width, buffer.height);
      if (theme.wheelOuterRing && theme.wheelOuterRing.length > 0) {
          theme.wheelOuterRing.forEach((color, i) => {
              rimGrad.addColorStop(i / (theme.wheelOuterRing.length - 1), color);
          });
      } else {
          rimGrad.addColorStop(0, '#FFD700');
          rimGrad.addColorStop(1, '#B8860B');
      }
      
      ctx.strokeStyle = rimGrad;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      ctx.lineWidth = 1.5 * DPI;
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.stroke();
      ctx.restore();

      // 3. LAYER THREE: TEXT
      if (items.length > 0) {
          const arcSize = (2 * Math.PI) / items.length;
          
          items.forEach((item, index) => {
            const startAngle = (index * arcSize); 
            
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + arcSize / 2);
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            
            const baseColor = theme.wheelSegments[index % theme.wheelSegments.length];
            let textColor = '#FFFFFF';

            // --- STRICT COLOR HARMONY LOGIC ---
            if (theme.id === 'rainbow') {
                // Rainbow theme always uses White text
                textColor = '#FFFFFF';
            } else {
                // For dual-tone themes, if background is White, text is Colored (textStroke).
                // If background is Colored, text is White.
                if (baseColor.toUpperCase() === '#FFFFFF') {
                    textColor = theme.textStroke;
                } else {
                    textColor = '#FFFFFF';
                }
            }

            // DYNAMIC PADDING: Reduce text padding when items are very dense
            const textPadding = items.length > 200 ? 5 * DPI : 14 * DPI;
            const textDrawRadius = innerRadius - textPadding;
            const availableWidth = textDrawRadius - hubRadius - (10 * DPI); 
            
            // --- DYNAMIC FONT CALCULATION (CRITICAL FOR 1000+ ITEMS) ---
            const midRadius = (innerRadius + hubRadius) / 2;
            const arcLenAtMid = (2 * Math.PI * midRadius) / items.length;
            
            // Occupy 85% of the arc height.
            let fontSize = arcLenAtMid * 0.85; 
            
            // REMOVE HARD MINIMUM LIMIT. 
            // Allow font to scale down to 1px (or effectively invisible line) if needed.
            const minFont = 0.5 * DPI; // Practically no limit
            const maxFont = 40 * DPI;
            
            fontSize = Math.max(minFont, Math.min(fontSize, maxFont));

            ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`;

            const metrics = ctx.measureText(item.text);
            const textWidth = metrics.width;
            
            let scaleX = 1;
            if (textWidth > availableWidth) {
                scaleX = availableWidth / textWidth;
            }

            ctx.scale(scaleX, 1);

            // OPTIMIZATION: Disable shadow for massive lists to prevent blur/artifacts
            if (items.length < 200 && fontSize > 4 * DPI) {
                ctx.shadowColor = 'rgba(0,0,0,0.15)';
                ctx.shadowBlur = 4;
            } else {
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }

            ctx.fillStyle = textColor;
            ctx.fillText(item.text, textDrawRadius / scaleX, 0);
            ctx.shadowBlur = 0; // Reset
            
            ctx.restore();
          });
      }
  };

  // --- FAST RENDER: Draw Frame ---
  const drawFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const size = Math.min(width, height);
    
    if (!bufferCanvasRef.current) {
         updateBuffer(size);
    }
    
    if (!bufferCanvasRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width !== size * DPI || canvas.height !== size * DPI) {
      canvas.width = size * DPI;
      canvas.height = size * DPI;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      updateBuffer(size);
    }
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = (size * DPI) / 2;
    
    // MATCH PADDING with Buffer: 40 DPI
    const padding = 40 * DPI;
    const outerRadius = maxRadius - padding;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 0. STATIC SHADOW (Adjusted to not bleed with smaller padding)
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20 * DPI; // Reduced blur to fit in safer zone
    ctx.shadowOffsetY = 10 * DPI; 
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius - (2 * DPI), 0, 2 * Math.PI);
    ctx.fillStyle = theme.wheelSegments[0];
    ctx.fill();
    ctx.restore();

    // 1. DRAW BUFFERED WHEEL
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationRef.current);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(bufferCanvasRef.current, 0, 0);
    ctx.restore();

    // 2. STATIC CENTER HUB
    const hubRadius = maxRadius * 0.18; 
    let mainHubColor = theme.wheelSegments[1];
    
    // For standardized themes [Color, White], index 1 is white. We want the hub to be colored.
    // Index 0 is the Deep Color.
    // For Rainbow, use Accent.
    if (theme.id === 'rainbow') {
        mainHubColor = theme.accent;
    } else {
        mainHubColor = theme.wheelSegments[0];
    }

    const hubGradient = ctx.createConicGradient(0, centerX, centerY);
    hubGradient.addColorStop(0, '#FFFFFF');
    hubGradient.addColorStop(0.25, mainHubColor);
    hubGradient.addColorStop(0.5, '#FFFFFF');
    hubGradient.addColorStop(0.75, mainHubColor);
    hubGradient.addColorStop(1, '#FFFFFF');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubRadius, 0, 2 * Math.PI);
    ctx.fillStyle = hubGradient;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10 * DPI;
    ctx.shadowOffsetY = 5 * DPI;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, hubRadius * 0.9, 0, 2 * Math.PI);
    ctx.fillStyle = mainHubColor; 
    ctx.fill();
    
    // 3. POINTER (Calculations updated for new padding)
    const ptrW = 26 * DPI; 
    const ptrH = 46 * DPI; 
    const overlap = 22 * DPI; 
    
    // With padding=40, ptrH=46, overlap=22 -> 40 + 22 - 46 = 16 DPI safe zone from top.
    const ptrY = (centerY - outerRadius) + overlap - ptrH; 
    const ptrX = centerX;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 6 * DPI;
    ctx.shadowOffsetY = 2 * DPI;

    ctx.beginPath();
    ctx.moveTo(ptrX, ptrY); 
    
    ctx.bezierCurveTo(
        ptrX + ptrW, ptrY, 
        ptrX + ptrW, ptrY + ptrH * 0.5, 
        ptrX, ptrY + ptrH 
    );
    
    ctx.bezierCurveTo(
        ptrX - ptrW, ptrY + ptrH * 0.5, 
        ptrX - ptrW, ptrY, 
        ptrX, ptrY 
    );
    ctx.closePath();

    const ptrGrad = ctx.createLinearGradient(ptrX - ptrW, ptrY, ptrX + ptrW, ptrY + ptrH);
    ptrGrad.addColorStop(0, '#FEF08A'); 
    ptrGrad.addColorStop(0.3, '#F59E0B'); 
    ptrGrad.addColorStop(0.6, '#B45309'); 
    ptrGrad.addColorStop(1, '#78350F'); 
    
    ctx.fillStyle = ptrGrad;
    ctx.fill();
    
    ctx.lineWidth = 1.5 * DPI;
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(ptrX, ptrY + ptrH * 0.25, ptrW * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fill();
    
    ctx.restore();
  };

  // --- FIXED WINNER CALCULATION ---
  const getWinner = () => {
    if (items.length === 0) return items[0];
    const arcSize = (2 * Math.PI) / items.length;
    
    // CRITICAL FIX: The pointer is physically at the TOP (270 degrees or 3PI/2 in Canvas logic).
    // The wheel rotates CLOCKWISE. 
    // We must find which segment angle currently aligns with the pointer's fixed angle.
    // Logic: (PointerAngle - WheelRotation) % 2PI
    
    const pointerAngle = (3 * Math.PI) / 2; // 270 degrees (Top)
    
    // Calculate effective angle on the wheel surface
    // Note: We access rotationRef directly to avoid normalization issues
    let effectiveAngle = (pointerAngle - rotationRef.current) % (2 * Math.PI);
    
    // Ensure positive angle (0 to 2PI)
    if (effectiveAngle < 0) effectiveAngle += 2 * Math.PI;
    
    const index = Math.floor(effectiveAngle / arcSize);
    
    // Safety modulo
    return items[index % items.length];
  };

  useImperativeHandle(ref, () => ({
    spin: () => {
      if (items.length === 0) return;
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      
      setIsSpinning(true);
      
      if (!bufferCanvasRef.current && containerRef.current) {
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;
          const size = Math.min(width, height);
          updateBuffer(size);
      }
      
      rotationRef.current = rotationRef.current % (2 * Math.PI);
      
      const extraSpins = 5 + (getSecureRandomFraction() * 5); 
      const targetDelta = (extraSpins * 2 * Math.PI);
      const segmentArc = (2 * Math.PI) / items.length;
      const randomOffset = (getSecureRandomFraction() * 0.8 + 0.1) * segmentArc;
      
      const startRot = rotationRef.current;
      const finalRot = startRot + targetDelta + randomOffset;
      
      const animateExact = (startTime: number) => {
          const now = performance.now();
          const elapsed = (now - startTime) / 1000;
          
          if (elapsed < spinDuration) {
             const t = elapsed / spinDuration;
             const ease = 1 - Math.pow(1 - t, 4); 
             
             rotationRef.current = startRot + ((finalRot - startRot) * ease);
             
             // Calc temporary speed for SFX (not exact math, just for effect)
             const speed = 4 * Math.pow(1 - t, 3);
             
             // We need to check sector crossing for ticking sound
             // Using the same "Effective Angle" logic for consistency
             const pointerAngle = (3 * Math.PI) / 2;
             let effectiveAngle = (pointerAngle - rotationRef.current) % (2 * Math.PI);
             if (effectiveAngle < 0) effectiveAngle += 2 * Math.PI;
             const idx = Math.floor(effectiveAngle / segmentArc);
             
             if (lastTickRef.current !== idx) {
                 onTick(speed);
                 lastTickRef.current = idx;
             }
             
             drawFrame(); 
             reqIdRef.current = requestAnimationFrame(() => animateExact(startTime));
          } else {
              rotationRef.current = finalRot;
              drawFrame();
              setIsSpinning(false);
              onSpinEnd(getWinner());
          }
      };
      
      reqIdRef.current = requestAnimationFrame(() => animateExact(performance.now()));
    }
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
        if(!isSpinningRef.current) {
            requestAnimationFrame(() => drawFrame());
        }
    });

    resizeObserver.observe(containerRef.current);
    requestAnimationFrame(() => drawFrame());

    return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(reqIdRef.current);
    }
  }, [items, theme, DPI]); 

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative select-none">
      <canvas ref={canvasRef} className="object-contain" />
    </div>
  );
});

export default Wheel;
