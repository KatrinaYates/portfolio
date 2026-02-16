'use client';

import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
}: ToggleProps) {
  return (
    <div className={`dna-toggle flex items-center justify-between ${disabled ? 'opacity-50' : ''}`}>
      <span className="text-sm text-white/80 font-medium">
        {label}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label}: ${checked ? 'On' : 'Off'}`}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-white/30 focus-visible:ring-offset-2
          focus-visible:ring-offset-transparent
          ${checked
            ? 'bg-white/30'
            : 'bg-white/10'
          }
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            shadow-sm transition-transform duration-200 ease-in-out
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}
