import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles, ChevronRight, ChevronLeft, Copy, Check } from 'lucide-react';
import type { LyricSnippet, FlavorConfig } from '../../types';

interface LyricCalloutProps {
  lyrics: LyricSnippet[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  currentFlavor: FlavorConfig;
}

export const LyricCallout: React.FC<LyricCalloutProps> = ({
  lyrics,
  currentIndex,
  onNext,
  onPrev,
  currentFlavor,
}) => {
  const [copied, setCopied] = useState(false);
  const currentLyric = lyrics[currentIndex];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentLyric.verse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-24 sm:top-28 left-4 sm:left-8 z-30 max-w-sm sm:max-w-md pointer-events-none">
      <div className="pointer-events-auto">
        <div
          onClick={onNext}
          className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/80 shadow-2xl backdrop-blur-xl relative overflow-hidden group cursor-pointer hover:border-amber-300/80 transition-all duration-300"
        >
          {/* Ambient Corner Flare */}
          <div
            className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full blur-2xl opacity-25 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: currentFlavor.curdColor }}
          />

          {/* Top Tag & Interactive Cycle Controls */}
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#78350f]">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-full bg-amber-100/80 text-[#d97706]">
                <Quote className="w-3.5 h-3.5" />
              </span>
              <span className="uppercase tracking-wider text-[11px] font-bold">
                Lyric Concept • {currentLyric.time}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="p-1 rounded-full hover:bg-white/60 text-[#78350f] active:scale-90"
                title="Previous Lyric"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-[#78350f]/70 px-1">
                {currentIndex + 1}/{lyrics.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="p-1 rounded-full hover:bg-white/60 text-[#78350f] active:scale-90"
                title="Next Lyric"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dynamic Animated Lyric Text with Framer Motion */}
          <div className="min-h-[90px] flex items-center mb-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLyric.id}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full"
              >
                <p className="font-serif-vintage text-lg sm:text-xl md:text-2xl text-[#3d2314] leading-snug tracking-tight font-medium">
                  {currentLyric.verse}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Meta & Interactive Badges */}
          <div className="flex items-center justify-between pt-2 border-t border-amber-200/40 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-[#854d0e] font-medium text-[11px] border border-amber-200/50 flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#d97706]" />
                {currentLyric.vibe}
              </span>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] font-medium text-[#78350f]/80 hover:text-[#d97706] transition-colors p-1"
              title="Copy Lyric Snippet"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Subtle click hint */}
          <div className="mt-2 text-[10px] text-center text-[#78350f]/50 font-medium group-hover:text-[#d97706]/80 transition-colors">
            Tap card or click to cycle lyrics ✦
          </div>
        </div>
      </div>
    </div>
  );
};
