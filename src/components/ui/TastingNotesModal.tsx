import React from 'react';
import { TASTING_NOTES } from '../../constants/data';
import type { FlavorConfig } from '../../types';
import { Award, Flame, Disc } from 'lucide-react';

interface TastingNotesModalProps {
  currentFlavor: FlavorConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const TastingNotesModal: React.FC<TastingNotesModalProps> = ({
  currentFlavor,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md pointer-events-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-white/90 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[#78350f] hover:bg-white active:scale-95 text-base font-bold shadow-xs"
        >
          ✕
        </button>

        {/* Vintage Header */}
        <div className="text-center mb-8 border-b border-amber-200/60 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-[#b45309] text-xs font-semibold uppercase tracking-widest mb-2">
            <Award className="w-3.5 h-3.5" />
            Official Recipe Card • {currentFlavor.subtitle}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-vintage font-bold text-[#3d2314] tracking-tight">
            Sweet Tooth Lemon Pie
          </h2>
          <p className="text-sm font-script text-2xl text-[#d97706] mt-1 font-bold">
            “Bake it high, toast it gold, serve it with a wink”
          </p>
        </div>

        {/* Tasting Notes Layers */}
        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#78350f] flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#d97706]" />
            Anatomy of the 3D Dessert
          </h4>

          {TASTING_NOTES.map((note, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/80 hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <h5 className="font-serif-vintage text-base font-bold text-[#3d2314]">
                  {note.layer}
                </h5>
                <span className="text-[11px] font-semibold text-[#d97706] px-2 py-0.5 rounded-full bg-amber-100/50">
                  {note.aroma}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#78350f]/85 leading-relaxed font-medium">
                {note.ingredients}
              </p>
            </div>
          ))}
        </div>

        {/* Track / Era Trivia Section */}
        <div className="bg-amber-100/40 rounded-2xl p-4 sm:p-5 border border-amber-200/50 text-xs sm:text-sm text-[#78350f] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#b45309]">
            <Disc className="w-4 h-4" />
            <span>Studio Production & Tasting Notes ({currentFlavor.name})</span>
          </div>
          <p className="leading-relaxed">
            Crafted with vintage analog warmth, fizzy citrus synths, and lush vocal harmonies. Pair this 3D audio visualizer with your favorite cup of tea or a fresh slice of pie while spinning Sabrina’s vinyl records.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#d97706] text-white font-semibold text-sm hover:bg-[#b45309] active:scale-95 transition-all shadow-md"
          >
            Enjoy the Slice
          </button>
        </div>

      </div>
    </div>
  );
};
