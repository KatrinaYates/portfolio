'use client';

import { useMemo, useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import type { DesignDNAConfig } from './engine/types';
import { VIBE_PRESETS } from './presets';

interface ParticleBackgroundProps {
  config: DesignDNAConfig;
}

export default function ParticleBackground({ config }: ParticleBackgroundProps) {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Initialize tsparticles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Check for mobile and reduced motion preference
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  // Convert vibe config to tsparticles options
  const options: ISourceOptions = useMemo(() => {
    const { preset, energy, connection, magic, chaos, cursor, click } = config;

    // Get base preset settings
    const presetConfig = VIBE_PRESETS[preset];
    const { colors, shape, links: presetLinks, glow: presetGlow, baseSpeed, baseCount, sizeRange, opacityRange } = presetConfig;

    // Performance caps
    const maxParticles = isMobile ? 50 : 100;

    // === ENERGY: Maps to speed, count, opacity animation ===
    const energyMultiplier = 0.5 + energy * 1.5; // 0.5-2x
    const speed = prefersReducedMotion ? 0 : baseSpeed * energyMultiplier;
    const particleCount = Math.min(Math.round(baseCount * (0.7 + energy * 0.6)), maxParticles);
    const opacityAnimationSpeed = energy * 3;

    // === CONNECTION: Maps to links on/off, distance, opacity ===
    const linksEnabled = presetLinks && connection > 0.2;
    const linkDistance = 80 + connection * 70; // 80-150
    const linkOpacity = 0.1 + connection * 0.5; // 0.1-0.6
    const linkWidth = 0.5 + connection * 1.5; // 0.5-2

    // === MAGIC: Maps to glow, size animation, opacity variance ===
    const glowEnabled = presetGlow || magic > 0.6;
    const glowBlur = 5 + magic * 15; // 5-20
    const sizeAnimationEnabled = !prefersReducedMotion && magic > 0.3;
    const sizeAnimationSpeed = 1 + magic * 3;
    const opacityMin = opacityRange.min * (1 - magic * 0.5); // More variance with magic

    // === CHAOS: Maps to direction spread, random movement, bounce ===
    const directionSpread = chaos * 360; // 0-360 degree spread
    const randomMovement = chaos > 0.4;
    const straightMovement = chaos < 0.2;
    const bounce = chaos > 0.5;

    // Build interactivity events
    const hoverModes: string[] = [];
    const clickModes: string[] = [];

    if (cursor === 'repel') hoverModes.push('repulse');
    if (cursor === 'attract') hoverModes.push('attract');
    if (click === 'burst') clickModes.push('push');
    if (click === 'explode') clickModes.push('repulse');

    return {
      fullScreen: false,
      fpsLimit: 60,
      pauseOnOutsideViewport: true,
      smooth: true,

      particles: {
        number: {
          value: particleCount,
          limit: { value: maxParticles },
          density: {
            enable: true,
            width: 1200,
            height: 800,
          },
        },
        color: {
          value: colors,
        },
        shape: {
          type: shape,
        },
        opacity: {
          value: { min: opacityMin, max: opacityRange.max },
          animation: {
            enable: !prefersReducedMotion && energy > 0.3,
            speed: opacityAnimationSpeed,
            sync: false,
          },
        },
        size: {
          value: { min: sizeRange.min, max: sizeRange.max },
          animation: {
            enable: sizeAnimationEnabled,
            speed: sizeAnimationSpeed,
            sync: false,
          },
        },
        links: {
          enable: linksEnabled,
          distance: linkDistance,
          color: colors[0],
          opacity: linkOpacity,
          width: linkWidth,
        },
        move: {
          enable: !prefersReducedMotion,
          speed: speed,
          direction: 'none',
          random: randomMovement,
          straight: straightMovement,
          outModes: {
            default: bounce ? 'bounce' : 'out',
          },
          angle: {
            value: directionSpread,
            offset: 0,
          },
        },
        shadow: glowEnabled
          ? {
              enable: true,
              color: colors[0],
              blur: glowBlur,
              offset: { x: 0, y: 0 },
            }
          : { enable: false },
      },

      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: {
            enable: cursor !== 'off',
            mode: hoverModes.length > 0 ? hoverModes : undefined,
          },
          onClick: {
            enable: click !== 'off',
            mode: clickModes.length > 0 ? clickModes : undefined,
          },
        },
        modes: {
          repulse: {
            distance: 100 + chaos * 50,
            duration: 0.4,
            speed: 1 + energy,
          },
          attract: {
            distance: 150,
            duration: 0.4,
            speed: 1 + energy * 0.5,
          },
          push: {
            quantity: Math.round(3 + energy * 5),
          },
        },
      },

      detectRetina: !isMobile,
    };
  }, [config, isMobile, prefersReducedMotion]);

  // Don't render until engine is initialized
  if (!init) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  // Show reduced motion notice
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0"
        />
        <p className="text-white/40 text-sm">
          Motion reduced for accessibility
        </p>
      </div>
    );
  }

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0"
    />
  );
}
