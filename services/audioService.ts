
class AudioService {
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  
  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Main effects gain (ticks, win sound)
      this.gainNode = this.ctx.createGain();
      this.gainNode.connect(this.ctx.destination);
    }
    
    // Resume context if suspended (browser autoplay policy)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public stopBackgroundMusic() {
     // No-op: BGM has been removed from the system.
     // Kept for compatibility if called by older components, though we updated App.tsx
  }

  // --- SFX HANDLING ---

  public playTick(speedFactor: number = 0.5) {
    try {
      this.init();
      if (!this.ctx || !this.gainNode) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const baseFreq = 600;
      const freq = baseFreq + (speedFactor * 400); 

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.04);

      const volume = 0.1 + (speedFactor * 0.3);
      
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      console.error('Audio play failed', e);
    }
  }

  // UPGRADED: Festive Fanfare!
  public playWin() {
    try {
      this.init();
      if (!this.ctx || !this.gainNode) return;

      const now = this.ctx.currentTime;
      
      // Melody: C5, E5, G5, C6 (Major Arpeggio) + Final Chord
      // Timing: Bum (0) - Bum (0.1) - Bum (0.2) - BAAAAAM (0.3)
      
      const createNote = (freq: number, startTime: number, duration: number, type: OscillatorType = 'triangle', vol: number = 0.2) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          
          osc.type = type;
          osc.frequency.value = freq;
          
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          
          // Attack
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(vol, startTime + 0.05);
          // Decay/Sustain
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          
          osc.start(startTime);
          osc.stop(startTime + duration);
      };

      // 1. The Arpeggio Run (Trumpets)
      createNote(523.25, now, 0.2, 'sawtooth', 0.15); // C5
      createNote(659.25, now + 0.1, 0.2, 'sawtooth', 0.15); // E5
      createNote(783.99, now + 0.2, 0.2, 'sawtooth', 0.15); // G5

      // 2. The Final Chord (Explosion) - at 0.3s
      const impactTime = now + 0.3;
      const sustain = 1.5;

      // Root High (C6)
      createNote(1046.50, impactTime, sustain, 'square', 0.1);
      // Root Mid (C5)
      createNote(523.25, impactTime, sustain, 'sawtooth', 0.1);
      // Third (E5)
      createNote(659.25, impactTime, sustain, 'triangle', 0.1);
      // Fifth (G5)
      createNote(783.99, impactTime, sustain, 'triangle', 0.1);
      // Bass Root (C4)
      createNote(261.63, impactTime, sustain, 'sine', 0.3);

    } catch (e) {
      console.error('Win audio failed', e);
    }
  }
  
  public resumeContext() {
      if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
      }
  }
}

export const audioService = new AudioService();
