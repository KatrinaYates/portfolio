'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { themes, Theme, ThemeId, DEFAULT_THEME_ID } from '@/data/themes';

// Re-export types for consumers
export type { Theme, ThemeId };
export { themes };

interface ThemeContextType {
  theme: Theme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [mounted, setMounted] = useState(false);

  const theme = themes.find((t) => t.id === themeId) || themes[0];

  // Load saved theme on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration pattern
    setMounted(true);
    const saved = localStorage.getItem('portfolio-theme') as ThemeId | null;
    if (saved && themes.some((t) => t.id === saved)) {
      setThemeId(saved);
    }
  }, []);

  // Apply theme CSS variables
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Colors
    root.style.setProperty('--accent-start', theme.accentStart);
    root.style.setProperty('--accent-end', theme.accentEnd);
    root.style.setProperty('--bg-primary', theme.bgPrimary);
    root.style.setProperty('--bg-secondary', theme.bgSecondary);
    root.style.setProperty('--bg-tertiary', theme.bgTertiary);
    root.style.setProperty('--bg-card', theme.bgCard);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--text-muted', theme.textMuted);
    root.style.setProperty('--text-on-accent', theme.textOnAccent);
    root.style.setProperty('--border-subtle', theme.borderSubtle);

    // Computed colors
    root.style.setProperty('--glow-blue', `${theme.accentStart}66`);
    root.style.setProperty('--glow-soft', `${theme.accentStart}26`);
    root.style.setProperty('--border-accent', `${theme.accentStart}4D`);

    // Typography
    root.style.setProperty('--font-display', theme.fontDisplay);
    root.style.setProperty('--font-body', theme.fontBody);

    // Border radius
    root.style.setProperty('--radius-card', theme.borderRadius);

    // Card styles based on theme - each style is visually DISTINCT
    switch (theme.cardStyle) {
      case 'flat':
        // FLAT: Clean minimal - NO shadows, thick border, scale on hover (not lift)
        root.style.setProperty('--card-backdrop', 'none');
        root.style.setProperty('--card-shadow', 'none');
        root.style.setProperty('--card-shadow-interactive', 'none');
        root.style.setProperty('--card-border', `3px solid ${theme.borderSubtle}`);
        root.style.setProperty('--card-shadow-hover', 'none');
        root.style.setProperty('--card-hover-transform', 'scale(1.02)');
        root.style.setProperty('--card-shadow-active', 'none');
        root.style.setProperty('--card-active-transform', 'scale(0.98)');
        root.style.setProperty('--btn-border', `2px solid ${theme.borderSubtle}`);
        root.style.setProperty('--btn-shadow', 'none');
        root.style.setProperty('--btn-shadow-hover', 'none');
        root.style.setProperty('--btn-hover-transform', 'scale(1.05)');
        root.style.setProperty('--btn-shadow-active', 'none');
        root.style.setProperty('--btn-active-transform', 'scale(0.95)');
        root.style.setProperty('--chip-border', `2px solid ${theme.borderSubtle}`);
        break;

      case 'glow':
        // GLOW: Ambient aura - large colored glow spread, NO blur, thin accent border
        root.style.setProperty('--card-backdrop', 'none');
        root.style.setProperty('--card-shadow', `0 0 40px ${theme.accentStart}25, 0 0 80px ${theme.accentEnd}15`);
        root.style.setProperty('--card-shadow-interactive', `0 0 40px ${theme.accentStart}25, 0 0 80px ${theme.accentEnd}15`);
        root.style.setProperty('--card-border', `1px solid ${theme.accentStart}50`);
        root.style.setProperty('--card-shadow-hover', `0 0 60px ${theme.accentStart}40, 0 0 120px ${theme.accentEnd}25`);
        root.style.setProperty('--card-hover-transform', 'translateY(-6px) scale(1.01)');
        root.style.setProperty('--card-shadow-active', `0 0 30px ${theme.accentStart}20`);
        root.style.setProperty('--card-active-transform', 'translateY(0) scale(1)');
        root.style.setProperty('--btn-border', `1px solid ${theme.accentStart}60`);
        root.style.setProperty('--btn-shadow', `0 0 25px ${theme.accentStart}35`);
        root.style.setProperty('--btn-shadow-hover', `0 0 40px ${theme.accentStart}50`);
        root.style.setProperty('--btn-hover-transform', 'translateY(-3px)');
        root.style.setProperty('--btn-shadow-active', `0 0 15px ${theme.accentStart}25`);
        root.style.setProperty('--btn-active-transform', 'translateY(0)');
        root.style.setProperty('--chip-border', `1px solid ${theme.accentStart}50`);
        break;

      case 'neon':
        // NEON: Cyberpunk - strong inset glow, thick neon border, moderate blur
        root.style.setProperty('--card-backdrop', 'blur(12px)');
        root.style.setProperty('--card-shadow', `0 0 25px ${theme.accentStart}50, inset 0 0 30px ${theme.accentStart}15`);
        root.style.setProperty('--card-shadow-interactive', `0 0 25px ${theme.accentStart}50, inset 0 0 30px ${theme.accentStart}15`);
        root.style.setProperty('--card-border', `2px solid ${theme.accentStart}80`);
        root.style.setProperty('--card-shadow-hover', `0 0 40px ${theme.accentStart}70, inset 0 0 40px ${theme.accentStart}25`);
        root.style.setProperty('--card-hover-transform', 'translateY(-4px)');
        root.style.setProperty('--card-shadow-active', `0 0 20px ${theme.accentStart}40, inset 0 0 20px ${theme.accentStart}10`);
        root.style.setProperty('--card-active-transform', 'translateY(0)');
        root.style.setProperty('--btn-border', `2px solid ${theme.accentStart}80`);
        root.style.setProperty('--btn-shadow', `0 0 20px ${theme.accentStart}50`);
        root.style.setProperty('--btn-shadow-hover', `0 0 35px ${theme.accentStart}70`);
        root.style.setProperty('--btn-hover-transform', 'translateY(-2px)');
        root.style.setProperty('--btn-shadow-active', `0 0 12px ${theme.accentStart}35`);
        root.style.setProperty('--btn-active-transform', 'translateY(0)');
        root.style.setProperty('--chip-border', `2px solid ${theme.accentStart}70`);
        break;

      case 'comic':
        // COMIC: Retro pop-art - bold offset shadow, thick border, dramatic transforms
        const shadowColor = theme.shadowColor || '#000000';
        root.style.setProperty('--shadow-color', shadowColor);
        root.style.setProperty('--card-backdrop', 'none');
        root.style.setProperty('--card-shadow', `5px 5px 0 ${shadowColor}`);
        root.style.setProperty('--card-shadow-interactive', `5px 5px 0 ${shadowColor}`);
        root.style.setProperty('--card-border', `4px solid ${shadowColor}`);
        root.style.setProperty('--card-shadow-hover', `8px 8px 0 ${shadowColor}`);
        root.style.setProperty('--card-hover-transform', 'translate(-3px, -3px)');
        root.style.setProperty('--card-shadow-active', `2px 2px 0 ${shadowColor}`);
        root.style.setProperty('--card-active-transform', 'translate(3px, 3px)');
        root.style.setProperty('--btn-border', `3px solid ${shadowColor}`);
        root.style.setProperty('--btn-shadow', `4px 4px 0 ${shadowColor}`);
        root.style.setProperty('--btn-shadow-hover', `6px 6px 0 ${shadowColor}`);
        root.style.setProperty('--btn-hover-transform', 'translate(-2px, -2px)');
        root.style.setProperty('--btn-shadow-active', `1px 1px 0 ${shadowColor}`);
        root.style.setProperty('--btn-active-transform', 'translate(3px, 3px)');
        root.style.setProperty('--chip-border', `2px solid ${shadowColor}`);
        root.style.setProperty('--border-accent', shadowColor);
        break;
    }

    // Text stroke styles (uses shadowColor if set, otherwise black)
    const textStroke = theme.textStroke || 'none';
    const strokeColor = theme.shadowColor || '#000000';
    switch (textStroke) {
      case 'none':
        root.style.setProperty('--text-stroke-heading', 'none');
        root.style.setProperty('--text-stroke-body', 'none');
        break;
      case 'subtle':
        root.style.setProperty('--text-stroke-heading', `0.1px ${strokeColor}`);
        root.style.setProperty('--text-stroke-body', `0.01px ${strokeColor}`);
        break;
      case 'bold':
        root.style.setProperty('--text-stroke-heading', `1px ${strokeColor}`);
        root.style.setProperty('--text-stroke-body', `0.5px ${strokeColor}`);
        break;
    }

    // Set body class for text stroke (needed for CSS application)
    document.body.classList.toggle('has-text-stroke', textStroke !== 'none');

    // Update body classes for light/dark
    document.body.classList.toggle('theme-light', !theme.isDark);
    document.body.classList.toggle('theme-dark', theme.isDark);

    // Set data-theme attribute for theme-specific CSS overrides
    document.body.setAttribute('data-theme', theme.id);

  }, [theme, mounted]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem('portfolio-theme', id);
  }, []);

  const value: ThemeContextType = {
    theme,
    themeId,
    setTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default useTheme;
