import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, Music, Heart } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import type { FlavorConfig } from '../../types';

interface AudioPlayerCardProps {
  currentFlavor: FlavorConfig;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextLyric: () => void;
}

export const AudioPlayerCard: React.FC<AudioPlayerCardProps> = ({
  currentFlavor,
  isPlaying,
  onTogglePlay,
  onNextLyric,
}) => {
  const [progress, setProgress] = useState(24);
  const [volume, setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(true);
  const [bars, setBars] = useState<number[]>([30, 60, 45, 80, 50, 90, 70, 40, 65, 85, 55, 75]);
  const animationFrameRef = useRef<number | null>(null);

  // Animate audio visualizer bars using real frequency analyser data or rhythmic pulses
  useEffect(() => {
    const updateVisualizer = () => {
      if (isPlaying) {
        const data = audioSynth.getAnalyserData();
        const newBars: number[] = [];
        const count = 12;
        for (let i = 0; i < count; i++) {
          const val = data[i * 2] || 0;
          // Scale to percentage (minimum 15% height for active visual appeal)
          const pct = Math.max(15, Math.min(100, (val / 255) * 100 * 1.3));
          newBars.push(pct);
        }
        setBars(newBars);
      } else {
        // Idle gentle waveform
        setBars([20, 35, 25, 40, 30, 45, 35, 25, 30, 40, 25, 30]);
      }
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  // Track progress ticker
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.3));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioSynth.setVolume(val);
  };

  const calculateCurrentTime = () => {
    const totalSecs = 184; // 3:04 total duration
    const currentSecs = Math.floor((progress / 100) * totalSecs);
    const mins = Math.floor(currentSecs / 60);
    const secs = currentSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-30 w-[calc(100vw-2rem)] sm:w-88 pointer-events-auto">
      <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/80 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        
        {/* Subtle Ambient Background Color Flare */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: currentFlavor.curdColor }}
        />

        {/* Top Header: Vintage Album Tag */}
        <div className="flex items-center justify-between mb-3 text-[11px] font-semibold text-[#78350f]/80 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-[#d97706]" />
            <span>Now Playing</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-[#854d0e] font-mono">Hi-Fi 3D Audio</span>
          </div>
        </div>

        {/* Media Info & Vinyl Record Section */}
        <div className="flex items-center gap-3.5 mb-3.5">
          {/* Rotating Vinyl Record Artwork */}
          <div className="relative w-14 h-14 shrink-0">
            {/* Spinning Vinyl Disc */}
            <div
              className={`w-14 h-14 rounded-full bg-[#1c1917] p-1 shadow-md flex items-center justify-center transition-transform ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              {/* Vinyl Grooves & Center Label */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-white/40 shadow-inner"
                style={{ backgroundColor: currentFlavor.curdColor }}
              >
                <div className="w-2 h-2 rounded-full bg-[#1c1917]" />
              </div>
            </div>
            {/* Floating Sound Icon Indicator */}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#d97706]" />
              </span>
            )}
          </div>

          {/* Song & Artist Details */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-[#3d2314] truncate font-serif-vintage tracking-tight">
              Sweet Tooth Lemon Pie
            </h4>
            <p className="text-xs text-[#78350f]/80 truncate font-medium">
              Sabrina Carpenter • <span className="italic">Short n’ Sweet</span>
            </p>
          </div>

          {/* Heart Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-1.5 rounded-full hover:bg-white/60 transition-colors text-[#d97706] active:scale-90"
            title="Like Track"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#e11d48] text-[#e11d48]' : 'text-[#78350f]'}`} />
          </button>
        </div>

        {/* Animated Visualizer Spectrum Bars */}
        <div className="flex items-end justify-between h-8 px-1 mb-3 bg-amber-50/50 rounded-xl border border-amber-100/60 p-1.5">
          {bars.map((height, idx) => (
            <div
              key={idx}
              className="w-1 rounded-full transition-all duration-75"
              style={{
                height: `${height}%`,
                backgroundColor: idx % 2 === 0 ? currentFlavor.curdColor : '#d97706',
                opacity: isPlaying ? 0.9 : 0.4,
              }}
            />
          ))}
        </div>

        {/* Interactive Progress Bar & Timestamps */}
        <div className="mb-3">
          <div
            className="w-full bg-amber-200/50 rounded-full h-1.5 cursor-pointer relative overflow-hidden group/bar"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPct = (clickX / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, newPct)));
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-150 relative"
              style={{
                width: `${progress}%`,
                backgroundColor: currentFlavor.curdColor === '#ffea47' ? '#d97706' : currentFlavor.curdColor,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-medium text-[#78350f]/70 mt-1 font-mono">
            <span>{calculateCurrentTime()}</span>
            <span>3:04</span>
          </div>
        </div>

        {/* Media Controls: Play/Pause, Next Lyric, Volume */}
        <div className="flex items-center justify-between pt-1">
          {/* Volume Slider */}
          <div className="flex items-center gap-1.5 w-24">
            <Volume2 className="w-3.5 h-3.5 text-[#78350f]/80" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-amber-200/60 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
            />
          </div>

          {/* Primary Play/Pause and Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d97706] to-[#f59e0b] text-white flex items-center justify-center shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white text-white" />
              ) : (
                <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
              )}
            </button>

            <button
              onClick={onNextLyric}
              className="p-2 rounded-full glass-panel hover:bg-white/80 text-[#78350f] active:scale-95 transition-all"
              title="Next Lyric Verse"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
