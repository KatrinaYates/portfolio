// Vibe Mixer Presets - Curated particle experiences

export type PresetName = 'moonlight' | 'neonDrift' | 'stardust' | 'oceanCurrent' | 'fireflies' | 'confetti';
export type CursorMode = 'off' | 'repel' | 'attract';
export type ClickMode = 'off' | 'burst' | 'explode';

export interface VibePreset {
  name: string;
  description: string;
  colors: string[];
  shape: string | string[];
  links: boolean;
  glow: boolean;
  baseSpeed: number;
  baseCount: number;
  sizeRange: { min: number; max: number };
  opacityRange: { min: number; max: number };
}

// 6 curated vibe presets
export const VIBE_PRESETS: Record<PresetName, VibePreset> = {
  moonlight: {
    name: 'Moonlight',
    description: 'Soft and serene',
    colors: ['#e8e8e8', '#c4d4e0', '#a8c0d8', '#8fb0d0'],
    shape: 'circle',
    links: true,
    glow: false,
    baseSpeed: 0.8,
    baseCount: 50,
    sizeRange: { min: 2, max: 5 },
    opacityRange: { min: 0.4, max: 0.8 },
  },
  neonDrift: {
    name: 'Neon Drift',
    description: 'Electric vibes',
    colors: ['#f368e0', '#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb'],
    shape: 'circle',
    links: false,
    glow: true,
    baseSpeed: 1.5,
    baseCount: 60,
    sizeRange: { min: 3, max: 8 },
    opacityRange: { min: 0.7, max: 1 },
  },
  stardust: {
    name: 'Stardust',
    description: 'Magical sparkle',
    colors: ['#ffeaa7', '#fdcb6e', '#f8b739', '#ffffff', '#dfe6e9'],
    shape: 'star',
    links: false,
    glow: true,
    baseSpeed: 1.0,
    baseCount: 45,
    sizeRange: { min: 3, max: 8 },
    opacityRange: { min: 0.6, max: 1 },
  },
  oceanCurrent: {
    name: 'Ocean Current',
    description: 'Deep and flowing',
    colors: ['#0abde3', '#48dbfb', '#1dd1a1', '#10ac84', '#00cec9'],
    shape: 'circle',
    links: true,
    glow: false,
    baseSpeed: 1.2,
    baseCount: 55,
    sizeRange: { min: 2, max: 6 },
    opacityRange: { min: 0.5, max: 0.9 },
  },
  fireflies: {
    name: 'Fireflies',
    description: 'Warm and organic',
    colors: ['#ffeaa7', '#fdcb6e', '#f39c12', '#e17055', '#fab1a0'],
    shape: 'circle',
    links: false,
    glow: true,
    baseSpeed: 0.6,
    baseCount: 40,
    sizeRange: { min: 2, max: 5 },
    opacityRange: { min: 0.3, max: 0.9 },
  },
  confetti: {
    name: 'Confetti',
    description: 'Party mode',
    colors: ['#ee5a24', '#f9ca24', '#6ab04c', '#22a6b3', '#be2edd', '#eb4d4b'],
    shape: ['circle', 'square', 'triangle'],
    links: false,
    glow: false,
    baseSpeed: 2.0,
    baseCount: 70,
    sizeRange: { min: 4, max: 10 },
    opacityRange: { min: 0.8, max: 1 },
  },
};

// Interaction options
export const CURSOR_OPTIONS = [
  { value: 'off', label: 'Off' },
  { value: 'repel', label: 'Repel' },
  { value: 'attract', label: 'Attract' },
];

export const CLICK_OPTIONS = [
  { value: 'off', label: 'Off' },
  { value: 'burst', label: 'Burst' },
  { value: 'explode', label: 'Explode' },
];

// Preset list for UI
export const PRESET_LIST: PresetName[] = [
  'moonlight',
  'neonDrift',
  'stardust',
  'oceanCurrent',
  'fireflies',
  'confetti',
];
