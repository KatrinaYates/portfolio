'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { DesignDNAConfig, PresetName, CursorMode, ClickMode } from './engine/types';
import { DEFAULT_CONFIG } from './engine/types';
import { PRESET_LIST } from './presets';

export interface DesignDNAState {
  config: DesignDNAConfig;
  reducedMotion: boolean;

  // Actions
  setConfig: (partial: Partial<DesignDNAConfig>) => void;
  randomize: () => void;
  reset: () => void;
}

// Debounce config changes to prevent rapid re-renders
function useDebouncedConfig(config: DesignDNAConfig, delay: number = 50): DesignDNAConfig {
  const [debouncedConfig, setDebouncedConfig] = useState(config);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedConfig(config);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [config, delay]);

  return debouncedConfig;
}

export function useDesignDNAState(): DesignDNAState {
  const [config, setConfigState] = useState<DesignDNAConfig>(DEFAULT_CONFIG);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Debounce config for performance
  const debouncedConfig = useDebouncedConfig(config, 50);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Set config
  const setConfig = useCallback((partial: Partial<DesignDNAConfig>) => {
    setConfigState(prev => ({ ...prev, ...partial }));
  }, []);

  // Randomize config
  const randomize = useCallback(() => {
    const cursorModes: CursorMode[] = ['off', 'repel', 'attract'];
    const clickModes: ClickMode[] = ['off', 'burst', 'explode'];

    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const randValue = () => Math.round(Math.random() * 100) / 100; // 0-1 with 2 decimals

    let energy = randValue();
    let chaos = randValue();

    // Apply reduced motion if needed
    if (reducedMotion) {
      energy = Math.min(energy, 0.3);
      chaos = Math.min(chaos, 0.2);
    }

    const randomConfig: DesignDNAConfig = {
      preset: pick(PRESET_LIST),
      energy,
      connection: randValue(),
      magic: randValue(),
      chaos,
      cursor: pick(cursorModes),
      click: pick(clickModes),
    };

    setConfigState(randomConfig);
  }, [reducedMotion]);

  // Reset to defaults
  const reset = useCallback(() => {
    let resetConfig = { ...DEFAULT_CONFIG };

    // Apply reduced motion if needed
    if (reducedMotion) {
      resetConfig = {
        ...resetConfig,
        energy: Math.min(resetConfig.energy, 0.3),
        chaos: Math.min(resetConfig.chaos, 0.2),
      };
    }

    setConfigState(resetConfig);
  }, [reducedMotion]);

  return {
    config: debouncedConfig,
    reducedMotion,
    setConfig,
    randomize,
    reset,
  };
}
