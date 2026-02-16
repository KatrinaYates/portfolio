/**
 * Theme Definitions
 *
 * This file contains all theme configurations for the portfolio.
 * Each theme defines colors, typography, and visual style modifiers.
 *
 * To add a new theme:
 * 1. Add the theme ID to the ThemeId union type
 * 2. Create a new Theme object in the themes array
 * 3. Configure the decoration in themeDecorConfig.ts (optional)
 */

export type ThemeId =
  | 'newspaper'
  | 'warm'
  | 'forest'
  | 'cyber'
  | 'midnight'
  | 'rainbow'
  | 'southern'
  | 'gremlin'
  | 'daisy'
  | 'emo';

export type CardStyle = 'flat' | 'glow' | 'neon' | 'comic';
export type TextStroke = 'none' | 'subtle' | 'bold';
export type ThemeCategory = 'professional' | 'creative';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  emoji: string;
  category: ThemeCategory;
  // Colors
  accentStart: string;
  accentEnd: string;
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textOnAccent: string; // Text color for use on accent background (ensures WCAG contrast)
  borderSubtle: string;
  // Typography
  fontDisplay: string;
  fontBody: string;
  // Style modifiers
  isDark: boolean;
  borderRadius: string;
  cardStyle: CardStyle;
  // Optional style effects
  textStroke?: TextStroke; // Adds outlined text effect (default: 'none')
  shadowColor?: string; // Color for comic-style shadows (default: '#000000')
}

// ============================================
// PROFESSIONAL THEMES
// ============================================

const newspaper: Theme = {
  id: 'newspaper',
  name: 'The Gazette',
  description: 'Typewriter, ink, editorial',
  emoji: '📰',
  category: 'professional',
  accentStart: '#44403C',
  accentEnd: '#78716C',
  bgPrimary: '#FAF7F2',
  bgSecondary: '#F4EFE6',
  bgTertiary: '#E8E1D4',
  bgCard: '#FFFCF7',
  textPrimary: '#1C1917',
  textSecondary: '#44403C',
  textMuted: '#78716C',
  textOnAccent: '#FFFFFF',
  borderSubtle: 'rgba(68, 64, 60, 0.25)',
  fontDisplay: 'var(--font-playfair), serif',
  fontBody: 'var(--font-mono), monospace',
  isDark: false,
  borderRadius: '0.25rem',
  cardStyle: 'flat',
};

const warm: Theme = {
  id: 'warm',
  name: 'Warm',
  description: 'Cozy vintage warmth',
  emoji: '☀️',
  category: 'professional',
  accentStart: '#92400E',
  accentEnd: '#B45309',
  bgPrimary: '#FEF3E2',
  bgSecondary: '#FDE9D0',
  bgTertiary: '#FCDCB6',
  bgCard: '#FFFBF5',
  textPrimary: '#451A03',
  textSecondary: '#78350F',
  textMuted: '#8A5306',
  textOnAccent: '#FFFFFF',
  borderSubtle: 'rgba(124, 62, 23, 0.18)',
  fontDisplay: 'var(--font-playpen-sans), sans-serif',
  fontBody: 'var(--font-playpen-sans), sans-serif',
  isDark: false,
  borderRadius: '0.5rem',
  cardStyle: 'flat',
};

const forest: Theme = {
  id: 'forest',
  name: 'Forest',
  description: 'Mossy, earthy, calm depth',
  emoji: '🌿',
  category: 'professional',
  accentStart: '#34D399',
  accentEnd: '#059669',
  bgPrimary: '#022C22',
  bgSecondary: '#064E3B',
  bgTertiary: '#0B3F32',
  bgCard: 'rgba(11, 63, 50, 0.62)',
  textPrimary: '#ECFDF5',
  textSecondary: '#B7F7D1',
  textMuted: '#7EE7B5',
  textOnAccent: '#022C22',
  borderSubtle: 'rgba(183, 247, 209, 0.14)',
  fontDisplay: 'var(--font-fraunces), serif',
  fontBody: 'var(--font-nunito), sans-serif',
  isDark: true,
  borderRadius: '1.6rem',
  cardStyle: 'flat',
};

const cyber: Theme = {
  id: 'cyber',
  name: 'Cyber Neon',
  description: 'Hyperfuture, glow edges, synth energy',
  emoji: '🧬',
  category: 'professional',
  accentStart: '#FF4DDE',
  accentEnd: '#22D3EE',
  bgPrimary: '#0F0720',
  bgSecondary: '#1A0B2E',
  bgTertiary: '#261040',
  bgCard: 'rgba(26, 6, 64, 0.70)',
  textPrimary: '#F5F3FF',
  textSecondary: '#D8CCFF',
  textMuted: '#A78BFA',
  textOnAccent: '#0F0720',
  borderSubtle: 'rgba(255, 77, 222, 0.22)',
  fontDisplay: 'var(--font-space-grotesk), sans-serif',
  fontBody: 'var(--font-space-grotesk), sans-serif',
  isDark: true,
  borderRadius: '0',
  cardStyle: 'neon',
};

const midnight: Theme = {
  id: 'midnight',
  name: 'Midnight Luxe',
  description: 'Black-tie, gold foil vibes',
  emoji: '🥂',
  category: 'professional',
  accentStart: '#D6B06B',
  accentEnd: '#F2E1C4',
  bgPrimary: '#0a0811', // Softened from #07060C (~5 RGB steps to secondary)
  bgSecondary: '#0F0D16',
  bgTertiary: '#171326',
  bgCard: 'rgba(23, 19, 38, 0.78)',
  textPrimary: '#F7F4FB',
  textSecondary: '#C8C3D6',
  textMuted: '#938DA8',
  textOnAccent: '#0a0811', // Dark for contrast on gold accent
  borderSubtle: 'rgba(214, 176, 107, 0.18)',
  fontDisplay: 'var(--font-cinzel), serif',
  fontBody: 'var(--font-poppins), sans-serif',
  isDark: true,
  borderRadius: '0.95rem',
  cardStyle: 'glow',
};

// ============================================
// FUN / CREATIVE THEMES
// ============================================

const rainbow: Theme = {
  id: 'rainbow',
  name: 'Rainbow',
  description: 'Vibrant crayons & rainbow colors',
  emoji: '🖍️',
  category: 'creative',
  accentStart: '#CC0000', // Darkened from #FF0000 for WCAG AA (5.0:1)
  accentEnd: '#8B00FF',
  bgPrimary: '#f7f7f7',
  bgSecondary: '#fafafa', // Softened from #ffffff
  bgTertiary: '#d6ffd6',
  bgCard: '#FAFAFA', // Softened from #FFFFFF
  textPrimary: '#1A1A2E',
  textSecondary: '#374151',
  textMuted: '#6B7280',
  textOnAccent: '#FFFFFF',
  borderSubtle: 'rgba(204, 0, 0, 0.18)', // Updated to match new accent
  fontDisplay: 'var(--font-cabin-sketch), sans-serif',
  fontBody: 'var(--font-inter), sans-serif',
  isDark: false,
  borderRadius: '1.5rem',
  cardStyle: 'flat',
};

// ============================================
// LIFESTYLE / PERSONALITY THEMES
// ============================================

const southern: Theme = {
  id: 'southern',
  name: 'Southern Roots',
  description: 'Warm, grounded, heritage feel',
  emoji: '🌾',
  category: 'creative',
  accentStart: '#5A6E82', // Darkened from #879BAF for WCAG AA (4.5:1)
  accentEnd: '#5A6E82',
  bgPrimary: '#F4E3DF',
  bgSecondary: '#F9F3F1',
  bgTertiary: '#5A6E82', // Updated to match new accent
  bgCard: 'rgba(255,255,255,0.96)',
  textPrimary: '#352926',
  textSecondary: '#6A5854',
  textMuted: '#6A5A56', // Darkened from #9A8A86 for WCAG AA (4.5:1)
  textOnAccent: '#FFFFFF',
  borderSubtle: 'rgba(90,110,130,0.3)', // Updated to match new accent
  fontDisplay: 'var(--font-shadows-into-light-two), sans-serif',
  fontBody: 'var(--font-nunito), sans-serif',
  isDark: false,
  borderRadius: '0.75rem',
  cardStyle: 'glow',
};

const gremlin: Theme = {
  id: 'gremlin',
  name: 'Code Gremlin',
  description: '2000s hacker terminal energy',
  emoji: '👾',
  category: 'creative',
  accentStart: '#00FF66',
  accentEnd: '#00E5FF',
  bgPrimary: '#0d1117', // Softened from #050608 (GitHub dark style)
  bgSecondary: '#161b22', // Softened from #0C0F14
  bgTertiary: '#141922',
  bgCard: 'rgba(22, 27, 34, 0.90)', // Adjusted to match new bg
  textPrimary: '#00FF66',
  textSecondary: '#00E5FF',
  textMuted: '#A78BFA',
  textOnAccent: '#0d1117', // Dark for contrast on bright green accent
  borderSubtle: 'rgba(0, 255, 102, 0.25)',
  fontDisplay: 'var(--font-vt323), monospace',
  fontBody: 'var(--font-mono), monospace',
  isDark: true,
  borderRadius: '0.25rem',
  cardStyle: 'comic',
};

const daisy: Theme = {
  id: 'daisy',
  name: 'Daisy Dusk',
  description: 'Moody florals, golden warmth, deep botanical tones',
  emoji: '🌼',
  category: 'creative',
  accentStart: '#E6B84A',
  accentEnd: '#C98A1A',
  bgPrimary: '#1F2D2B',
  bgSecondary: '#243837',
  bgTertiary: '#2E4A47',
  bgCard: 'rgba(36, 56, 55, 0.75)',
  textPrimary: '#F3EEDD',
  textSecondary: '#C9D1C8',
  textMuted: '#9FB2AE',
  textOnAccent: '#1F2D2B', // Dark for contrast on gold accent
  borderSubtle: 'rgba(201, 209, 200, 0.22)',
  fontDisplay: 'var(--font-fraunces), serif',
  fontBody: 'var(--font-nunito), sans-serif',
  isDark: true,
  borderRadius: '1.6rem',
  cardStyle: 'glow',
};

const emo: Theme = {
  id: 'emo',
  name: 'Emo Phase',
  description: 'High contrast neon chaos',
  emoji: '🖤',
  category: 'creative',
  accentStart: '#7CFF00',
  accentEnd: '#5bb512',
  bgPrimary: '#121212', // Off-black for reduced eye strain
  bgSecondary: '#121212',
  bgTertiary: '#121212',
  bgCard: 'rgba(18, 18, 18, 0.90)', // Updated to match new bg
  textPrimary: '#17a3b6',
  textSecondary: '#FF2F92',
  textMuted: '#b84fff', // Lightened from #ad2fff for WCAG AA on #121212 (5.0:1)
  textOnAccent: '#121212', // Dark for contrast on lime accent
  borderSubtle: 'rgba(255, 47, 146, 0.35)',
  fontDisplay: 'var(--font-lacquer), system-ui, sans-serif',
  fontBody: 'var(--font-lacquer), sans-serif',
  isDark: true,
  borderRadius: '0',
  cardStyle: 'neon',
};

// ============================================
// EXPORTED THEMES ARRAY
// ============================================

export const themes: Theme[] = [
  newspaper,
  warm,
  forest,
  cyber,
  midnight,
  rainbow,
  southern,
  gremlin,
  daisy,
  emo,
];

/**
 * Get themes organized by category and light/dark mode
 */
export function getThemesByCategory() {
  return {
    professional: {
      light: themes.filter(t => t.category === 'professional' && !t.isDark),
      dark: themes.filter(t => t.category === 'professional' && t.isDark),
    },
    creative: {
      light: themes.filter(t => t.category === 'creative' && !t.isDark),
      dark: themes.filter(t => t.category === 'creative' && t.isDark),
    },
  };
}

/**
 * Default theme ID used when no saved preference exists
 */
export const DEFAULT_THEME_ID: ThemeId = 'warm';
