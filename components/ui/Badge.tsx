import React from 'react';

type BadgeVariant = 'accent' | 'muted' | 'solid';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  accent: 'bg-[var(--accent-start)]/20 text-[var(--accent-start)]',
  muted: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
  solid: 'bg-[var(--accent-start)] text-[var(--text-on-accent)]',
};

/**
 * Small pill/tag badge component with consistent styling.
 *
 * @example
 * <Badge variant="accent">PLATFORM</Badge>
 * <Badge variant="muted">Dean's List</Badge>
 * <Badge variant="solid">Expected 2026</Badge>
 */
export default function Badge({ children, variant = 'accent', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-mono px-2 py-1 rounded ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
