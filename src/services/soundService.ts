import { Howl } from 'howler';

class SoundService {
  private sounds: Record<string, Howl> = {};
  private muted: boolean = false;

  constructor() {
    // Subtle mechanical UI sounds
    this.sounds = {
      hover: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'], // Light tick
        volume: 0.2,
      }),
      click: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], // Soft click
        volume: 0.4,
      }),
      transition: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'], // Subtle whoosh
        volume: 0.1,
      }),
      success: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], // Use soft click for success too for now, or find another
        volume: 0.3,
      }),
      smooth: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'], // Light tick/smooth
        volume: 0.2,
      }),
    };
  }

  play(sound: 'hover' | 'click' | 'transition' | 'success' | 'smooth') {
    if (this.muted) return;
    this.sounds[sound]?.play();
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }
}

export const soundService = new SoundService();
