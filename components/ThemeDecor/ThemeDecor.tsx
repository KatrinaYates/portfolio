'use client';

import { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { useTheme, ThemeId } from '@/hooks/useTheme';
import { useViewMode } from '@/hooks/useViewMode';
import { getDecorConfig, PngDecorConfig, SvgDecorConfig } from './themeDecorConfig';
import PngDecorItem from './PngDecorItem';
import SvgDecorItem from './SvgDecorItem';

interface DecorItemData {
  id: number;
  asset: string;      // Image path or SVG path
  color?: string;     // Only for SVGs
  top: number;
  left: number;
  size: number;
  rotation: number;
  opacity: number;
}

// Height threshold for "above the fold" items (render immediately)
const ABOVE_FOLD_HEIGHT = 1200;
// Batch size for deferred items
const BATCH_SIZE = 20;
// Delay between batches (ms)
const BATCH_DELAY = 50;

function generateDecorItems(
  config: ReturnType<typeof getDecorConfig>,
  pageHeight: number
): DecorItemData[] {
  if (!config) return [];

  const items: DecorItemData[] = [];

  // Calculate count based on config
  const sectionHeight = 400 / config.itemsPerSection;
  const count = Math.max(config.minItems, Math.floor(pageHeight / sectionHeight));

  // Get assets array based on type
  const assets = config.type === 'png'
    ? (config as PngDecorConfig).images
    : (config as SvgDecorConfig).svgPaths;

  // Get colors for SVG type
  const colors = config.type === 'svg'
    ? (config as SvgDecorConfig).colors
    : [];

  // Calculate section height to distribute items evenly
  const itemSectionHeight = pageHeight / count;

  for (let i = 0; i < count; i++) {
    // Alternate between left and right sides
    const isLeftSide = i % 2 === 0;

    // Place item within its section with some random offset
    const sectionStart = i * itemSectionHeight;
    const randomOffset = Math.random() * (itemSectionHeight * 0.6);

    // Pick random asset
    const asset = assets[Math.floor(Math.random() * assets.length)];

    // Pick random color for SVGs
    const color = colors.length > 0
      ? colors[Math.floor(Math.random() * colors.length)]
      : undefined;

    items.push({
      id: i,
      asset,
      color,
      top: sectionStart + randomOffset,
      left: isLeftSide
        ? config.leftEdgeMin + Math.random() * (config.leftEdgeMax - config.leftEdgeMin)
        : config.rightEdgeMin + Math.random() * (config.rightEdgeMax - config.rightEdgeMin),
      size: config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin),
      rotation: config.rotationMin + Math.random() * (config.rotationMax - config.rotationMin),
      opacity: config.opacityMin + Math.random() * (config.opacityMax - config.opacityMin),
    });
  }

  return items;
}

export default function ThemeDecor() {
  const { themeId } = useTheme();
  const { isRecruiterMode } = useViewMode();
  const [pageHeight, setPageHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [visibleItems, setVisibleItems] = useState<DecorItemData[]>([]);

  // Track the theme we're currently loading for
  const loadingThemeRef = useRef<ThemeId | null>(null);
  // Track pending timeouts for cancellation
  const pendingTimeoutsRef = useRef<number[]>([]);

  // Get decoration config for current theme
  const config = useMemo(() => getDecorConfig(themeId), [themeId]);

  // Generate all decoration items - only after mount to avoid SSR hydration issues
  const allItems = useMemo(() => {
    // Never generate items during SSR or before mount
    if (!mounted || pageHeight === 0 || !config) return [];
    return generateDecorItems(config, pageHeight);
  }, [mounted, pageHeight, config]);

  // Cancel all pending batch loads
  const cancelPendingLoads = useCallback(() => {
    pendingTimeoutsRef.current.forEach(id => window.clearTimeout(id));
    pendingTimeoutsRef.current = [];
  }, []);

  // Staged loading: above-fold first, then batch the rest
  useEffect(() => {
    if (!mounted || allItems.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clearing state on theme change
      setVisibleItems([]);
      return;
    }

    // Cancel any pending loads from previous theme
    cancelPendingLoads();

    // Track which theme we're loading
    loadingThemeRef.current = themeId;

    // Split items into above-fold and below-fold
    const aboveFold = allItems.filter(item => item.top < ABOVE_FOLD_HEIGHT);
    const belowFold = allItems.filter(item => item.top >= ABOVE_FOLD_HEIGHT);

    // Render above-fold items immediately
    setVisibleItems(aboveFold);

    // Load below-fold items in batches using requestIdleCallback or setTimeout
    const scheduleCallback = typeof requestIdleCallback !== 'undefined'
      ? (cb: () => void) => requestIdleCallback(cb, { timeout: BATCH_DELAY * 2 })
      : (cb: () => void) => window.setTimeout(cb, BATCH_DELAY);

    let loadedCount = 0;

    const loadNextBatch = () => {
      // Check if theme changed - if so, abort loading
      if (loadingThemeRef.current !== themeId) {
        return;
      }

      const nextBatch = belowFold.slice(loadedCount, loadedCount + BATCH_SIZE);
      if (nextBatch.length === 0) return;

      loadedCount += nextBatch.length;

      setVisibleItems(prev => {
        // Double-check we're still on the same theme
        if (loadingThemeRef.current !== themeId) return prev;
        return [...prev, ...nextBatch];
      });

      // Schedule next batch if more items remain
      if (loadedCount < belowFold.length) {
        const timeoutId = scheduleCallback(loadNextBatch) as number;
        pendingTimeoutsRef.current.push(timeoutId);
      }
    };

    // Start loading below-fold items after a short delay
    if (belowFold.length > 0) {
      const initialTimeoutId = window.setTimeout(loadNextBatch, BATCH_DELAY);
      pendingTimeoutsRef.current.push(initialTimeoutId);
    }

    return () => {
      cancelPendingLoads();
    };
  }, [mounted, allItems, themeId, cancelPendingLoads]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration pattern
    setMounted(true);

    const updateHeight = () => {
      // Find the footer to get the actual content end point
      const footer=document.querySelector('footer');
      if(footer) {
        const footerRect=footer.getBoundingClientRect();
        const scrollTop=window.scrollY||document.documentElement.scrollTop;
        // Height = footer bottom position (accounting for scroll)
        setPageHeight(footerRect.bottom+scrollTop);
      } else {
        // Fallback: use body's offset height (doesn't include absolute elements)
        setPageHeight(document.body.offsetHeight);
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    const observer = new ResizeObserver(updateHeight);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  // No decorations for this theme or in recruiter mode (clean resume view)
  if (!config || !mounted || isRecruiterMode) {
    return null;
  }

  return (
    <div
      className="hidden md:block absolute top-0 left-0 w-full pointer-events-none overflow-hidden"
      style={{ height: pageHeight, zIndex: config.zIndex }}
      aria-hidden="true"
    >
      {visibleItems.map((item) =>
        config.type === 'png' ? (
          <PngDecorItem
            key={`${themeId}-${item.id}`}
            src={item.asset}
            size={item.size}
            rotation={item.rotation}
            opacity={item.opacity}
            top={item.top}
            left={item.left}
          />
        ) : (
          <SvgDecorItem
            key={`${themeId}-${item.id}`}
            svgPath={item.asset}
            color={item.color!}
            size={item.size}
            rotation={item.rotation}
            opacity={item.opacity}
            top={item.top}
            left={item.left}
          />
        )
      )}
    </div>
  );
}
