'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface SegmentedOption {
  value: string;
  label: string;
}

interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
}

export default function Segmented({
  options,
  value,
  onChange,
  label,
  disabled = false,
}: SegmentedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const selectedIndex = options.findIndex(o => o.value === value);

  // Update indicator position
  useEffect(() => {
    if (!containerRef.current) return;

    const buttons = containerRef.current.querySelectorAll('button');
    const selectedButton = buttons[selectedIndex];

    if (selectedButton) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = selectedButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [selectedIndex, options]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    let newIndex = currentIndex;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = options.length - 1;
    }

    if (newIndex !== currentIndex) {
      onChange(options[newIndex].value);
      // Focus the new button
      const buttons = containerRef.current?.querySelectorAll('button');
      (buttons?.[newIndex] as HTMLButtonElement)?.focus();
    }
  }, [options, onChange]);

  return (
    <div className={`dna-segmented ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {label && (
        <label className="block text-sm text-white/80 font-medium mb-2">
          {label}
        </label>
      )}

      <div
        ref={containerRef}
        role="radiogroup"
        aria-label={label || 'Options'}
        className="relative inline-flex bg-white/5 rounded-lg p-1"
      >
        {/* Sliding indicator */}
        <div
          className="absolute top-1 bottom-1 bg-white/15 rounded-md transition-all duration-200 ease-out"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          aria-hidden="true"
        />

        {options.map((option, index) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(option.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={disabled}
              className={`
                relative z-10 px-3 py-1.5 text-sm font-medium rounded-md
                transition-colors duration-150
                ${isSelected
                  ? 'text-white'
                  : 'text-white/60 hover:text-white/80'
                }
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-white/30 focus-visible:ring-offset-1
                focus-visible:ring-offset-transparent
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
