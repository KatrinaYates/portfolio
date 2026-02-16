'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { leadershipItems, LeadershipItem } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewMode } from '@/hooks/useViewMode';
import Modal from '@/components/ui/Modal';
import Card from '@/components/ui/Card';
import CardCTA from '@/components/ui/CardCTA';
import BulletList from '@/components/ui/BulletList';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionLabel from '@/components/ui/SectionLabel';
import IconBox from '@/components/ui/IconBox';

// Icon mapping
const icons: Record<string, React.ReactElement> = {
  code: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  document: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  users: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  book: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  microphone: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    </svg>
  ),
  tool: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<LeadershipItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode } = useViewMode();

  useEffect(() => {
    if (prefersReducedMotion || isRecruiterMode) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.leadership-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isRecruiterMode]);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="section bg-[var(--bg-primary)]"
    >
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Chapter 04"
          title="How I Lead"
          subtitle="Clear direction, shared standards, and support that helps people do their best work."
        />


        {/* Leadership Cards Grid - Clickable with modal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {leadershipItems.map((item) => (
            <Card
              key={item.id}
              as="button"
              onClick={() => setSelectedItem(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              interactive
              className={`leadership-card text-left group transition-opacity duration-300 ${
                hoveredItem && hoveredItem !== item.id ? 'opacity-50' : 'opacity-100'
              }`}
            >
              {/* Icon */}
              <IconBox variant="square" className="mb-4 group-hover:bg-[var(--accent-start)]/20 transition-colors">
                {icons[item.icon] || icons.code}
              </IconBox>

              <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-[var(--accent-start)] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {item.description}
              </p>

              {/* Click hint */}
              <div className="mt-4">
                <CardCTA>Learn more</CardCTA>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal */}
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem?.title || 'Leadership Details'}
          className="max-w-lg w-full"
        >
          {selectedItem && (
            <div className="p-6">
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-[var(--accent-start)]/10 flex items-center justify-center mb-4 text-[var(--accent-start)]" aria-hidden="true">
                {icons[selectedItem.icon] || icons.code}
              </div>

              <h3 className="text-2xl font-display font-semibold mb-2">
                {selectedItem.title}
              </h3>

              <p className="text-[var(--text-secondary)] mb-6">
                {selectedItem.description}
              </p>

              {/* Details */}
              {selectedItem.details && (
                <div className="mb-6">
                  <SectionLabel>Details</SectionLabel>
                  <p className="text-sm text-[var(--text-muted)]">
                    {selectedItem.details}
                  </p>
                </div>
              )}

              {/* Examples */}
              {selectedItem.examples && selectedItem.examples.length > 0 && (
                <div className="mb-6">
                  <SectionLabel>Examples</SectionLabel>
                  <BulletList items={selectedItem.examples} />
                </div>
              )}

              {/* Links */}
              {selectedItem.links && selectedItem.links.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border-subtle)]">
                  {selectedItem.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary text-sm"
                    >
                      {link.label}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
