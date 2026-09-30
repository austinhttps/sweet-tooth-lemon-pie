import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FragranceScene } from './components/3d/FragranceScene';
import { LuxuryHeader } from './components/ui/LuxuryHeader';
import { QuoteBubble } from './components/ui/QuoteBubble';
import { audioSynth } from './utils/audioSynth';

export const App: React.FC = () => {
  const [isUnwrapped, setIsUnwrapped] = useState(false); // Wrapper & Cap on bottle initially
  const [isSpraying, setIsSpraying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isRechargingRef = useRef(false);

  // Cursor tracking for subtle bottle tilt parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Unwrap handler: peels wrapper & lifts cap off the ONE bottle
  const handleUnwrap = useCallback(() => {
    setIsUnwrapped(true);
  }, []);

  // Rewrap handler: puts cap and wrapper back on the bottle when clicking the floating cap
  const handleRewrap = useCallback(() => {
    setIsUnwrapped(false);
  }, []);

  // Spritz handler: with pump pressure recharge cooldown
  const handleSpritz = useCallback(() => {
    // Prevent spraying until the pump has fully returned to top to build up hydraulic pressure
    if (isRechargingRef.current) return;

    isRechargingRef.current = true;
    setIsSpraying(true);
    audioSynth.playSpritzSound();

    // Spray burst active duration
    setTimeout(() => {
      setIsSpraying(false);
    }, 450);

    // Full pump recharge & pressure build-up cooldown before next spray is permitted
    setTimeout(() => {
      isRechargingRef.current = false;
    }, 1100);
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #fffdf8 0%, #fdf8ec 50%, #f7ecd9 100%)',
      }}
    >
      {/* 3D WebGL Fragrance Canvas */}
      <FragranceScene
        isUnwrapped={isUnwrapped}
        onUnwrap={handleUnwrap}
        onRewrap={handleRewrap}
        isSpraying={isSpraying}
        onSpritz={handleSpritz}
        mousePos={mousePos}
      />

      {/* Clean Minimalist Luxury Header (Logo & Official Store Link) */}
      <LuxuryHeader />

      {/* Sabrina Carpenter Quote Bubble */}
      <QuoteBubble />
    </div>
  );
};

export default App;
