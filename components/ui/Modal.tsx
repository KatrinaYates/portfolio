'use client';

import { useEffect, useRef, useCallback, useId, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleId?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Accessible Modal component following WAI-ARIA dialog pattern
 *
 * Features:
 * - role="dialog" with aria-modal="true"
 * - aria-labelledby pointing to title
 * - Focus trap within modal
 * - Escape key closes modal
 * - Focus restored to trigger on close
 * - Body scroll locked when open
 * - Background hidden from screen readers
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  titleId,
  children,
  className = '',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const reactId = useId();
  const generatedTitleId = titleId || `modal-title-${reactId}`;

  // Store the element that triggered the modal
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus trap and initial focus
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the modal or first focusable element
    const closeButton = modal.querySelector<HTMLElement>('[data-modal-close]');
    if (closeButton) {
      closeButton.focus();
    } else if (firstFocusable) {
      firstFocusable.focus();
    } else {
      modal.focus();
    }

    // Handle tab key for focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    modal.addEventListener('keydown', handleKeyDown);
    return () => modal.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Restore focus on close
  useEffect(() => {
    if (!isOpen && previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={handleBackdropClick}
    >
      {/* Backdrop - hidden from screen readers, pointer-events: none so clicks pass through to wrapper */}
      <div
        className="absolute inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-sm pointer-events-none"
        aria-hidden="true"
      />

      {/* Modal dialog */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={generatedTitleId}
        tabIndex={-1}
        className={`relative bg-[var(--bg-card)] border border-[var(--border-subtle)] max-h-[80vh] overflow-auto focus:outline-none pointer-events-auto ${className}`}
        style={{ borderRadius: 'var(--radius-card)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          data-modal-close
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--accent-start)]/20 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[var(--accent-start)] focus:ring-offset-2 focus:ring-offset-[var(--bg-card)]"
          aria-label="Close dialog"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hidden title for screen readers if title is visual */}
        <h2 id={generatedTitleId} className="sr-only">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}
