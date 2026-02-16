'use client';

import React from 'react';

interface SectionHeaderProps {
  /** Small text above the title (e.g., "Chapter 01", "Portfolio") */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Optional description below the title */
  subtitle?: string;
  /** Center align the header (default: true) */
  centered?: boolean;
  /** Additional className for the container */
  className?: string;
}

/**
 * Consistent section header component used across all sections.
 *
 * @example
 * <SectionHeader
 *   eyebrow="Chapter 01"
 *   title="What I Build at Scale"
 *   subtitle="Currently at Disney"
 * />
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 ${className}`}>
      {eyebrow && (
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-start)] mb-2 font-mono">
          {eyebrow}
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
