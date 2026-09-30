import React from 'react';
import { FLAVORS } from '../../constants/data';
import type { FlavorConfig } from '../../types';
import { Check, Sparkles } from 'lucide-react';

interface FlavorPickerProps {
  currentFlavor: FlavorConfig;
  onSelectFlavor: (flavor: FlavorConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FlavorPicker: React.FC<FlavorPickerProps> = ({
  currentFlavor,
  onSelectFlavor,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm pointer-events-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#d97706]">
              3D Dessert Atelier
            </span>
            <h3 className="text-2xl font-serif-vintage font-bold text-[#3d2314] mt-0.5">
              Choose Your Flavor
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-[#78350f] hover:bg-white active:scale-95 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Flavor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {Object.values(FLAVORS).map((flav) => {
            const isSelected = currentFlavor.id === flav.id;
            return (
              <button
                key={flav.id}
                onClick={() => {
                  onSelectFlavor(flav);
                  onClose();
                }}
                className={`p-4 rounded-2xl text-left transition-all duration-200 relative overflow-hidden border ${
                  isSelected
                    ? 'bg-white/95 border-[#d97706] shadow-lg ring-2 ring-amber-400/40 scale-[1.02]'
                    : 'glass-panel hover:bg-white/70 border-white/60 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-full border border-white shadow-sm flex items-center justify-center shrink-0"
                      style={{ backgroundColor: flav.curdColor }}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#78350f] stroke-[3]" />}
                    </span>
                    <span className="font-serif-vintage text-sm font-bold text-[#3d2314] line-clamp-1">
                      {flav.name}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#78350f]/80 leading-relaxed line-clamp-2 font-medium">
                  {flav.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between text-xs text-[#78350f]/70 border-t border-amber-200/50 pt-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
            <span>Applies instant 3D curd transmission & dynamic studio lighting</span>
          </div>
        </div>

      </div>
    </div>
  );
};
