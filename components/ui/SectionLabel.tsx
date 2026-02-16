import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Small subsection header for modal content.
 * 
 * @example
 * <SectionLabel>What I Owned</SectionLabel>
 * <SectionLabel>Details</SectionLabel>
 */
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <h4 className={`text-sm font-semibold text-[var(--text-primary)] mb-2 ${className}`}>
      {children}
    </h4>
  );
}
