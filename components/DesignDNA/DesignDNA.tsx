'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from './ControlPanel';
import { useDesignDNAState } from './useDesignDNAState';

// Lazy load ParticleBackground for better performance
const ParticleBackground = dynamic(() => import('./ParticleBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  ),
});

export default function DesignDNA() {
  const {
    config,
    reducedMotion,
    setConfig,
    randomize,
    reset,
  } = useDesignDNAState();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[rgb(10,10,15)]">
      {/* Particle Background */}
      <ParticleBackground config={config} />

      {/* Title overlay - top left */}
      <div className="fixed top-6 left-6 z-40 pointer-events-none">
        <h1 className="text-2xl font-light text-white/90 tracking-wide">
          Vibe Mixer
        </h1>
        <p className="text-sm text-white/40 mt-1">
          Create your particle vibe
        </p>
      </div>

      {/* Control Panel */}
      <ControlPanel
        config={config}
        onConfigChange={setConfig}
        onRandomize={randomize}
        onReset={reset}
      />

      {/* Reduced motion notice */}
      {reducedMotion && (
        <div className="fixed top-6 right-6 z-40 px-3 py-1.5 rounded-full
          bg-white/5 border border-white/10 text-xs text-white/70">
          Reduced motion active
        </div>
      )}
    </div>
  );
}
