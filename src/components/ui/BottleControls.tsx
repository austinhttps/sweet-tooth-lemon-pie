import React from 'react';
import { Rotate3d, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface BottleControlsProps {
  onSpritz: () => void;
  isSpraying: boolean;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const BottleControls: React.FC<BottleControlsProps> = ({
  onSpritz,
  isSpraying,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-30 pointer-events-auto flex items-center gap-2 sm:gap-3">
      {/* 360 Orbit Guidance Badge */}
      <div className="glass-panel px-3.5 sm:px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-[#78350f]/90 border border-white/80 shadow-sm hidden sm:flex">
        <Rotate3d className="w-3.5 h-3.5 text-[#d97706] animate-pulse" />
        <span>Drag to rotate 3D bottle 360°</span>
      </div>

      {/* Quick Spritz Button */}
      <button
        onClick={onSpritz}
        className={`px-4 py-2.5 rounded-full font-bold text-xs transition-all duration-200 shadow-md flex items-center gap-1.5 ${
          isSpraying
            ? 'bg-amber-500 text-white'
            : 'bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] text-white active:scale-95'
        }`}
        title="Spritz Fragrance Mist"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Spritz</span>
      </button>

      {/* Ambient Salon Audio Toggle */}
      <button
        onClick={onToggleAudio}
        className={`p-2.5 rounded-full transition-all duration-200 active:scale-90 shadow-sm ${
          isAudioPlaying
            ? 'bg-[#d97706] text-white'
            : 'glass-panel text-[#78350f] hover:bg-white/80'
        }`}
        title={isAudioPlaying ? 'Mute Salon Ambiance' : 'Play Salon Ambiance'}
      >
        {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
  );
};
