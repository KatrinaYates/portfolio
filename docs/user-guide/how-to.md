# How-To Guide

Step-by-step guides for common customization tasks.

---

## Add a New Theme

1. **Open** `data/themes.ts`

2. **Add theme ID** to the `ThemeId` type:
   ```typescript
   export type ThemeId =
     | 'newspaper'
     | 'retro'
     // ... existing themes
     | 'mytheme';  // Add yours here
   ```

3. **Create the theme object:**
   ```typescript
   const mytheme: Theme = {
     id: 'mytheme',
     name: 'My Theme',
     description: 'Short description',
     emoji: '✨',
     category: 'creative',  // or 'professional'

     // Colors
     accentStart: '#FF6B6B',
     accentEnd: '#4ECDC4',
     bgPrimary: '#FFFFFF',
     bgSecondary: '#F8F9FA',
     bgTertiary: '#E9ECEF',
     bgCard: 'rgba(255, 255, 255, 0.95)',
     textPrimary: '#212529',
     textSecondary: '#495057',
     textMuted: '#6C757D',
     borderSubtle: 'rgba(0, 0, 0, 0.1)',

     // Typography
     fontDisplay: 'var(--font-inter), sans-serif',
     fontBody: 'var(--font-inter), sans-serif',

     // Style
     isDark: false,
     borderRadius: '1rem',
     cardStyle: 'glow',

     // Optional effects
     // textStroke: 'subtle',
     // shadowColor: '#000000',
   };
   ```

4. **Add to themes array:**
   ```typescript
   export const themes: Theme[] = [
     // ... existing themes
     mytheme,
   ];
   ```

5. **Test** by running `npm run dev` and selecting your theme from the picker.

---

## Change the Default Theme

1. **Open** `data/themes.ts`

2. **Find** the `DEFAULT_THEME_ID` constant at the bottom:
   ```typescript
   export const DEFAULT_THEME_ID: ThemeId = 'warm';
   ```

3. **Change** to your preferred theme ID:
   ```typescript
   export const DEFAULT_THEME_ID: ThemeId = 'midnight';
   ```

---

## Customize Theme Colors

1. **Open** `data/themes.ts`

2. **Find** the theme you want to modify

3. **Edit** the color values:
   ```typescript
   accentStart: '#NEW_COLOR',  // Primary accent
   accentEnd: '#NEW_COLOR',    // Secondary accent
   bgPrimary: '#NEW_COLOR',    // Main background
   // etc.
   ```

**Tips:**
- Use WCAG contrast checker for accessibility
- `accentStart` is used for most accent text and gradients
- `bgCard` can include transparency: `'rgba(255, 255, 255, 0.9)'`

---

## Add Work Showcase Items

1. **Open** `data/content.ts`

2. **Find** the `workShowcase` array

3. **Add a new item:**
   ```typescript
   {
     id: 'my-project',
     title: 'Project Name',
     category: 'disney-experiences',  // Must match existing category
     role: 'Lead Developer',
     stack: ['React', 'TypeScript', 'SCSS'],
     whatIOwned: 'Description of your contributions...',
     image: '/work/my-project.png',
     links: [
       { label: 'Live Site', url: 'https://example.com' },
       { label: 'Case Study', url: '#' },
     ],
   },
   ```

4. **Add screenshot** to `public/work/` (recommended: 1200x800px)

---

## Add New Fonts

1. **Open** `app/layout.tsx`

2. **Import** from `next/font/google`:
   ```typescript
   import { MyFont } from 'next/font/google';

   const myFont = MyFont({
     subsets: ['latin'],
     variable: '--font-myfont',
     display: 'swap',
   });
   ```

3. **Add** to the body className:
   ```typescript
   <body className={`${myFont.variable} ...`}>
   ```

4. **Use in theme:**
   ```typescript
   fontDisplay: 'var(--font-myfont), sans-serif',
   ```

---

## Add Leadership Items

1. **Open** `data/content.ts`

2. **Find** the `leadershipItems` array

3. **Add a new item:**
   ```typescript
   {
     id: 'my-skill',
     title: 'Skill Title',
     description: 'Brief description shown on card',
     icon: 'code',  // code, document, users, book, microphone
     details: 'Longer description shown in modal',
     examples: [
       'Specific example 1',
       'Specific example 2',
     ],
     links: [
       { label: 'Learn More', url: 'https://example.com' },
     ],
   },
   ```

---

## Modify Personal Info

1. **Open** `data/content.ts`

2. **Edit** the `personalInfo` object:
   ```typescript
   export const personalInfo = {
     name: 'Your Name',
     title: 'Your Title',
     subtitle: 'Your Specialty',
     tagline: 'Your tagline',
     intro: 'Your introduction paragraph.',
     email: 'your@email.com',
     phone: '(555) 123-4567',
     linkedin: 'https://linkedin.com/in/yourprofile',
     location: 'City, State',
   };
   ```
