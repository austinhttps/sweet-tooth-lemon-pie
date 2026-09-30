import React from 'react';
import { OLFACTORY_PYRAMID, FRAGRANCE_DETAILS } from '../../constants/fragranceData';
import { Sparkles } from 'lucide-react';

interface ScentNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpritz: () => void;
}

export const ScentNotesModal: React.FC<ScentNotesModalProps> = ({
  isOpen,
  onClose,
  onSpritz,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-md pointer-events-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-9 max-w-2xl w-full border border-white/95 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[#78350f] hover:bg-white active:scale-95 text-base font-bold shadow-xs"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8 border-b border-amber-200/60 pb-6">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#b45309] uppercase">
            Olfactory Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-vintage font-bold text-[#27150a] mt-1">
            Sweet Tooth Lemon Pie
          </h2>
          <p className="text-xs sm:text-sm text-[#78350f]/80 mt-1 max-w-md mx-auto font-medium">
            {FRAGRANCE_DETAILS.tagline}
          </p>
        </div>

        {/* Pyramid Breakdown */}
        <div className="space-y-4 mb-8">
          {OLFACTORY_PYRAMID.map((accord, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-white/80 hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: accord.color }}
                  />
                  <h4 className="font-serif-vintage text-base font-bold text-[#27150a]">
                    {accord.category}
                  </h4>
                </div>
                <span className="text-xs font-semibold text-[#b45309] px-2.5 py-0.5 rounded-full bg-amber-100/60">
                  {accord.headline}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {accord.notes.map((note, nIdx) => (
                  <span
                    key={nIdx}
                    className="px-2.5 py-1 rounded-full bg-white/80 text-[11px] font-semibold text-[#78350f] border border-amber-100 shadow-xs"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#5c3d2e] leading-relaxed font-medium">
                {accord.description}
              </p>
            </div>
          ))}
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {FRAGRANCE_DETAILS.specs.map((spec, i) => (
            <div key={i} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/50">
              <span className="text-[10px] uppercase font-bold text-[#b45309] block">
                {spec.label}
              </span>
              <span className="text-xs font-semibold text-[#27150a] mt-0.5 block">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-amber-200/50">
          <button
            onClick={() => {
              onSpritz();
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-[#d97706] text-white font-bold text-xs hover:bg-[#b45309] active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spritz 3D Bottle</span>
          </button>

          <a
            href="https://fragrancebysabrina.com/products/lemon-pie-edp"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full glass-panel hover:bg-white text-[#27150a] font-bold text-xs active:scale-95 transition-all border border-amber-200/80"
          >
            Order on Official Store ($54.99)
          </a>
        </div>

      </div>
    </div>
  );
};
