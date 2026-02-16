import React from 'react';
import { ArrowRight } from './Icons';

interface CardCTAProps {
  children: React.ReactNode;
}

/**
 * Standardized CTA (Call-to-Action) for clickable cards.
 * Shows text + arrow icon, hidden on mobile, appears on hover.
 * 
 * @example
 * <CardCTA>View Details</CardCTA>
 * <CardCTA>Learn more</CardCTA>
 */
export default function CardCTA({ children }: CardCTAProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[var(--accent-start)] opacity-100 md:opacity-0 md:group-hover:opacity-100 group-hover:gap-4 transition-all">
      <span>{children}</span>
      <ArrowRight className="w-4 h-4" />
    </div>
  );
}
