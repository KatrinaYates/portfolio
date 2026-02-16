import React from 'react';

interface BulletListProps {
  items: string[];
  className?: string;
}

/**
 * Styled bullet list with accent-colored bullets.
 * 
 * @example
 * <BulletList items={['Item 1', 'Item 2', 'Item 3']} />
 */
export default function BulletList({ items, className = '' }: BulletListProps) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
          <span className="text-[var(--accent-start)] mt-1 flex-shrink-0" aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
