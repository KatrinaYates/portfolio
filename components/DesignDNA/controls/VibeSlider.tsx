'use client';

import React, { useState, useCallback, useEffect } from 'react';

interface VibeSliderProps {
  label: string;
  value: number; // 0-1
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
}

export default function VibeSlider({
  label,
  value,
  onChange,
  leftLabel,
  rightLabel,
}: VibeSliderProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  // Sync local value with prop when not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value);
    }
  }, [value, isDragging]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const percentage = localValue * 100;

  return (
    <div className="vibe-slider">
      <label className="block text-sm text-white/80 font-medium mb-2">
        {label}
      </label>

      <div className="flex items-center gap-3">
        <span className="text-xs text-white/50 w-16 text-right shrink-0">
          {leftLabel}
        </span>

        <div className="relative flex-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={localValue}
            onChange={handleInput}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="vibe-slider-input"
            aria-label={`${label}: ${Math.round(localValue * 100)}%`}
            style={{
              '--slider-progress': `${percentage}%`,
            } as React.CSSProperties}
          />
        </div>

        <span className="text-xs text-white/50 w-16 shrink-0">
          {rightLabel}
        </span>
      </div>

      <style jsx>{`
        .vibe-slider-input {
          width: 100%;
          height: 8px;
          background: transparent;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }

        .vibe-slider-input::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.35) 0%,
            rgba(255, 255, 255, 0.35) var(--slider-progress),
            rgba(255, 255, 255, 0.1) var(--slider-progress),
            rgba(255, 255, 255, 0.1) 100%
          );
          border-radius: 4px;
        }

        .vibe-slider-input::-moz-range-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .vibe-slider-input::-moz-range-progress {
          background: rgba(255, 255, 255, 0.35);
          height: 8px;
          border-radius: 4px;
        }

        .vibe-slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .vibe-slider-input::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .vibe-slider-input:hover::-webkit-slider-thumb {
          transform: scale(1.1);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
        }

        .vibe-slider-input:hover::-moz-range-thumb {
          transform: scale(1.1);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
        }

        .vibe-slider-input:focus-visible {
          outline: none;
        }

        .vibe-slider-input:focus-visible::-webkit-slider-thumb {
          outline: 2px solid rgba(255, 255, 255, 0.5);
          outline-offset: 2px;
        }

        .vibe-slider-input:focus-visible::-moz-range-thumb {
          outline: 2px solid rgba(255, 255, 255, 0.5);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
