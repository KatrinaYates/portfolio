'use client';

import { useEffect, useState } from 'react';
import { personalInfo } from '@/data/content';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  // Hydration safety: render year only on client to avoid SSR mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration pattern
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-6 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <p className="flex items-center gap-1">
            © {currentYear ?? '2026'} {personalInfo.name}. Built with
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-label="love">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              className="hover:text-[var(--accent-start)] transition-colors"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
