# Theme Options

Quick reference for all theme customization options in `data/themes.ts`.

## Available Themes

### Professional (3)

| Theme | Emoji | Light/Dark | Card Style | Text Stroke | Description |
|-------|-------|------------|------------|-------------|-------------|
| The Gazette | 📰 | Light | flat | none | Typewriter, ink, editorial |
| Warm | ☀️ | Light | flat | none | Cozy vintage warmth |
| Midnight Luxe | 🥂 | Dark | glow | none | Black-tie, gold foil |

### Creative (5)

| Theme | Emoji | Light/Dark | Card Style | Text Stroke | Description |
|-------|-------|------------|------------|-------------|-------------|
| Rainbow | 🖍️ | Light | flat | none | Vibrant crayons |
| Southern Roots | 🌾 | Light | glow | none | Warm, grounded, heritage |
| Code Gremlin | 👾 | Dark | flat | none | 2000s hacker terminal |
| Daisy Dusk | 🌼 | Dark | glow | none | Moody florals |
| Emo Phase | 🖤 | Dark | neon | none | High contrast chaos |

---

## Card Styles

| Style | Visual Effect | Best For |
|-------|---------------|----------|
| `flat` | Strong border, no shadow, scale on hover | Editorial, clean, minimal |
| `glow` | Ambient colored glow aura | Luxe, elegant, dramatic |
| `neon` | Bright neon glow + inset shadow | Cyberpunk, bold, futuristic |
| `comic` | Offset shadow, thick border | Playful, retro, fun |

---

## Optional Effects

### Text Stroke

Adds outlined text effect to headings.

| Value | Effect |
|-------|--------|
| `none` | No stroke (default) |
| `subtle` | Thin outline (0.5px heading, 0.25px body) |
| `bold` | Thick outline (1.5px heading, 0.5px body) |

**Usage in theme:**
```typescript
textStroke: 'bold',
```

### Shadow Color

Custom color for comic-style shadows (only applies when `cardStyle: 'comic'`).

**Usage in theme:**
```typescript
cardStyle: 'comic',
shadowColor: '#FF00CE', // Hot pink shadows!
```

---

## Color Properties

| Property | Description | Example |
|----------|-------------|---------|
| `accentStart` | Primary accent (gradient start) | `'#E8B4B8'` |
| `accentEnd` | Secondary accent (gradient end) | `'#D4A574'` |
| `bgPrimary` | Main background | `'#FDF8F6'` |
| `bgSecondary` | Alternate sections | `'#FFF5F3'` |
| `bgTertiary` | Tertiary elements | `'#FFEAE6'` |
| `bgCard` | Card backgrounds | `'rgba(255, 245, 243, 0.9)'` |
| `textPrimary` | Main text | `'#4A3728'` |
| `textSecondary` | Secondary text | `'#7D6B5D'` |
| `textMuted` | Muted/subtle text | `'#A99585'` |
| `borderSubtle` | Border color | `'rgba(232, 180, 184, 0.3)'` |

---

## Typography

| Property | Description | Example |
|----------|-------------|---------|
| `fontDisplay` | Headings font | `'var(--font-cormorant), serif'` |
| `fontBody` | Body text font | `'var(--font-quicksand), sans-serif'` |

**Available fonts:** See `app/layout.tsx` for loaded Google Fonts.

---

## Other Properties

| Property | Type | Description |
|----------|------|-------------|
| `isDark` | boolean | Light or dark theme |
| `borderRadius` | string | Card corner rounding (e.g., `'1.25rem'`) |
| `category` | `'professional'` \| `'creative'` | Theme picker grouping |
