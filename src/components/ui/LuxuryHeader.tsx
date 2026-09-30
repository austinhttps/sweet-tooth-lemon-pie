import React from 'react';
import { ExternalLink } from 'lucide-react';

export const LuxuryHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Title / Official Logo */}
        <div className="pointer-events-auto flex flex-col">
          <span className="text-[10px] tracking-[0.28em] font-semibold text-[#854d0e] uppercase font-sans">
            Fragrance by Sabrina
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-vintage tracking-tight font-bold text-[#27150a]">
            Sweet Tooth <span className="font-script text-3xl sm:text-4xl text-[#d97706] font-normal">Lemon Pie</span>
          </h1>
        </div>

        {/* Official Store Button */}
        <div className="pointer-events-auto">
          <a
            href="https://fragrancebysabrina.com/products/lemon-pie-edp"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel px-5 py-2.5 rounded-full items-center gap-2 text-xs sm:text-sm font-semibold text-[#27150a] hover:bg-white transition-all active:scale-95 shadow-sm inline-flex border border-white/80"
          >
            <span>Official Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#d97706]" />
          </a>
        </div>

      </div>
    </header>
  );
};
