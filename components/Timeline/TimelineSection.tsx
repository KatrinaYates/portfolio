'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { experience } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewMode } from '@/hooks/useViewMode';
import Card from '@/components/ui/Card';
import RevealToggle from '@/components/ui/RevealToggle';
import SectionHeader from '@/components/ui/SectionHeader';

// Experience metrics - hardcoded to avoid hydration mismatch
// Update CURRENT_YEAR when needed
const CURRENT_YEAR = 2026;

const experienceMetrics = {
  // Total years (from first job - Zaxby's 2008)
  totalYears: CURRENT_YEAR - 2008,
  // Leadership years (Cellairis was management - 2012)
  leadershipYears: CURRENT_YEAR - 2012,
  // Development years (Independent contractor - 2019)
  devYears: CURRENT_YEAR - 2019,
  // Disney years (2022)
  disneyYears: CURRENT_YEAR - 2022,
};

// ============================================
// FUN JOBS - EDIT THESE!
// Add your early career jobs that taught you valuable skills
// ============================================
const funJobs = [
  {
    title: 'Zaxby’s Cashier',
    place: 'Zaxby’s',
    year: 'The OG era',
    emoji: '🍗',
    skill: 'Learned speed, people skills, and staying calm when the line is scary.',
    tag: 'First Job · 2008'
  },
  {
    title: 'Sneaker Specialist',
    place: 'Finish Line',
    year: 'Back when retail had stamina tests',
    emoji: '👟',
    skill: 'Got good at reading people fast and matching them with the right fit.'
  },
  {
    title: 'Sunglasses + Plushie Dealer',
    place: 'Sunshade',
    year: 'Main character retail arc',
    emoji: '🕶️',
    skill: 'Learned selling, storytelling, and how to make tiny things feel exciting.'
  },
    {
    title: 'Milkshake Slinger',
    place: 'Fat Boys',
    year: 'High volume, high vibes',
    emoji: '🥤',
    skill: 'Learned flow, communication, and how to keep things moving.'
  },
  {
    title: 'Steakhouse Server',
    place: 'Stanfields',
    year: 'Chaos but make it classy',
    emoji: '🥩',
    skill: 'Levelled up multitasking, priorities, and handling pressure like a pro.'
  },

  // True but not real jobs
  {
    title: 'Kid Wrangler',
    place: 'Two tiny CEOs',
    year: 'Always',
    emoji: '🧃',
    skill: 'Patience, negotiation, and conflict resolution (elite tier).'
  },
  {
    title: 'Dog Trainer',
    place: 'My dog, my rules',
    year: 'Ongoing',
    emoji: '🐕',
    skill: 'Consistency, reinforcement, and celebrating small wins.'
  },
  {
    title: 'Party Host',
    place: 'Unofficial event producer',
    year: 'Forever',
    emoji: '🎉',
    skill: 'Planning, logistics, and making people feel welcome.'
  },
];


export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showFunJobs, setShowFunJobs] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode } = useViewMode();

  const metrics = experienceMetrics;

  // Show all experience - sorted by start year (most recent first)
  const timelineExperience = [...experience].sort((a, b) => {
    const yearA = parseInt(a.period.split('–')[0]);
    const yearB = parseInt(b.period.split('–')[0]);
    return yearB - yearA;
  });

  useEffect(() => {
    if (prefersReducedMotion || isRecruiterMode) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.timeline-item');

      // More dramatic slide-up animation - cards emerge from the timeline
      items.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate the timeline line
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isRecruiterMode]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section bg-[var(--bg-secondary)]"
    >
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Chapter 03"
          title="The Path"
          subtitle="From retail floors to Disney magic, every role shaped how I lead and build today."
        />

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          <Card className="text-center py-6">
            <p className="text-4xl font-display font-bold gradient-text mb-1">
              {metrics.totalYears}+
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Total Years
            </p>
          </Card>
          <Card className="text-center py-6">
            <p className="text-4xl font-display font-bold gradient-text mb-1">
              {metrics.devYears}+
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Dev Experience
            </p>
          </Card>
          <Card className="text-center py-6">
            <p className="text-4xl font-display font-bold gradient-text mb-1">
              {metrics.leadershipYears}+
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Leadership
            </p>
          </Card>
          <Card className="text-center py-6">
            <p className="text-4xl font-display font-bold gradient-text mb-1">
              {metrics.disneyYears}+
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              At Disney
            </p>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line - z-0 to stay behind other elements */}
          <div
            className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-start)] via-[var(--accent-end)] to-[var(--accent-start)] origin-top z-0"
            style={{ transform: 'translateX(-50%)' }}
          />

          {/* Timeline Items */}
          <div className="space-y-8">
            {timelineExperience.map((exp, index) => (
              <article
                key={exp.id}
                className={`timeline-item relative pl-12 md:pl-0 z-10 ${
                  isRecruiterMode
                    ? ''
                    : index % 2 === 0
                      ? 'md:pr-[calc(50%+2rem)] md:text-right'
                      : 'md:pl-[calc(50%+2rem)]'
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-[var(--bg-secondary)] ${
                    exp.featured
                      ? 'bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] w-5 h-5 -ml-0.5'
                      : 'bg-[var(--accent-start)]'
                  }`}
                  style={{ transform: 'translateX(-50%)', top: '1.5rem' }}
                />

                {/* Card - Now wider */}
                <Card className={exp.featured ? 'border-[var(--accent-start)]/30' : ''}>
                  {/* Period Badge */}
                  <div className={`flex items-center gap-3 mb-3 flex-wrap ${index % 2 === 0 && !isRecruiterMode ? 'md:justify-end' : ''}`}>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                      exp.featured
                        ? 'bg-gradient-to-r from-[var(--accent-start)]/20 to-[var(--accent-end)]/20 text-[var(--accent-start)]'
                        : 'bg-[var(--accent-start)]/10 text-[var(--accent-start)]'
                    }`}>
                      {exp.period}
                    </span>
                    {exp.featured && (
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--accent-end)]/20 text-[var(--accent-end)]">
                        ✨ Current
                      </span>
                    )}
                  </div>

                  {/* Company & Role */}
                  <h3 className="text-2xl font-display font-semibold mb-1">
                    {exp.company}
                  </h3>
                  <p className="text-lg text-[var(--text-secondary)] mb-4">{exp.role}</p>

                  {/* Highlights */}
                  <ul className={`space-y-2 ${index % 2 === 0 && !isRecruiterMode ? 'md:text-left' : ''}`}>
                    {exp.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                      >
                        <span className={`mt-1 flex-shrink-0 ${exp.featured ? 'text-[var(--accent-end)]' : 'text-[var(--accent-start)]'}`}>
                          •
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  {exp.tech && (
                    <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 && !isRecruiterMode ? 'md:justify-end' : ''}`}>
                      {exp.tech.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 font-mono text-[var(--accent-start)] bg-[var(--accent-start)]/10 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              </article>
            ))}
          </div>

          {/* Fun Jobs Easter Egg - z-20 to ensure it's above the timeline line */}
          <div className="mt-12 text-center relative z-20">
            <RevealToggle
              open={showFunJobs}
              onToggle={() => setShowFunJobs(!showFunJobs)}
              label="my humble beginnings"
            />

            {showFunJobs && (
              <div className="mt-6 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto relative z-20">
                {funJobs.map((job, index) => (
                  <Card
                    key={index}
                    className="text-center p-4 bg-[var(--bg-tertiary)] border-dashed relative"
                  >
                    {job.tag && (
                      <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 bg-[var(--accent-start)] text-[var(--text-on-accent)] rounded-full font-semibold shadow-sm">
                        {job.tag}
                      </span>
                    )}
                    <span className="text-3xl mb-2 block">{job.emoji}</span>
                    <p className="font-semibold text-[var(--text-primary)]">{job.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{job.place} · {job.year}</p>
                    <p className="text-xs text-[var(--accent-start)] mt-2 italic">
                      Skill gained: {job.skill}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
