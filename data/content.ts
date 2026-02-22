// ============================================
// PORTFOLIO CONTENT DATA
// Edit this file to update all resume content
// ============================================

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
  tech?: string[];
  featured?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  major?: string;
  gpa?: string;
  focus?: string;
  honors?: string[];
  inProgress?: boolean;
}

export interface ModalSection {
  heading: string;
  bullets: string[];
}

export interface SlideMedia {
  src: string;
  alt: string;  // alt text for images, used as aria-label for videos
  type?: 'image' | 'video';  // defaults to 'image' if not specified
  poster?: string;  // optional poster image for videos
  autoplay?: boolean;  // if true, video autoplays muted and loops (no controls)
}

// Alias for backwards compatibility
export type SlideImage = SlideMedia;

export interface WorkShowcaseItem {
  id: string;
  title: string;
  category: 'aloha-platform' | 'enterprise' | 'tools' | 'personal';
  platform?: 'aloha';  // indicates built on Aloha
  platformRole?: 'core' | 'implementation';  // role within the platform
  poweredBy?: 'aloha';  // formalizes the relationship for filtering/badges
  role: string;
  stack: string[];
  whatIOwned: string;
  whyItMatters?: string;  // optional paragraph for modal
  impact?: string[];  // optional bullet list for modal
  images: SlideImage[];  // array of images for slider
  featuredImage?: string;  // optional override for card thumbnail, defaults to images[0].src
  links: { label: string; url: string }[];
  modalSections?: ModalSection[];  // structured content for detailed modals
  modalHighlights?: string[];  // optional bullet highlights for implementations
}

export interface FeaturedPanel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
}

export interface LeadershipItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  details?: string;
  examples?: string[];
  links?: { label: string; url: string }[];
}

// ============================================
// PERSONAL INFO
// ============================================
export const personalInfo = {
  name: 'Katrina Yates',
  title: 'Senior Creative Developer',
  subtitle: 'UX Engineer',
  tagline: 'Hi, I\'m Kat',
  intro: 'I bring design systems to life.',
  email: 'Katrina.yates14@gmail.com',
  phone: '(256) 577-9292',
  linkedin: 'https://linkedin.com/in/katrina-yates',
  location: 'Orlando, FL',
};

// ============================================
// DISNEY CHAPTER PANELS (Pinned Scroll)
// ============================================
export const featuredPanels: FeaturedPanel[] = [
  {
    id: 'high-traffic',
    title: 'High-Traffic, Accessible, Scalable UI',
    subtitle: 'Building for millions',
    description: 'Leading front-end development for Disney Parks Blog and internal platforms used by millions of guests and cast members. Focused on design, accessibility, and long-term maintainability.',
    tech: ['React', 'JavaScript', 'SCSS', 'WCAG-aligned UI'],
  },
  {
    id: 'aloha',
    title: 'Aloha: Reusable Component Framework',
    subtitle: 'Reusable design systems at scale',
    description: 'Architecting and maintaining a comprehensive component library that ensures consistency across Disney digital experiences. Gutenberg blocks, reusable patterns, and documented standards.',
    tech: ['React', 'WordPress', 'Gutenberg', 'SCSS'],
  },
  {
    id: 'technical-lead',
    title: 'Cross-Functional Technical Leadership',
    subtitle: 'Bridging design and engineering',
    description: 'Leading technical initiatives across teams, collaborating with designers, product managers, and engineers to deliver cohesive experiences. From concept to deployment.',
    tech: ['Figma', 'Jira', 'Confluence', 'Agile'],
  },
  {
    id: 'quality',
    title: 'QA, Code Reviews, UX Validation',
    subtitle: 'Quality is non-negotiable',
    description: 'Establishing code review standards, implementing CI/CD pipelines, and validating UX decisions through data. Every release meets Disney\'s high bar for quality.',
    tech: ['GitLab CI/CD', 'Docker', 'Code Review'],
  },
];

// ============================================
// EXPERIENCE
// ============================================
export const experience = [
  {
    id: 'disney',
    company: 'The Walt Disney Company',
    role: 'Senior Creative Developer, UX Engineering Focus',
    period: '2022–Present',
    featured: true,
    highlights: [
      'Lead development for high-traffic Disney sites, with a focus on performance, accessibility, and long-term maintainability.',
      'Architect and maintain Aloha, a reusable Gutenberg-based platform that helps non-technical teams publish confidently at scale.',
      'Partner cross-functionally with design, product, vendors, and stakeholders to scope work, align decisions, and ship cleanly.',
      'Support content syndication and integrations across platforms, including collaboration with mobile teams.',
      'Own quality rituals: code reviews, UX validation, and standards that keep the system consistent as more teams ship.',
      'Run enablement: trainings for partners and producers, plus docs that actually get used.',
      'Share learnings externally as a WordCamp speaker.',
    ],
    tech: [
      'Gutenberg Blocks',
      'React',
      'JavaScript (ES6+)',
      'SCSS',
      'PHP',
      'Node',
      'GitLab',
      'CI/CD',
      'Docker',
      'Jira',
      'Confluence',
      'Figma',
    ],
  },
  {
    id: 'nside',
    company: 'nSide',
    role: 'Software Engineer, Front-End / UX',
    period: '2020–2022',
    highlights: [
      'Built responsive, accessible UI components for a school safety platform with real-world workflows.',
      'Implemented forms, tagging, and user-facing flows designed to reduce friction and speed up task completion.',
      'Worked in a GitLab-based team workflow and shipped features with a quality-first mindset.',
    ],
    tech: ['React', 'JavaScript (ES6+)', 'CSS', 'Git', 'GitLab'],
  },
  {
    id: 'contractor',
    company: 'Independent Contractor',
    role: 'Creative UX Developer',
    period: '2019–2022',
    highlights: [
      'Designed and built custom sites and interactive prototypes for small businesses and creative clients.',
      'Translated final designs into responsive, cross-browser UI with a strong UX execution focus.',
      'Balanced client goals, timelines, and quality while owning delivery end-to-end.',
    ],
    tech: ['WordPress', 'JavaScript (ES6+)', 'Bootstrap', 'Git', 'GitHub', 'Figma', 'Axure'],
  },
  {
    id: 'cellairis',
    company: 'Cellairis',
    role: 'Technical District Manager, Multi-Location Ops',
    period: '2012–2018',
    highlights: [
      'Led technical repair operations across multiple retail locations spanning two states, supporting both performance and customer experience.',
      'Built training playbooks and coached store leaders and technicians on troubleshooting, diagnostics, and consistent repair quality.',
      'Turned underperforming locations into top performers through hands-on leadership, process improvements, and team development.',
      'Acted as the escalation point for complex device issues, operational bottlenecks, and staffing challenges.',
      'Drove measurable sales improvement over time, including moving a store from mid-pack to top-tier national ranking.',
    ],
    tech: [
      'Leadership',
      'Technical Training',
      'Operations',
      'Device Diagnostics',
      'Repair QA',
      'Coaching',
      'Multi-Location Management',
    ],
  },
];


// ============================================
// EDUCATION
// ============================================
export const education: Education[] = [
  {
    id: 'masters',
    degree: 'Master of Science',
    school: 'Florida Institute of Technology',
    year: '2026',
    major: 'Computer Information Systems',
    gpa: '4.0 GPA',
    focus: 'Software Architecture & Technical Leadership',
    inProgress: true,
    honors: ["Dean's List"],
  },
  {
    id: 'bachelors',
    degree: 'Bachelor of Science',
    school: 'University of North Alabama',
    year: '2022',
    major: 'Computer Science',
    gpa: '4.0 Major GPA',
    focus: 'UX Engineering & Human-Computer Interaction',
    honors: ["Dean's List", 'Leadership Scholarship'],
  },
];

// ============================================
// WORK SHOWCASE
// ============================================
export const workShowcase: WorkShowcaseItem[] = [
  {
    id: 'aloha-framework',
    title: 'Aloha Component Library',
    category: 'aloha-platform',
    platform: 'aloha',
    platformRole: 'core',
    role: 'Technical Lead',
    stack: [
      'Gutenberg Blocks',
      'React',
      'Modern JavaScript (ES6+)',
      'SCSS Architecture',
      'Tokenized Theming',
      'Accessibility',
      'CI/CD'
    ],
whatIOwned:
  'I led and built a Gutenberg-based component library used across multiple large-scale sites. My focus was block architecture, shared utilities, styling patterns, accessibility, and the guardrails that keep everything consistent, scalable, and hard to break.',
whyItMatters:
  'This library turns content-driven UI into a system teams can trust. Editors can move fast with reusable blocks, while design, accessibility, and behavior stay predictable as the platform grows.',
impact: [
  'Built a reusable block library powering multiple high-traffic sites',
  'Cut down one-off UI work by standardizing components and patterns',
  'Improved accessibility by baking best practices directly into blocks',
  'Defined clear block and component APIs so content stays consistent',
  'Created a foundation that can evolve long-term without fragmentation',
],

    images: [
      { src: '/work/aloha/blocks-collage.png', alt: 'Aloha Framework components collage' },
      { src: '/work/aloha/blocks-HeroPro.png', alt: 'Hero Pro block component' },
      { src: '/work/aloha/blocks-takeover.png', alt: 'Takeover block component' },
      { src: '/work/aloha/blocks-CardThreeCol.png', alt: 'Three column card block' },
      { src: '/work/aloha/blocks-post.png', alt: 'Post block component' },
      { src: '/work/aloha/blocks-social.png', alt: 'Social block component' },
      { src: '/work/aloha/blocks-countdown.png', alt: 'Countdown block component' },
      { src: '/work/aloha/blocks-hotspot.png', alt: 'Hotspot block component' },
      { src: '/work/aloha/blocks-fw.png', alt: 'Full-width block layout' },
      { src: '/work/aloha/blocks-hotspot.mp4', alt: 'Hotspot block interaction demo', type: 'video', autoplay: true },
    ],
    links: [],
modalSections: [
  {
    heading: 'Platform Capabilities',
    bullets: [
      'Reusable Gutenberg-based component library with consistent APIs',
      'Composable UI patterns and shared building blocks',
      'Tokenized theming for color, spacing, and typography',
      'Layered SCSS architecture with clear ownership',
      'Accessibility and performance considered by default, not later',
    ],
  },
  {
    heading: 'Architecture & Governance',
    bullets: [
      'Clear override hierarchy from platform to instance',
      'Constrained theming that supports brand expression without chaos',
      'Defined contracts and guardrails to keep components predictable',
      'Documentation written for humans and reinforced by the system',
    ],
  },
  {
    heading: 'Developer Experience',
    bullets: [
      'Consistent block and component APIs across the platform',
      'Shared tooling and conventions that reduce cognitive load',
      'Patterns that help teams move fast without drifting apart',
    ],
  },
  {
    heading: 'Quality & Engineering',
    bullets: [
      'Accessibility-first implementation (keyboard, screen readers, contrast)',
      'SEO-aware markup and content structure',
      'Ongoing performance improvements and dependency cleanup',
      'Cross-browser and responsive validation workflows',
    ],
  },
],

  },
  {
    id: 'disney-parks-blog',
    title: 'Disney Parks Blog',
    category: 'aloha-platform',
    platform: 'aloha',
    platformRole: 'implementation',
    poweredBy: 'aloha',
    role: 'Lead Developer',
    stack: [
      'Gutenberg Blocks',
      'React',
      'Modern JavaScript (ES6+)',
      'SCSS Architecture',
      'Accessibility',
      'Performance Optimization',
      'Content Integration'
    ],
whatIOwned:
  'Front-end and UX engineering for a high-traffic editorial site, with a focus on reusable components, accessibility, performance, and content workflows built on the Aloha platform.',
whyItMatters:
  'On high-traffic sites, small UX and performance decisions add up fast. Using a shared component system made it possible to scale confidently without slowing down editorial teams.',
impact: [
  'Supported millions of monthly visitors with accessible, performant UI',
  'Gave editorial teams flexibility without letting design drift',
  'Reduced one-off builds by reusing governed components',
  'Proved the Aloha component library could handle real-world scale',
],

    images: [
      { src: '/work/dpb/dpb-section.png', alt: 'Disney Parks Blog grid layout (Digital Pixie Dust hub)' },
      { src: '/work/dpb/dpb-post.png', alt: 'Disney Parks Blog editorial hero layout (Foodie Guide)' },
      { src: '/work/dpb/dpb-feature.png', alt: 'Disney Parks Blog Featured page layout (Tiana)' },
      { src: '/work/dpb/dpb-slider.png', alt: 'Disney Parks Blog contributor slider layout' },
      { src: '/work/dpb/dpb-contributor.png', alt: 'Disney Parks Blog contributor profile layout' },
      { src: '/work/dpb/dpb-campaign.mp4', alt: 'Campaign block animation demo', type: 'video', autoplay: true },
    ],
    links: [
      { label: 'View Live Site', url: 'https://disneyparksblog.com' }
    ],
    modalHighlights: [
      'Public-facing, high-traffic editorial platform with millions of monthly visitors',
      'Accessibility-first implementation at scale',
      'Tokenized theming with product-specific customization',
      'Editorial flexibility without design drift through shared components',
    ],
  },
  {
    id: 'disney-experiences',
    title: 'Disney Experiences',
    category: 'aloha-platform',
    platform: 'aloha',
    platformRole: 'implementation',
    poweredBy: 'aloha',
    role: 'Lead Developer',
    stack: [
      'Gutenberg Blocks',
      'React',
      'Modern JavaScript (ES6+)',
      'SCSS Architecture',
      'Accessibility',
      'Content Integration'
    ],
whatIOwned:
  'Led front-end development for a brand-forward enterprise site, extending shared Aloha components with product-specific styling and content-driven behavior.',
whyItMatters:
  'Brand-heavy experiences still need structure. This work shows how a shared system can flex visually without falling apart underneath.',
impact: [
  'Extended shared components to support expressive, brand-specific layouts',
  'Kept system consistency while allowing strong visual storytelling',
  'Avoided fragmentation by layering product needs on top of the core platform',
  'Confirmed the platform could scale beyond editorial use cases',
],

    images: [
      { src: '/work/dx/dx-post.png', alt: 'Disney Experiences brand-forward enterprise site' },
    ],
    links: [
      { label: 'Disney Experiences', url: 'https://disneyexperiences.com' }
    ],
    modalHighlights: [
      'Brand expression within a shared component library',
      'Product-specific extensions built on top of a core system',
      'Scalable patterns for enterprise marketing content',
      'Cross-functional collaboration with brand and marketing teams',
    ],
  },
    {
    id: 'in-disney-connect',
    title: 'in.DisneyConnect',
    category: 'aloha-platform',
    platform: 'aloha',
    platformRole: 'implementation',
    poweredBy: 'aloha',
    role: 'UX Engineer',
    stack: ['React', 'JavaScript', 'SCSS', 'REST APIs', 'Content Integration'],
whatIOwned:
  'UX engineering for an internal enterprise product, adapting shared Aloha components to support clarity, governance, and everyday usability at scale.',
whyItMatters:
  'Internal tools care less about brand and more about clarity. This project proved the platform could support very different UX priorities without special-casing everything.',
impact: [
  'Delivered a consistent UX for internal communication at enterprise scale',
  'Improved usability and governance for internal publishers',
  'Showed the platform could flex beyond public-facing experiences',
  'Reinforced UX-first decision-making inside a shared system',
],

      images: [
          { src: '/work/ind/ind-docs.png', alt: 'in.DisneyConnect internal communication platform'},
      {src: '/work/ind/no-result.mp4', alt: 'in.DisneyConnect internal communication platform', type: 'video', autoplay: true},
    ],
    links: [{ label: 'Internal Platform', url: '#' }],
    modalHighlights: [
      'Internal audience with distinct usability priorities',
      'Governance and consistency across enterprise publishing',
      'Same platform foundation, different UX constraints',
      'Decision-making driven by usability over branding',
    ],
  },


  {
    id: 'blockalytics',
    title: 'Block-Alytics',
    category: 'tools',
    role: 'UX Developer / Platform Engineer',
    stack: ['JavaScript', 'PHP', 'Data Analysis', 'Admin UI', 'Multisite Systems'],
    whatIOwned:
      'Designed and built an internal analytics tool that tracks real-world component usage, flags deprecated patterns, and highlights unused components to guide platform decisions.',
    whyItMatters:
      'Platforms get messy when decisions are based on vibes. Block-Alytics brings real data into maintenance, refactors, and long-term planning.',
    impact: [
      'Enabled data-driven cleanup of unused and deprecated components',
      'Reduced risk during platform refactors and migrations',
      'Saved engineering time by eliminating manual audits',
      'Strengthened long-term platform health and sustainability',
    ],

    images: [
      { src: '/work/tools/blockalytics.png', alt: 'Block-Alytics component usage dashboard' },
    ],
    links: [{ label: 'Internal Tool', url: '#' }],
    modalSections: [
      {
        heading: 'What It Does',
        bullets: [
          'Aggregates component usage across published content',
          'Displays usage counts and exact locations',
          'Supports both single-site and multi-site analysis',
          'Highlights deprecated and unused components',
        ],
      },
    ],
  },

  // {
  //   id: 'vibe-mixer',
  //   title: 'Vibe Mixer',
  //   category: 'personal',
  //   role: 'Creative Developer',
  //   stack: ['React', 'TypeScript', 'tsparticles', 'Next.js', 'Canvas'],
  //   whatIOwned:
  //     'Designed and built an interactive particle playground that transforms technical particle physics into an expressive, designer-friendly experience with curated presets and intuitive vibe controls.',
  //   whyItMatters:
  //     'Demonstrates the intersection of creative coding and UX design—making complex particle systems accessible through thoughtful abstraction and playful interaction design.',
  //   impact: [
  //     'Created 6 curated presets with distinct visual personalities',
  //     'Abstracted particle physics into intuitive "vibe" sliders',
  //     'Built for performance with 60fps rendering and reduced motion support',
  //     'Designed accessible controls with keyboard navigation and ARIA labels',
  //   ],
  //   images: [
  //     { src: '/work/vibe-mixer/vibe-mixer-preview.svg', alt: 'Vibe Mixer particle playground interface' },
  //   ],
  //   links: [{ label: 'Try It Live', url: '/design-dna' }],
  //   modalSections: [
  //     {
  //       heading: 'Design Philosophy',
  //       bullets: [
  //         'Expressive controls over technical parameters',
  //         'Curated presets that feel intentional, not random',
  //         'Word-based labels instead of numeric values',
  //         'Premium, minimal UI that stays out of the way',
  //       ],
  //     },
  //     {
  //       heading: 'Technical Highlights',
  //       bullets: [
  //         'tsparticles engine with custom configuration mapping',
  //         'Debounced state updates for smooth slider interaction',
  //         'Responsive design with mobile touch support',
  //         'Lazy-loaded engine for fast initial page load',
  //       ],
  //     },
  //   ],
  // },
];

// ============================================
// LEADERSHIP ITEMS
// Edit the 'details' and 'examples' fields to add more info!
// ============================================
export const leadershipItems: LeadershipItem[] = [
  {
    id: 'code-reviews',
    title: 'Code Reviews',
    description:
      'Run thoughtful, constructive code reviews that raise quality without slowing teams down.',
    icon: 'code',
    details:
      'I treat code reviews as a collaboration space, not a gate. The goal is shared understanding, better patterns, and helping teammates grow while keeping momentum.',
    examples: [
      'Introduced shared review guidelines to keep feedback clear and kind',
      'Focused reviews on patterns, accessibility, and long-term maintainability',
      'Helped normalize asking questions and learning through reviews',
    ],
  },
  {
    id: 'standards-docs',
    title: 'Standards & Docs',
    description:
      'Define clear standards and documentation so teams can work confidently and independently.',
    icon: 'document',
    details:
      'I believe standards and documentation should remove friction, not add it. I focus on practical guidance, real examples, and keeping docs close to the systems they support.',
    examples: [
      'Component and block usage standards',
      'SCSS structure, naming conventions, and best practices',
      'Accessibility and performance expectations documented and enforced',
    ],
  },
  {
    id: 'leadership',
    title: 'Technical Leadership',
    description:
      'Lead projects through ambiguity with clear direction, thoughtful decisions, and calm execution.',
    icon: 'compass',
    details:
      'I’m often brought in when things are fuzzy. I help shape scope, break down problems, and guide teams toward solutions that balance quality, timelines, and long-term impact.',
    examples: [
      'Scoped and guided platform-level initiatives from idea to rollout',
      'Made technical tradeoffs with both product and engineering in mind',
      'Unblocked teams by simplifying complex problems',
    ],
  },
  {
    id: 'mentorship',
    title: 'Mentorship & Support',
    description:
      'Support engineers through onboarding, guidance, and steady technical mentorship.',
    icon: 'users',
    details:
      'I enjoy helping people feel confident in unfamiliar systems. My approach is patient, collaborative, and focused on building long-term understanding.',
    examples: [
      'Onboarded new developers into shared platforms and workflows',
      'Provided ongoing guidance through reviews and pairing',
      'Helped teammates grow into stronger, more confident engineers',
    ],
  },
  {
    id: 'tools',
    title: 'Tools I Work In',
    description:
      'Comfortable working across modern dev tools that support collaboration and shipping without chaos.',
    icon: 'tool',
    details:
      'Tools are only useful if they make teams calmer and more effective. I’m experienced in the tools teams already use to plan, build, review, and ship.',
    examples: [
      'Git & GitLab (branches, reviews, CI/CD)',
      'Docker for consistent local environments',
      'Confluence for living documentation and standards',
      'Jira for planning, tracking, and prioritization',
      'WordPress and Gutenberg tooling',
    ],
  },
  {
    id: 'wordcamp',
    title: 'Conference Speaker',
    description:
      'Share real-world lessons and patterns with the broader WordPress community.',
    icon: 'microphone',
    details:
      'Speaking is one way I give back. I focus on practical takeaways, honest lessons learned, and making technical topics feel approachable.',
    examples: [
      'Spoke on component systems and platform patterns',
      'Presented at WordCamp events for developer audiences',
      'Shared lessons from building and scaling shared platforms',
    ],
  },
];

// ============================================
// SKILLS (Optional, not the main focus)
// ============================================
export const skills = {
  languages: ['JavaScript (ES6+)', 'PHP', 'HTML', 'CSS', 'SCSS'],
  frameworks: ['React', 'Next.js', 'WordPress', 'Gutenberg'],
  tools: ['Git', 'GitLab', 'GitHub', 'Docker', 'Figma', 'Jira', 'Confluence'],
  practices: [
    'Agile',
    'Scrum',
    'Kanban',
    'CI/CD',
    'Code Review',
    'Accessibility (WCAG)',
    'Design Systems',
    'Component Architecture',
    'Cross-functional Collaboration',
  ],
};

// ============================================
// CATEGORIES FOR WORK SHOWCASE FILTER
// ============================================
export const workCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'aloha-platform', label: 'Aloha Platform' },
  { id: 'enterprise', label: 'Enterprise Sites' },
  { id: 'tools', label: 'Tools & Engineering' },
  { id: 'personal', label: 'Personal Projects' },
];
