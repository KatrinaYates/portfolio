'use client';

import React, { forwardRef } from 'react';

interface CardBaseProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}

interface CardDivProps extends CardBaseProps {
  as?: 'div' | 'article' | 'section';
  onClick?: never;
  href?: never;
}

interface CardButtonProps extends CardBaseProps {
  as: 'button';
  onClick?: () => void;
  href?: never;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface CardLinkProps extends CardBaseProps {
  as: 'a';
  href: string;
  onClick?: never;
  target?: string;
  rel?: string;
}

type CardProps = CardDivProps | CardButtonProps | CardLinkProps;

/**
 * Reusable Card component with consistent styling and hover/click effects.
 *
 * @example
 * // Static card (div)
 * <Card>Content</Card>
 *
 * // Static card (article for semantic HTML)
 * <Card as="article">Content</Card>
 *
 * // Clickable card (button)
 * <Card as="button" onClick={handleClick} interactive>Content</Card>
 *
 * // Link card
 * <Card as="a" href="/page" interactive>Content</Card>
 */
const Card = forwardRef<HTMLElement, CardProps>(function Card(props, ref) {
  const {
    as = 'div',
    children,
    className = '',
    interactive = false,
    style,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;

  // Build the className
  const baseClasses = 'card';
  const interactiveClass = interactive ? 'card-interactive' : '';
  const combinedClassName = `${baseClasses} ${interactiveClass} ${className}`.trim();

  // Common props for all elements
  const commonProps = {
    style,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    className: combinedClassName,
  };

  // Button element
  if (as === 'button') {
    const { onClick, type = 'button', disabled } = rest as CardButtonProps;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={disabled}
        {...commonProps}
      >
        {children}
      </button>
    );
  }

  // Anchor element
  if (as === 'a') {
    const { href, target, rel } = rest as CardLinkProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  // Static elements (div, article, section)
  const Element = as as 'div' | 'article' | 'section';
  return (
    <Element
      ref={ref as React.Ref<HTMLDivElement>}
      {...commonProps}
    >
      {children}
    </Element>
  );
});

export default Card;
