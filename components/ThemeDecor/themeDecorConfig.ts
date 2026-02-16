import { ThemeId } from '@/hooks/useTheme';

/* ============================================
   THEME DECORATION CONFIGURATION

   Each theme can have decorative elements
   (PNGs or SVGs) scattered in the background.

   Themes only need to override settings that
   differ from DEFAULT_CONFIG.
   ============================================ */

// Base settings shared by all decoration types
export interface BaseDecorConfig {
  // QUANTITY
  itemsPerSection: number;  // Items per 400px of page height
  minItems: number;         // Minimum items regardless of page height

  // SIZE (pixels)
  sizeMin: number;
  sizeMax: number;

  // OPACITY (0 = invisible, 1 = fully visible)
  opacityMin: number;
  opacityMax: number;

  // ROTATION (degrees)
  rotationMin: number;
  rotationMax: number;

  // HORIZONTAL POSITION (percentage of screen width)
  // 0 = left edge, 100 = right edge
  // Negative = off screen left, over 100 = off screen right
  leftEdgeMin: number;
  leftEdgeMax: number;
  rightEdgeMin: number;
  rightEdgeMax: number;

  // Z-INDEX (layer order)
  zIndex: number;
}

// PNG decoration config (uses next/image)
export interface PngDecorConfig extends Partial<BaseDecorConfig> {
  type: 'png';
  images: string[];  // Array of image paths in /public
}

// SVG decoration config (inline SVG with color control)
export interface SvgDecorConfig extends Partial<BaseDecorConfig> {
  type: 'svg';
  svgPaths: string[];  // Array of SVG paths in /public
  colors: string[];    // Colors to randomly apply to SVGs
}

export type ThemeDecorConfig = PngDecorConfig | SvgDecorConfig;

/* ============================================
   DEFAULT CONFIGURATION

   These values are used when a theme doesn't
   specify its own. Edit these to change the
   baseline for all themes.
   ============================================ */
export const DEFAULT_CONFIG: BaseDecorConfig = {
  // Quantity
  itemsPerSection: 1,
  minItems: 15,

  // Size
  sizeMin: 80,
  sizeMax: 180,

  // Opacity
  opacityMin: 0.08,
  opacityMax: 0.16,

  // Rotation
  rotationMin: -30,
  rotationMax: 30,

  // Position
  leftEdgeMin: 0,
  leftEdgeMax: 15,
  rightEdgeMin: 80,
  rightEdgeMax: 95,

  // Layer
  zIndex: 1,
};

/* ============================================
   THEME DECORATIONS

   Add your theme's decoration config here.
   Only specify values you want to override
   from DEFAULT_CONFIG.
   ============================================ */
export const themeDecorations: Partial<Record<ThemeId, ThemeDecorConfig>> = {
  /* ------------------------------------------
     DAISY THEME - Pressed Flowers (PNG)
     ------------------------------------------ */
  daisy: {
    type: 'png',
    images: [
      '/decor/pngs/flowers/pressed-1.png',
      '/decor/pngs/flowers/pressed-2.png',
      '/decor/pngs/flowers/pressed-3.png',
      '/decor/pngs/flowers/pressed-4.png',
      '/decor/pngs/flowers/pressed-5.png',
      '/decor/pngs/flowers/pressed-6.png',
      '/decor/pngs/flowers/pressed-7.png',
      '/decor/pngs/flowers/pressed-8.png',
      '/decor/pngs/flowers/pressed-9.png',
      '/decor/pngs/flowers/pressed-10.png',
      '/decor/pngs/flowers/pressed-12.png',
      '/decor/pngs/flowers/pressed-13.png',
      '/decor/pngs/flowers/pressed-14.png',
    ],
    // Override defaults for this theme:
    minItems: 75,
    sizeMin: 50,
    sizeMax: 500,
    rotationMin: -180,
    rotationMax: 180,
    leftEdgeMin: -5,
    leftEdgeMax: 5,
    rightEdgeMin: 70,
    rightEdgeMax: 82,
  },

  /* ------------------------------------------
     RAINBOW THEME - Kid Drawings (PNG)
     ------------------------------------------ */
  rainbow: {
    type: 'png',
    images: [
      '/decor/pngs/drawings/drawing-cat.png',
      '/decor/pngs/drawings/drawing-dino.png',
      '/decor/pngs/drawings/drawing-dragon.png',
      '/decor/pngs/drawings/drawing-sun.png',
    ],
    // Override defaults for this theme:
    minItems: 12,
    sizeMin: 100,
    sizeMax: 250,
    opacityMin: 0.7,
    opacityMax: 0.7,
    rotationMin: -15,
    rotationMax: 15,
  },

  /* ------------------------------------------
     EMO PHASE THEME - Icons (SVG with colors)
     ------------------------------------------ */
  emo: {
    type: 'svg',
    svgPaths: [
      '/decor/svgs/emo/heart.svg',
      '/decor/svgs/emo/heart3.svg',
      '/decor/svgs/emo/heart4.svg',
      '/decor/svgs/emo/heart5.svg',
      '/decor/svgs/emo/heart6.svg',
      '/decor/svgs/emo/star.svg',
      '/decor/svgs/emo/star2.svg',
      '/decor/svgs/emo/star3.svg',
      '/decor/svgs/emo/star4.svg',
      '/decor/svgs/emo/star5.svg',
      '/decor/svgs/emo/x.svg',
      '/decor/svgs/emo/lightening.svg',
      '/decor/svgs/emo/vampire.svg',
      '/decor/svgs/emo/alien.svg',
      '/decor/svgs/emo/face.svg',
      '/decor/svgs/emo/face2.svg',
      '/decor/svgs/emo/face3.svg',
      '/decor/svgs/emo/ice-cream.svg',
      '/decor/svgs/emo/crown.svg',
    ],
    colors: ['#7CFF00', '#FF2F92', '#00E5FF', '#ad2fff'],
    minItems: 200,
    sizeMin: 40,
    sizeMax: 120,
    opacityMin: 0.25,
    opacityMax: 0.35,
  },

  /* ------------------------------------------
     ADD MORE THEMES HERE
     ------------------------------------------ */
};

// Helper to get merged config with defaults
export function getDecorConfig(themeId: ThemeId): (BaseDecorConfig & ThemeDecorConfig) | null {
  const themeConfig = themeDecorations[themeId];
  if (!themeConfig) return null;

  return {
    ...DEFAULT_CONFIG,
    ...themeConfig,
  };
}
