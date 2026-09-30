import React, { useState } from 'react';
import { FRAGRANCE_DETAILS, OLFACTORY_PYRAMID } from '../../constants/fragranceData';
import type { BottleSize, BottleFinish } from '../../types/fragrance';
import { Sparkles, Droplet, Star, ShoppingBag, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface FragranceDetailsProps {
  size: BottleSize;
  onSelectSize: (size: BottleSize) => void;
  finish: BottleFinish;
  onSelectFinish: (finish: BottleFinish) => void;
  onSpritz: () => void;
  isSpraying: boolean;
}

export const FragranceDetails: React.FC<FragranceDetailsProps> = ({
  size,
  onSelectSize,
  finish,
  onSelectFinish,
  onSpritz,
  isSpraying,
}) => {
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(0);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const price = FRAGRANCE_DETAILS.prices[size];

  return (
    <div className="fixed top-24 sm:top-28 left-4 sm:left-10 z-30 max-w-sm sm:max-w-md w-full pointer-events-none">
      <div className="pointer-events-auto max-h-[calc(100vh-8.5rem)] overflow-y-auto pr-1">
        <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-white/90 shadow-2xl backdrop-blur-2xl relative space-y-4">
          
          {/* Top Badge & Rating */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-amber-100 text-[#854d0e] border border-amber-200/60">
              Limited Edition • Eau De Parfum
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#854d0e]">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-bold ml-0.5">5.0 (1.4k)</span>
            </div>
          </div>

          {/* Title & Price */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-vintage font-bold text-[#27150a] tracking-tight leading-tight">
              Sweet Tooth Lemon Pie
            </h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-bold font-serif-vintage text-[#b45309]">
                ${price.toFixed(2)}
              </span>
              <span className="text-xs text-[#78350f]/70 font-medium">
                USD • {size === '75ml' ? '2.5 fl. oz.' : '1.0 fl. oz.'}
              </span>
            </div>
          </div>

          {/* Product Description */}
          <p className="text-xs text-[#5c3d2e] leading-relaxed font-medium">
            {FRAGRANCE_DETAILS.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#78350f]">
              Select Bottle Volume
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['75ml', '30ml'] as BottleSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onSelectSize(s)}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between ${
                    size === s
                      ? 'bg-white border-[#d97706] text-[#27150a] shadow-md ring-2 ring-amber-400/30'
                      : 'glass-panel text-[#78350f] border-white/60 hover:bg-white/70'
                  }`}
                >
                  <span>{s === '75ml' ? 'Full Size (75ml)' : 'Travel Size (30ml)'}</span>
                  <span className="font-mono text-[11px] text-[#b45309]">
                    ${FRAGRANCE_DETAILS.prices[s].toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottle Finish Selector */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#78350f]">
              3D Bottle Finish
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'gloss', label: 'Candied Glass', color: '#facc15' },
                { id: 'frosted', label: 'Satin Velvet', color: '#fef08a' },
                { id: 'gold', label: '24K Gold Flacon', color: '#d97706' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectFinish(item.id as BottleFinish)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-1 ${
                    finish === item.id
                      ? 'bg-white border-[#d97706] text-[#27150a] shadow-sm ring-1 ring-amber-400/40'
                      : 'glass-panel text-[#78350f]/80 border-white/60 hover:bg-white/70'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="line-clamp-1">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Olfactory Accord Accordion */}
          <div className="border-t border-amber-200/50 pt-3">
            <button
              onClick={() => setIsNotesExpanded(!isNotesExpanded)}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#78350f] py-1"
            >
              <div className="flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Scent Pyramid Accords</span>
              </div>
              {isNotesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isNotesExpanded && (
              <div className="space-y-2 mt-2 pt-1 animate-in fade-in duration-200">
                {OLFACTORY_PYRAMID.map((accord, idx) => {
                  const isActive = activeNoteIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveNoteIdx(isActive ? null : idx)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isActive
                          ? 'bg-white/90 border-[#d97706] shadow-xs'
                          : 'bg-amber-50/40 border-amber-100/60 hover:bg-white/60'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[#27150a]">
                        <span className="text-[11px] uppercase tracking-wide text-[#b45309]">
                          {accord.category}
                        </span>
                        <span className="text-[11px] font-serif-vintage text-[#78350f]">
                          {accord.headline}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#78350f] mt-1 font-medium">
                        {accord.notes.join(' • ')}
                      </div>
                      {isActive && (
                        <p className="text-[10px] text-[#5c3d2e] mt-1.5 leading-relaxed italic border-t border-amber-100 pt-1">
                          {accord.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 space-y-2">
            {/* Spritz Button */}
            <button
              onClick={onSpritz}
              className={`w-full py-3 rounded-full font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                isSpraying
                  ? 'bg-amber-500 text-white scale-[0.98]'
                  : 'bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSpraying ? 'Spraying Sweet Tooth Mist...' : 'Test Spritz Fragrance'}</span>
            </button>

            {/* Official Store Purchase Link */}
            <a
              href="https://fragrancebysabrina.com/products/lemon-pie-edp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full glass-panel hover:bg-white text-[#27150a] font-semibold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 border border-amber-200/80 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Purchase on FragranceBySabrina.com</span>
              <ExternalLink className="w-3 h-3 text-[#78350f]/60" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
