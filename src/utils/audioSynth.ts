// Web Audio Synthesizer & Sound Effects for Sabrina Fragrance Experience

class AudioSynthService {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private volume = 0.5;
  private currentStep = 0;

  // Dreamy, elegant salon chord progression (Fmaj7 - Dm9 - Gm7 - C9)
  private chords = [
    [174.61, 220.00, 261.63, 329.63, 392.00],
    [146.83, 220.00, 261.63, 293.66, 349.23],
    [196.00, 233.08, 293.66, 349.23, 392.00],
    [130.81, 164.81, 196.00, 261.63, 329.63],
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic aerosol fragrance spritz sound effect
  public playSpritzSound() {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // White noise with envelope for aerosol hiss
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter for realistic fragrance atomizer spray hiss
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(1.8, now);

      const spritzGain = this.ctx.createGain();
      spritzGain.gain.setValueAtTime(0.001, now);
      spritzGain.gain.linearRampToValueAtTime(0.35, now + 0.03);
      spritzGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      noise.connect(filter);
      filter.connect(spritzGain);
      spritzGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.35);
    } catch {
      // Audio safety guard
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  public togglePlay(onPlayStateChange?: (playing: boolean) => void): boolean {
    this.init();
    if (this.isPlaying) {
      this.stop();
      if (onPlayStateChange) onPlayStateChange(false);
      return false;
    } else {
      this.start();
      if (onPlayStateChange) onPlayStateChange(true);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx) return;
    this.isPlaying = true;
    this.currentStep = 0;
    this.scheduleBeat();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private scheduleBeat = () => {
    if (!this.isPlaying || !this.ctx) return;

    const chordIndex = Math.floor(this.currentStep / 4) % this.chords.length;
    const isChordRoot = this.currentStep % 4 === 0;

    if (isChordRoot) {
      const chord = this.chords[chordIndex];
      const now = this.ctx.currentTime;
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04 / (idx + 1), now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.9);
      });
    }

    this.currentStep++;
    this.timerId = window.setTimeout(this.scheduleBeat, 320);
  };
}

export const audioSynth = new AudioSynthService();
