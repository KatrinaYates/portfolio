'use client';

import { useState, useEffect, useCallback } from 'react';
import { personalInfo } from '@/data/content';
import ModeToggle from '@/components/ModeToggle/ModeToggle';
import ThemePicker from './ThemePicker';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'featured', label: 'Featured' },
  { id: 'work', label: 'Portfolio' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'education', label: 'Education' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const triggerPoint = 120; // How far from top of viewport to trigger section change

    // If near the top, always show hero as active
    if (scrollY < windowHeight * 0.3) {
      setActiveSection('hero');
      return;
    }

    // Find which section is currently at the trigger point
    // Go through sections in order, find the last one whose top has passed the trigger point
    let currentSection = 'hero';

    for (const link of navLinks) {
      const section = document.getElementById(link.id);
      if (section) {
        const rect = section.getBoundingClientRect();
        // If section top is above the trigger point (has scrolled into view)
        if (rect.top <= triggerPoint) {
          currentSection = link.id;
        }
      }
    }

    setActiveSection(currentSection);
  }, []);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateActiveSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: sectionId === 'hero' ? 0 : offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-[var(--bg-primary)]/90 backdrop-blur-lg border-[var(--border-subtle)]'
          : 'bg-transparent border-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Name */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-display font-bold text-lg text-[var(--text-primary)] hover:text-[var(--accent-start)] transition-colors"
            aria-label="Go to top"
          >
            {personalInfo.name.split(' ')[0]}
            <span className="text-[var(--accent-start)]">.</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[var(--accent-start)] transition-all duration-300 ${
                    activeSection === link.id ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Side: Theme Picker + Mode Toggle + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Theme Picker */}
            <ThemePicker
              onOpen={() => setIsMobileMenuOpen(false)}
              forceClose={isMobileMenuOpen}
            />

            {/* Mode Toggle */}
            <ModeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-5 h-5 text-[var(--text-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[var(--bg-primary)]/95 backdrop-blur-lg border-b border-[var(--border-subtle)] transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left py-3 px-4 rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'bg-[var(--accent-start)]/10 text-[var(--accent-start)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
