'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { education, skills } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewMode } from '@/hooks/useViewMode';
import Card from '@/components/ui/Card';
import RevealToggle from '@/components/ui/RevealToggle';
import IconBox from '@/components/ui/IconBox';
import SectionHeader from '@/components/ui/SectionHeader';

const skillsGroups = [
  { label: 'Languages', items: skills.languages },
  { label: 'Frameworks', items: skills.frameworks },
  { label: 'Tools', items: skills.tools },
  { label: 'Practices', items: skills.practices },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode } = useViewMode();
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isRecruiterMode) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.education-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="education"
      className="section bg-[var(--bg-secondary)]"
    >
      <div className="container">
        {/* Section Header with Avatar */}
        <div className="text-center mb-12 relative">
          {/* Avatar walking towards title */}
          <div className="absolute left-1/2 -translate-x-[150px] md:-translate-x-[208px] top-0 bottom-0 flex items-center">
            <div className="avatar-glow-wrapper relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar/avatar-grad.png"
                alt=""
                className="avatar-grad-img h-32 md:h-40 w-auto object-contain relative z-10"
                aria-hidden="true"
              />
            </div>
          </div>

          <SectionHeader eyebrow="Chapter 05" title="Education" className="mb-0" />
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {education.map((edu) => (
            <Card
              key={edu.id}
              as="article"
              className="education-card group"
            >
              {/* Degree Icon */}
              <IconBox variant="circle" gradient className="mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </IconBox>

              {/* Degree Info */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-1">
                  {edu.degree}
                </h3>

                <p className="text-[var(--text-secondary)] mb-2">
                  {edu.school} {!edu.inProgress && `· ${edu.year}`}
                </p>

                {edu.major && (
                  <p className="text-sm text-[var(--text-muted)]">
                    <span className="font-semibold">Major:</span> {edu.major}
                  </p>
                )}

                {edu.focus && (
                  <p className="text-sm text-[var(--text-muted)]">
                    <span className="font-semibold">Focus:</span> {edu.focus}
                  </p>
                )}

                {edu.gpa && (
                  <p className="text-sm text-[var(--text-muted)]">
                    <span className="font-semibold">GPA:</span> {edu.gpa}
                  </p>
                )}

                {/* Tags: Expected year (if in progress) + Honors */}
                {(edu.inProgress || (edu.honors && edu.honors.length > 0)) && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {edu.inProgress && (
                      <span className="text-xs px-2 py-1 rounded bg-[var(--accent-start)]/20 text-[var(--accent-start)] font-medium">
                        Expected {edu.year}
                      </span>
                    )}
                    {edu.honors?.map((honor) => (
                      <span
                        key={honor}
                        className="text-xs px-2 py-1 rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                      >
                        {honor}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Skills Snapshot Toggle */}
        <div className="mt-12 text-center">
          <RevealToggle
            open={showSkills}
            onToggle={() => setShowSkills(!showSkills)}
            label="skills snapshot"
          />

          {showSkills && (
            <div className="mt-6 max-w-2xl mx-auto">
              <Card className="p-6 bg-[var(--bg-tertiary)] text-left">
                <div className="grid gap-6 md:grid-cols-2">
                  {skillsGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        {group.label}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {group.items.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
