'use client';

import React, { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'filter';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  active?: boolean;
  disabled?: boolean;
}

interface ButtonElementProps extends ButtonBaseProps {
  as?: 'button';
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonLinkProps extends ButtonBaseProps {
  as: 'a';
  href: string;
  onClick?: never;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonElementProps | ButtonLinkProps;

/**
 * Reusable Button component with consistent styling.
 *
 * @example
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>Click Me</Button>
 *
 * // Secondary button
 * <Button variant="secondary" onClick={handleClick}>Click Me</Button>
 *
 * // Filter/pill button
 * <Button variant="filter" active={isActive} onClick={handleClick}>Category</Button>
 *
 * // Link styled as button
 * <Button as="a" href="/page" variant="primary">Go to Page</Button>
 */
const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const {
    as = 'button',
    variant = 'primary',
    children,
    className = '',
    active = false,
    disabled = false,
    ...rest
  } = props;

  // Build variant classes
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    ghost: 'btn btn-ghost',
    filter: 'filter-btn',
  };

  // Active state for filter buttons
  const activeClasses = active
    ? 'bg-[var(--accent-start)] text-[var(--text-on-accent)]'
    : variant === 'filter'
      ? 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
      : '';

  const combinedClassName = `${variantClasses[variant]} ${activeClasses} ${className}`.trim();

  // Anchor element
  if (as === 'a') {
    const { href, target, rel } = rest as ButtonLinkProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  // Button element
  const { onClick, type = 'button' } = rest as ButtonElementProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
});

export default Button;
