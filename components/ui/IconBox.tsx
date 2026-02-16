import React from 'react';

type IconBoxVariant = 'circle' | 'square';
type IconBoxSize = 'sm' | 'md' | 'lg';

interface IconBoxProps {
  children: React.ReactNode;
  variant?: IconBoxVariant;
  size?: IconBoxSize;
  gradient?: boolean;
  className?: string;
}

const sizeClasses: Record<IconBoxSize, string> = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14',
};

const variantClasses: Record<IconBoxVariant, string> = {
  circle: 'rounded-full',
  square: 'rounded-lg',
};

/**
 * Container for icons with accent background styling.
 * 
 * @example
 * <IconBox variant="circle" gradient><GraduationCap /></IconBox>
 * <IconBox variant="square" size="lg">{icon}</IconBox>
 */
export default function IconBox({
  children,
  variant = 'square',
  size = 'md',
  gradient = false,
  className = '',
}: IconBoxProps) {
  const bgClass = gradient
    ? 'bg-gradient-to-br from-[var(--accent-start)] to-[var(--accent-end)]'
    : 'bg-[var(--accent-start)]/10';

  const textClass = gradient
    ? 'text-[var(--bg-primary)]'
    : 'text-[var(--accent-start)]';

  return (
    <div
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${bgClass} ${textClass} flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
