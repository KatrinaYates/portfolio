'use client';

import { useState, useEffect } from 'react';
import { useViewMode } from '@/hooks/useViewMode';

export default function ModeToggle() {
  const { mode, toggleMode } = useViewMode();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration pattern
    setMounted(true);
  }, []);

  // Show nothing until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-24 h-8 bg-[var(--bg-card)] rounded-full animate-pulse" />
        <div className="w-8 h-8 bg-[var(--bg-card)] rounded-full animate-pulse" />
      </div>
    );
  }

  const handleToggle = () => {
    try {
      toggleMode();
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (error) {
      console.error('Error toggling mode:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        type="button"
        className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-start)] transition-colors text-sm"
        aria-label={`Switch to ${mode === 'story' ? 'recruiter' : 'story'} mode`}
        aria-pressed={mode === 'recruiter'}
      >
        {/* Story Mode Icon */}
        <span
          className={`transition-colors ${
            mode === 'story' ? 'text-[var(--accent-start)]' : 'text-[var(--text-muted)]'
          }`}
          aria-hidden="true"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        {/* Toggle Track */}
        <div className="relative w-10 h-5 bg-[var(--bg-tertiary)] rounded-full">
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] transition-all duration-300 ${
              mode === 'recruiter' ? 'left-5' : 'left-0.5'
            }`}
          />
        </div>

        {/* Recruiter Mode Icon */}
        <span
          className={`transition-colors ${
            mode === 'recruiter' ? 'text-[var(--accent-start)]' : 'text-[var(--text-muted)]'
          }`}
          aria-hidden="true"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </span>
      </button>

      {/* Mode Label (Desktop only) */}
      <span className="hidden lg:inline text-xs text-[var(--text-muted)] font-mono">
        {mode === 'story' ? 'Story' : 'Resume'}
      </span>

      {/* Resume Download Button */}
      <a
        href="/KatrinaYatesResume-External.pdf"
        download="KatrinaYatesResume.pdf"
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-start)] hover:text-[var(--accent-start)] transition-colors"
        aria-label="Download resume as PDF"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </a>
    </div>
  );
}
