'use client';

import {personalInfo, experience, education, skills, workShowcase} from '@/data/content';

export default function RecruiterView() {
  return (
    <div className="recruiter-view bg-[var(--bg-primary)] py-8">
      <div className="container">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-10 pb-6 border-b border-[var(--border-subtle)]" aria-label="Contact information">
          <h1 className="text-3xl font-display font-bold mb-2">
            {personalInfo.name}
          </h1>
          <p className="text-base mb-3">
            {personalInfo.title} · {personalInfo.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-[var(--accent-start)] transition-colors"
            >
              {personalInfo.email}
            </a>
            <span>·</span>
            <span>{personalInfo.location}</span>
            <span>·</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-start)] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="max-w-4xl mx-auto mb-10" aria-label="Professional summary">
          <h2 className="text-lg font-display font-semibold mb-3">
            Summary
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {personalInfo.intro} I bring over a decade of experience across technology,
            leadership, and creative problem-solving. I currently lead UX engineering work
            at The Walt Disney Company, building accessible, scalable digital experiences
            that support both large audiences and the teams behind them.
          </p>
        </section>

        {/* Experience */}
        <section className="max-w-4xl mx-auto mb-10" aria-label="Work experience">
          <h2 className="text-lg font-display font-semibold mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <article key={exp.id} className="pb-4 border-b border-[var(--border-subtle)] last:border-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    <p className="text-[var(--text-secondary)]">{exp.company}</p>
                  </div>
                  <span className="text-sm text-[var(--text-muted)] font-mono whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1 mt-2">
                  {exp.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="text-sm text-[var(--text-muted)] flex items-start gap-2"
                    >
                      <span className="text-[var(--accent-start)] mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {exp.tech&&exp.tech.length>0&&(
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--text-muted)] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="max-w-4xl mx-auto mb-10" aria-label="Education">
          <h2 className="text-lg font-display font-semibold mb-4">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <article key={edu.id}>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {edu.degree}
                  {edu.inProgress&&(
                    <span className="ml-2 text-xs font-normal">
                      (Expected {edu.year})
                    </span>
                  )}
                </h3>
                <p className="text-[var(--text-secondary)] mb-2">
                  {edu.school} · {edu.year}
                </p>
                <div className="text-sm text-[var(--text-muted)] space-y-1">
                  {edu.major&&(
                    <p>
                      <span className="font-semibold text-[var(--accent-start)]">Major:</span> {edu.major}
                    </p>
                  )}
                  {edu.focus&&(
                    <p>
                      <span className="font-semibold text-[var(--accent-start)]">Focus:</span> {edu.focus}
                    </p>
                  )}
                  {edu.gpa&&(
                    <p>
                      <span className="font-semibold text-[var(--accent-start)]">GPA:</span> {edu.gpa}
                    </p>
                  )}
                </div>

              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="max-w-4xl mx-auto mb-10" aria-label="Technical skills">
          <h2 className="text-lg font-display font-semibold mb-4 text-[var(--accent-start)]">
            Technical Skills
          </h2>
          <div className="text-sm text-[var(--text-muted)] space-y-2">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Languages & Frameworks:
            </h3>
            <p>
              {[...skills.languages, ...skills.frameworks].join(', ')}
            </p>
            <h3 className="font-semibold text-[var(--text-primary)]">
              Tools & Practices:
            </h3>
            <p>
              {[...skills.tools, ...skills.practices].join(', ')}
            </p>
          </div>
        </section>

        {/* Key Projects */}
        <section className="max-w-4xl mx-auto" aria-label="Key projects">
          <h2 className="text-lg font-display font-semibold mb-4 text-[var(--accent-start)]">
            Key Projects
          </h2>
          <div className="space-y-4">
            {workShowcase.slice(0, 4).map((project) => (
              <article key={project.id}>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {project.whatIOwned}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
