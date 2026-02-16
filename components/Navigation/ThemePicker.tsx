'use client';

import { useState, useEffect, useRef, useCallback, useMemo, KeyboardEvent } from 'react';
import { useTheme, ThemeId } from '@/hooks/useTheme';
import { themes, Theme, getThemesByCategory } from '@/data/themes';

// Theme option component for reuse
function ThemeOption({
  theme,
  isSelected,
  index,
  onSelect,
}: {
  theme: Theme;
  isSelected: boolean;
  index: number;
  onSelect: (id: ThemeId) => void;
}) {
  return (
    <div
      id={`theme-option-${theme.id}`}
      role="option"
      aria-selected={isSelected}
      data-index={index}
      onClick={() => onSelect(theme.id)}
      className={`flex items-center gap-3 py-3 px-4 text-left transition-colors cursor-pointer rounded-lg ${
        isSelected
          ? 'bg-[var(--accent-start)]/10 text-[var(--accent-start)]'
          : 'text-[var(--text-secondary)]'
      }`}
    >
      {/* Theme preview */}
      <div
        className="w-8 h-8 rounded-md flex-shrink-0 relative overflow-hidden border"
        style={{
          background: theme.bgPrimary,
          borderColor: theme.borderSubtle,
        }}
        aria-hidden="true"
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ background: theme.bgSecondary }}
        />
        <div
          className="absolute top-1 left-1 w-3 h-0.5 rounded-full"
          style={{ background: `linear-gradient(90deg, ${theme.accentStart}, ${theme.accentEnd})` }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {theme.name}
        </p>
      </div>
    </div>
  );
}

interface ThemePickerProps {
  onOpen?: () => void;
  forceClose?: boolean;
}

export default function ThemePicker({ onOpen, forceClose }: ThemePickerProps) {
  const { themeId, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  // Get themes organized by category
  const categorizedThemes = useMemo(() => getThemesByCategory(), []);

  // Build a flat ordered list for keyboard navigation
  // Order: Pro Light, Pro Dark, Creative Light, Creative Dark (column by column for intuitive nav)
  const flatThemeOrder = useMemo(() => {
    const order: Theme[] = [];
    // Professional column first (for left side)
    categorizedThemes.professional.light.forEach(t => order.push(t));
    categorizedThemes.professional.dark.forEach(t => order.push(t));
    // Creative column second (for right side)
    categorizedThemes.creative.light.forEach(t => order.push(t));
    categorizedThemes.creative.dark.forEach(t => order.push(t));
    return order;
  }, [categorizedThemes]);

  // Map theme ID to flat index
  const themeIdToIndex = useMemo(() => {
    const map = new Map<ThemeId, number>();
    flatThemeOrder.forEach((t, i) => map.set(t.id, i));
    return map;
  }, [flatThemeOrder]);

  // Calculate column boundaries for keyboard navigation
  const proColumnLength = categorizedThemes.professional.light.length + categorizedThemes.professional.dark.length;

  // Hydration safety: prevent SSR/client mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration pattern
    setMounted(true);
  }, []);

  // Close when forceClose is triggered (e.g., when nav menu opens)
  useEffect(() => {
    if (forceClose) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- responding to prop change
      setIsOpen(false);
    }
  }, [forceClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key globally when open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Reset focus index when opening
  useEffect(() => {
    if (isOpen) {
      const currentIndex = themeIdToIndex.get(themeId) ?? 0;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing state when dropdown opens
      setFocusedIndex(currentIndex);
    }
  }, [isOpen, themeId, themeIdToIndex]);

  const handleSelect = useCallback((id: ThemeId) => {
    setTheme(id);
    setIsOpen(false);
    triggerRef.current?.focus();
  }, [setTheme]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    const totalThemes = flatThemeOrder.length;
    const creativeColumnLength = totalThemes - proColumnLength;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => {
          // Stay within current column
          const inProColumn = prev < proColumnLength;
          if (inProColumn) {
            // In professional column
            const nextInColumn = prev + 1;
            return nextInColumn < proColumnLength ? nextInColumn : prev;
          } else {
            // In creative column
            const nextInColumn = prev + 1;
            return nextInColumn < totalThemes ? nextInColumn : prev;
          }
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => {
          const inProColumn = prev < proColumnLength;
          if (inProColumn) {
            return prev > 0 ? prev - 1 : prev;
          } else {
            return prev > proColumnLength ? prev - 1 : prev;
          }
        });
        break;
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex(prev => {
          if (prev < proColumnLength) {
            // Move from professional to creative column
            const posInProColumn = prev;
            const targetInCreative = proColumnLength + Math.min(posInProColumn, creativeColumnLength - 1);
            return targetInCreative;
          }
          return prev;
        });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex(prev => {
          if (prev >= proColumnLength) {
            // Move from creative to professional column
            const posInCreativeColumn = prev - proColumnLength;
            const targetInPro = Math.min(posInCreativeColumn, proColumnLength - 1);
            return targetInPro;
          }
          return prev;
        });
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(totalThemes - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < totalThemes) {
          handleSelect(flatThemeOrder[focusedIndex].id);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  }, [isOpen, focusedIndex, handleSelect, flatThemeOrder, proColumnLength]);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listboxRef.current) {
      const focusedOption = listboxRef.current.querySelector(`[data-index="${focusedIndex}"]`);
      focusedOption?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, focusedIndex]);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-card)] animate-pulse" />
    );
  }

  const currentTheme = themes.find((t) => t.id === themeId) || themes[0];
  const listboxId = 'theme-listbox';

  // Helper to render a section of themes
  const renderThemeSection = (sectionThemes: Theme[], label: string) => (
    <div className="mb-1 sm:mb-2">
      <p className="hidden sm:block px-2 py-1 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
        {label}
      </p>
      {sectionThemes.map((t) => {
        const index = themeIdToIndex.get(t.id) ?? 0;
        return (
          <ThemeOption
            key={t.id}
            theme={t}
            isSelected={themeId === t.id}
            index={index}
            onSelect={handleSelect}
          />
        );
      })}
    </div>
  );

  return (
    <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        onClick={() => {
          const newIsOpen = !isOpen;
          setIsOpen(newIsOpen);
          if (newIsOpen && onOpen) {
            onOpen();
          }
        }}
        className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-start)] transition-all duration-300 overflow-hidden flex items-center justify-center bg-[var(--bg-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-start)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
        aria-label={`Change theme. Current theme: ${currentTheme.name}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
      >
        <span className="text-lg" aria-hidden="true">{currentTheme.emoji}</span>
      </button>

      {/* Dropdown - responsive layout */}
      <div
        ref={listboxRef}
        id={listboxId}
        role="listbox"
        aria-label="Theme selection"
        aria-activedescendant={isOpen && focusedIndex >= 0 ? `theme-option-${flatThemeOrder[focusedIndex]?.id}` : undefined}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        className={`fixed left-0 right-0 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-[26rem] bg-[var(--bg-primary)]/95 sm:bg-[var(--bg-card)] backdrop-blur-lg border-b sm:border border-[var(--border-subtle)] sm:rounded-xl shadow-xl transition-all duration-300 max-h-[70vh] overflow-y-auto ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container py-4 sm:p-3">
          {/* Responsive grid - single column on mobile, two columns on larger screens */}
          <div className="flex flex-col gap-1 sm:grid sm:grid-cols-2 sm:gap-4">
            {/* Professional Column */}
            <div>
              <p className="px-4 sm:px-2 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider sm:normal-case sm:tracking-normal sm:text-[var(--text-secondary)] sm:border-b sm:border-[var(--border-subtle)] mb-1 sm:mb-2">
                Professional
              </p>
              {renderThemeSection(categorizedThemes.professional.light, 'Light')}
              {renderThemeSection(categorizedThemes.professional.dark, 'Dark')}
            </div>

            {/* Creative Column */}
            <div className="mt-2 sm:mt-0">
              <p className="px-4 sm:px-2 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider sm:normal-case sm:tracking-normal sm:text-[var(--text-secondary)] sm:border-b sm:border-[var(--border-subtle)] mb-1 sm:mb-2">
                Creative
              </p>
              {renderThemeSection(categorizedThemes.creative.light, 'Light')}
              {renderThemeSection(categorizedThemes.creative.dark, 'Dark')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
