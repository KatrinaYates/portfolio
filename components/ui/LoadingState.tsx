import React from 'react';

interface LoadingStateProps {
  message?: string;
  minHeight?: string;
  className?: string;
}

/**
 * Loading placeholder for lazy-loaded components.
 * 
 * @example
 * <LoadingState />
 * <LoadingState message="Loading game..." minHeight="400px" />
 */
export default function LoadingState({
  message = 'Loading...',
  minHeight = '50vh',
  className = '',
}: LoadingStateProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ minHeight }}
    >
      <div className="animate-pulse text-[var(--text-muted)]">{message}</div>
    </div>
  );
}
