import React, { useRef, useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';

class Particle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.life = 0;
    this.maxLife = 60 + Math.random() * 40;
  }
}

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { x, y, updateStats, setPulsing, pois, discoverPOI, battery, oxygen, sanity, setScreen } = useGameStore();
  
  const [targetPoint, setTargetPoint] = useState<{x: number, y: number} | null>(null);
  const [pulseRadius, setPulseRadius] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  const pulseMax = 600;

  const particlesRef = useRef<Particle[]>([]);

  // Engine Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Update resolution
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      }
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Update Player Movement
      setTargetPoint((tp) => {
        if (!tp) return null;
        const dx = tp.x - cx;
        const dy = tp.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 10) {
          const speed = 40 * dt; // Slow deliberate
          const newX = useGameStore.getState().x + (dx / dist) * speed;
          const newY = useGameStore.getState().y + (dy / dist) * speed;
          
          useGameStore.getState().updateStats({ 
            x: newX, 
            y: newY,
            oxygen: useGameStore.getState().oxygen - (1 * dt), // Drain oxygen
            score: useGameStore.getState().score + (dist * dt * 0.1)
          });
        }
        return tp;
      });

      // Death conditions
      const state = useGameStore.getState();
      if (state.oxygen <= 0 || state.battery <= 0 || state.sanity <= 0) {
        useGameStore.getState().setScreen('dead');
      }

      // Update Pulse
      setPulseActive((pa) => {
        if (pa) {
          setPulseRadius((r) => {
            const nextR = r + 800 * dt;
            if (nextR > pulseMax) {
               useGameStore.getState().setPulsing(false);
               useGameStore.getState().updateStats({ battery: useGameStore.getState().battery - 5 });
               return 0; // Reset
            }
            return nextR;
          });
        }
        return pa;
      });

      // Render
      ctx.fillStyle = '#09090b'; // zinc-950
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid / Floor tracking
      const gridSpacing = 100;
      const offsetX = state.x % gridSpacing;
      const offsetY = state.y % gridSpacing;

      ctx.strokeStyle = '#27272a'; // zinc-800
      ctx.lineWidth = 1;
      
      for(let i = -offsetX; i < canvas.width; i += gridSpacing) {
         ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for(let i = -offsetY; i < canvas.height; i += gridSpacing) {
         ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Draw POIs
      ctx.save();
      state.pois.forEach(poi => {
        const screenX = cx + (poi.x - state.x);
        const screenY = cy + (poi.y - state.y);
        
        const distToPlayer = Math.sqrt((poi.x - state.x)**2 + (poi.y - state.y)**2);
        
        // Discover logic
        if (distToPlayer < 50 && !poi.discovered) {
          useGameStore.getState().discoverPOI(poi.id);
          if (poi.type === 'outpost') {
            useGameStore.getState().setScreen('outpost');
          }
        }

        // Draw if within pulse or discovered
        let alpha = 0;
        if (poi.discovered) alpha = 1;
        else if (pulseActive) {
          // reveal when pulse hits it
          const pulseDist = Math.abs(distToPlayer - pulseRadius);
          if (pulseDist < 50) alpha = 1 - (pulseDist / 50);
        }

        if (alpha > 0) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = poi.type === 'outpost' ? '#10b981' : poi.type === 'relic' ? '#8b5cf6' : '#ef4444';
          ctx.beginPath();
          ctx.arc(screenX, screenY, 15, 0, Math.PI * 2);
          ctx.fill();
          
          if (poi.discovered) {
             ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
             ctx.font = '12px Space Grotesk, sans-serif';
             ctx.fillText(poi.type.toUpperCase(), screenX - 25, screenY - 25);
          }
        }
      });
      ctx.restore();

      // Draw Fog Filter
      const fogGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
      fogGradient.addColorStop(0, 'rgba(9, 9, 11, 0.0)');
      fogGradient.addColorStop(0.5, 'rgba(9, 9, 11, 0.7)');
      fogGradient.addColorStop(1, 'rgba(9, 9, 11, 0.98)');
      
      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Pulse Ring
      if (pulseActive && pulseRadius > 0) {
        ctx.beginPath();
        ctx.arc(cx, cy, pulseRadius, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0, 1 - pulseRadius/pulseMax)})`; // Cyan pulse
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // Draw Player
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI*2);
      ctx.fillStyle = '#06b6d4'; // Cyan
      ctx.fill();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#06b6d4';
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pulseRadius, pulseActive]);

  let timeout: any;
  const startPulse = () => {
    timeout = setTimeout(() => {
      useGameStore.getState().setPulsing(true);
      setPulseActive(true);
      setPulseRadius(0);
      
      // Haptic Feedback if supported
      if (navigator.vibrate) navigator.vibrate(50);
    }, 200); // Hold for 200ms
  };

  const endPulseOrMove = (e: React.PointerEvent) => {
    if (timeout) clearTimeout(timeout);
    if (!useGameStore.getState().isPulsing) {
      setTargetPoint({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full touch-none z-0 object-cover"
      onPointerDown={startPulse}
      onPointerUp={endPulseOrMove}
      onPointerMove={(e) => {
        if (e.buttons === 1 && !useGameStore.getState().isPulsing) {
          setTargetPoint({ x: e.clientX, y: e.clientY });
        }
      }}
    />
  );
};
