import React from 'react';
import { Sparkles } from 'lucide-react';

export const QuoteBubble: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 sm:bottom-10 sm:left-12 z-40 max-w-[340px] sm:max-w-[420px] pointer-events-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-panel backdrop-blur-md bg-white/75 border border-white/90 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg shadow-amber-950/5 transition-all hover:bg-white/90 hover:shadow-xl group"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-100/70 text-[#d97706] shrink-0 mt-0.5 group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <blockquote className="font-serif-vintage italic text-sm sm:text-base text-[#3d2314] leading-relaxed">
              “This fragrance feels fun, happy, and a little nostalgic, which is the perfect combination.”
            </blockquote>
            <cite className="not-italic text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#b45309] font-sans block mt-2.5">
              — Sabrina Carpenter
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
};
