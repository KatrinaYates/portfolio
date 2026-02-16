'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { DesignDNAConfig, PresetName, CursorMode, ClickMode } from './engine/types';
import { VIBE_PRESETS, PRESET_LIST, CURSOR_OPTIONS, CLICK_OPTIONS } from './presets';
import { Segmented } from './controls';
import VibeSlider from './controls/VibeSlider';

interface ControlPanelProps {
  config: DesignDNAConfig;
  onConfigChange: (partial: Partial<DesignDNAConfig>) => void;
  onRandomize: () => void;
  onReset: () => void;
}

export default function ControlPanel({
  config,
  onConfigChange,
  onRandomize,
  onReset,
}: ControlPanelProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile drag handling
  const handleDragStart = useCallback((e: React.PointerEvent) => {
    if (!isMobile) return;
    dragStartY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [isMobile]);

  const handleDragMove = useCallback((e: React.PointerEvent) => {
    if (dragStartY.current === null || !isMobile) return;
    const delta = dragStartY.current - e.clientY;
    const threshold = 50;

    if (delta > threshold && !isExpanded) {
      setIsExpanded(true);
    } else if (delta < -threshold && isExpanded) {
      setIsExpanded(false);
    }
  }, [isMobile, isExpanded]);

  const handleDragEnd = useCallback(() => {
    dragStartY.current = null;
  }, []);

  const panelClasses = isMobile
    ? `fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300 ${
        isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'
      }`
    : 'fixed bottom-6 right-6 w-80 z-50';

  return (
    <div
      ref={panelRef}
      className={panelClasses}
      style={{
        background: 'rgba(20, 20, 28, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: isMobile ? '1.5rem 1.5rem 0 0' : '1rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Mobile drag handle */}
      {isMobile && (
        <div
          className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div className="w-10 h-1 rounded-full bg-white/30" />
        </div>
      )}

      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-white/5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Vibe Mixer</h2>
            <p className="text-xs text-white/50 mt-0.5">
              Create your particle vibe
            </p>
          </div>

          <div className="flex items-center gap-1">
            {/* Randomize */}
            <button
              type="button"
              onClick={onRandomize}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white/70 text-xs
                hover:text-white hover:bg-white/5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Randomize settings"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Random
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white/70 text-xs
                hover:text-white hover:bg-white/5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Reset to defaults"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m0 0a8.001 8.001 0 0115.356 2M4.582 9H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 space-y-5">
        {/* Preset selector */}
        <div>
          <label className="block text-sm text-white/80 font-medium mb-2.5">
            Preset
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_LIST.map((presetKey) => {
              const preset = VIBE_PRESETS[presetKey];
              const isSelected = config.preset === presetKey;

              return (
                <button
                  key={presetKey}
                  type="button"
                  onClick={() => onConfigChange({ preset: presetKey })}
                  className={`relative px-2 py-2.5 rounded-lg text-center transition-all
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                    ${isSelected
                      ? 'bg-white/15 text-white ring-1 ring-white/30'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  aria-pressed={isSelected}
                >
                  {/* Color dots */}
                  <div className="flex justify-center gap-0.5 mb-1.5">
                    {preset.colors.slice(0, 4).map((color, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium">{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Vibe sliders */}
        <div className="space-y-4">
          <VibeSlider
            label="Energy"
            value={config.energy}
            onChange={(v) => onConfigChange({ energy: v })}
            leftLabel="calm"
            rightLabel="amped"
          />
          <VibeSlider
            label="Connection"
            value={config.connection}
            onChange={(v) => onConfigChange({ connection: v })}
            leftLabel="loose"
            rightLabel="linked"
          />
          <VibeSlider
            label="Magic"
            value={config.magic}
            onChange={(v) => onConfigChange({ magic: v })}
            leftLabel="clean"
            rightLabel="sparkly"
          />
          <VibeSlider
            label="Chaos"
            value={config.chaos}
            onChange={(v) => onConfigChange({ chaos: v })}
            leftLabel="stable"
            rightLabel="wild"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Interaction controls */}
        <div className="space-y-4">
          <Segmented
            label="Cursor"
            options={CURSOR_OPTIONS}
            value={config.cursor}
            onChange={(v) => onConfigChange({ cursor: v as CursorMode })}
          />
          <Segmented
            label="Click"
            options={CLICK_OPTIONS}
            value={config.click}
            onChange={(v) => onConfigChange({ click: v as ClickMode })}
          />
        </div>
      </div>
    </div>
  );
}
