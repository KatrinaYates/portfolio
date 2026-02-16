import React from 'react';

interface RevealToggleProps {
  open: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}

/**
 * Toggle button for revealing hidden content with show/hide emoji.
 * 
 * @example
 * <RevealToggle open={showSkills} onToggle={() => setShowSkills(!showSkills)} label="skills snapshot" />
 */
export default function RevealToggle({ open, onToggle, label, className = '' }: RevealToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`text-sm text-[var(--text-secondary)] hover:text-[var(--accent-start)] transition-colors inline-flex items-center gap-2 bg-[var(--bg-primary)] px-4 py-2 rounded-full ${className}`}
    >
      <span>{open ? 'Hide' : 'Show'} {label}</span>
      <span className="text-lg">{open ? '🙈' : '👀'}</span>
    </button>
  );
}
