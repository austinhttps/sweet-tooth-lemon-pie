import React from 'react';
import { Sparkles, Utensils, Maximize2, Volume2, VolumeX } from 'lucide-react';
import type { FlavorConfig } from '../../types';
import confetti from 'canvas-confetti';

interface NavbarProps {
  currentFlavor: FlavorConfig;
  isPlaying: boolean;
  onToggleAudio: () => void;
  onOpenRecipe: () => void;
  onOpenFlavors: () => void;
  onResetCamera?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentFlavor,
  isPlaying,
  onToggleAudio,
  onOpenRecipe,
  onOpenFlavors,
}) => {
  const triggerSprinkles = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.2 },
      colors: [currentFlavor.curdColor, '#fed7aa', '#fbcfe8', '#bae6fd', '#ffffff'],
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Branding & Retro Album Stamp */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-serif-vintage tracking-tight font-semibold text-[#3d2314] drop-shadow-sm">
                Sweet Tooth
              </span>
              <span className="font-script text-2xl sm:text-3xl text-[#d97706] font-bold -rotate-6 transform translate-y-1">
                Lemon Pie
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] sm:text-xs tracking-widest font-semibold uppercase px-2 py-0.5 rounded-full bg-[#fef08a]/80 text-[#854d0e] border border-[#fde047]/60 shadow-xs">
                Short n’ Sweet Era
              </span>
              <span className="hidden sm:inline-block text-[11px] text-[#78350f]/70 font-medium">
                Track 07 • 3D Audio Experience
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Flavor Selector Button */}
          <button
            onClick={onOpenFlavors}
            className="glass-panel px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#451a03] hover:bg-white/80 transition-all duration-200 active:scale-95 shadow-sm"
            title="Change Dessert Flavor"
          >
            <span
              className="w-3 h-3 rounded-full border border-white shadow-xs"
              style={{ backgroundColor: currentFlavor.curdColor }}
            />
            <span className="hidden md:inline">{currentFlavor.name.split(' ')[0]}</span>
            <span className="md:hidden">Flavors</span>
          </button>

          {/* Tasting Notes / Recipe Drawer */}
          <button
            onClick={onOpenRecipe}
            className="glass-panel px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#451a03] hover:bg-white/80 transition-all duration-200 active:scale-95 shadow-sm"
            title="View Tasting Notes & Recipe"
          >
            <Utensils className="w-3.5 h-3.5 text-[#d97706]" />
            <span className="hidden sm:inline">Tasting Notes</span>
          </button>

          {/* Sprinkle Cannon Button */}
          <button
            onClick={triggerSprinkles}
            className="glass-panel-accent px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#78350f] hover:scale-105 transition-all duration-200 active:scale-95 shadow-sm"
            title="Launch Sugar Sparkles"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d97706] animate-spin" style={{ animationDuration: '8s' }} />
            <span className="hidden sm:inline">Sugar Sparkles</span>
          </button>

          {/* Audio Sound Quick Toggle */}
          <button
            onClick={onToggleAudio}
            className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 active:scale-90 shadow-sm ${
              isPlaying
                ? 'bg-[#d97706] text-white hover:bg-[#b45309]'
                : 'glass-panel text-[#78350f] hover:bg-white/80'
            }`}
            title={isPlaying ? 'Mute Audio' : 'Play Theme Melody'}
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex glass-panel p-2.5 rounded-full text-[#78350f] hover:bg-white/80 transition-all duration-200 active:scale-90 shadow-sm"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
