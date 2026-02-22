# Katrina Yates Portfolio

A cinematic, story-driven portfolio site showcasing UX Engineering work at Disney and beyond.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + CSS Custom Properties
- **Animations**: GSAP + ScrollTrigger
- **Language**: TypeScript
- **Accessibility**: axe-core (dev mode)

## Getting Started

```bash
npm install    # Install dependencies
npm run dev    # Run development server
npm run build  # Build for production
```

Open [http://localhost:3001](http://localhost:3001) to view the site.

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with fonts & providers
│   ├── page.tsx            # Main single-page experience
│   └── globals.css         # CSS variables & base styles
├── components/
│   ├── ui/                 # Shared components (Card, Button, SectionHeader, Modal)
│   ├── Hero/               # Hero section
│   ├── Disney/             # Featured work chapter
│   ├── Timeline/           # Career timeline
│   ├── Leadership/         # Leadership skills
│   ├── WorkShowcase/       # Project showcase
│   └── ...                 # Other sections
├── data/
│   ├── content.ts          # All resume content (edit here!)
│   └── themes.ts           # Theme configurations
├── hooks/
│   ├── useTheme.tsx        # Theme context & CSS variable management
│   ├── useReducedMotion.ts # Accessibility: reduced motion
│   └── useViewMode.tsx     # Story/Recruiter mode context
├── docs/
│   ├── user-guide/         # Human-focused docs
│   └── code-review/        # AI-focused maintenance guides
└── public/
    └── work/               # Project screenshots
```

## Theming

The site includes **8 themes** organized into Professional and Creative categories:

| Professional | Creative |
|--------------|----------|
| The Gazette, Warm, Midnight Luxe | Rainbow, Southern Roots, Code Gremlin, Daisy Dusk, Emo Phase |

Each theme controls colors, typography, card styles, and optional effects.

**Quick start**: Themes are in `data/themes.ts`. Change the default by editing:

```typescript
export const DEFAULT_THEME_ID: ThemeId = 'warm';
```

**Full documentation**: See [docs/user-guide/theme-options.md](docs/user-guide/theme-options.md)

## Customization

### Content

All resume content is in `data/content.ts`:

- `personalInfo` - Name, contact, tagline
- `experience` - Work history
- `workShowcase` - Portfolio items
- `leadershipItems` - Leadership skills
- `education` - Degrees

### Screenshots

Replace placeholder images in `public/work/` (recommended: 1200x800px).

### Adding Themes

See the how-to guide: [docs/user-guide/how-to.md](docs/user-guide/how-to.md)

## Features

### Story Mode vs Recruiter Mode

- **Story Mode**: Full cinematic experience with scroll animations
- **Recruiter Mode**: Condensed, scannable resume format

### Accessibility

- `prefers-reduced-motion` support
- ARIA labels on interactive elements
- Keyboard navigation
- Semantic HTML structure
- WCAG AA color contrast

## Documentation

| Guide | Purpose |
|-------|---------|
| [docs/user-guide/theme-options.md](docs/user-guide/theme-options.md) | Theme customization reference |
| [docs/user-guide/how-to.md](docs/user-guide/how-to.md) | Step-by-step customization guides |
| [docs/code-review/cleanup-checklist.md](docs/code-review/cleanup-checklist.md) | Code quality checklist (AI-runnable) |
| [docs/code-review/accessibility-checks.md](docs/code-review/accessibility-checks.md) | Accessibility audit checklist |

## Deployment

Optimized for **Vercel** (recommended), Netlify, or GitHub Pages.

```bash
npm run build  # Build for production
```

## Links

- Live Site: [katrinayates](https://katrinayates.github.io/portfolio/)
- LinkedIn: [linkedin.com/in/katrinayates](https://www.linkedin.com/in/katrina-yates/)
- GitHub: [github.com/katrinayates](https://github.com/katrinayates)
