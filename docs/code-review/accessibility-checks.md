# Accessibility Checks

Run this checklist to ensure the site meets WCAG 2.1 AA standards.

---

## Color Contrast

### WCAG Requirements

| Element | Minimum Ratio | Standard |
|---------|---------------|----------|
| Normal text | 4.5:1 | WCAG AA |
| Large text (18px+ bold or 24px+) | 3:1 | WCAG AA |
| UI components | 3:1 | WCAG AA |

### Check contrast

```bash
# Find all theme colors
rg "textPrimary|textSecondary|textMuted|accentStart" data/themes.ts
```

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Browser DevTools > Accessibility panel

- [ ] `textPrimary` on `bgPrimary` meets 4.5:1
- [ ] `textSecondary` on `bgPrimary` meets 4.5:1
- [ ] `textMuted` on `bgPrimary` meets 4.5:1
- [ ] `accentStart` on `bgPrimary` meets 4.5:1 (for text links)
- [ ] `accentStart` on `bgCard` meets 4.5:1

---

## Images & Media

### Alt text

```bash
# Find images without alt
rg "<img" --type tsx -A2 | grep -v "alt="

# Find Image components
rg "<Image" --type tsx -A3 | grep -v "alt="
```

- [ ] All `<img>` tags have `alt` attribute
- [ ] All `<Image>` components have `alt` attribute
- [ ] Decorative images have `alt=""` and `aria-hidden="true"`

### Check media.ts registry

```bash
# Verify all media items have alt text defined
rg "alt:" data/media.ts
```

- [ ] All non-decorative images have meaningful alt text
- [ ] Decorative images have `isDecorative: true`

---

## Keyboard Navigation

### Focus states

```bash
# Check for focus-visible usage
rg "focus-visible" --type css
rg "focus:" --type tsx
```

- [ ] All interactive elements have visible focus states
- [ ] Focus order follows logical reading order
- [ ] No keyboard traps (can tab through entire page)

### Interactive elements

```bash
# Find buttons without type
rg "<button" --type tsx | grep -v "type="
```

- [ ] All `<button>` elements have `type="button"` (unless submit)
- [ ] All links have descriptive text (not just "click here")
- [ ] Custom interactive elements have appropriate roles

### Test manually

1. Press `Tab` through the entire page
2. Verify all interactive elements are reachable
3. Verify focus indicator is visible
4. Press `Enter`/`Space` to activate buttons
5. Press `Escape` to close modals

- [ ] Can navigate entire site with keyboard only
- [ ] Modal traps focus correctly
- [ ] Theme picker is keyboard navigable

---

## Screen Reader

### ARIA labels

```bash
# Find aria-label usage
rg "aria-label" --type tsx

# Find elements that might need labels
rg "<button>" --type tsx | grep -v "aria-label"
```

- [ ] Icon-only buttons have `aria-label`
- [ ] Form inputs have associated labels
- [ ] Regions have appropriate landmarks

### Semantic HTML

```bash
# Check for semantic elements
rg "<main|<nav|<header|<footer|<section|<article" --type tsx -l
```

- [ ] Page has single `<main>` element
- [ ] Navigation uses `<nav>`
- [ ] Sections use `<section>` with headings
- [ ] Articles use `<article>`

### Heading hierarchy

```bash
# List all headings
rg "<h[1-6]" --type tsx
```

- [ ] Single `<h1>` per page
- [ ] Headings follow logical order (h1 > h2 > h3)
- [ ] No skipped heading levels

---

## Reduced Motion

### Check implementation

```bash
# Find reduced motion handling
rg "prefers-reduced-motion|useReducedMotion" --type tsx
```

- [ ] GSAP animations respect `prefers-reduced-motion`
- [ ] CSS animations have reduced motion alternatives
- [ ] Auto-playing content can be paused

### Test

1. Enable "Reduce motion" in OS settings
2. Reload the page
3. Verify animations are disabled or simplified

- [ ] No jarring animations when reduced motion is enabled
- [ ] Content is still accessible without animations

---

## Forms & Inputs

### Labels and errors

- [ ] All inputs have associated `<label>` elements
- [ ] Error messages are announced to screen readers
- [ ] Required fields are indicated

### Contact form

```bash
# Check contact form accessibility
rg -A10 "<form" components/Contact/
```

- [ ] Form has accessible name
- [ ] Submit button is clearly labeled
- [ ] Validation errors are accessible

---

## Testing Tools

### Automated

```bash
# Run axe-core in dev mode (if enabled)
npm run dev
# Open browser DevTools > axe DevTools panel
```

- [ ] No critical axe-core violations
- [ ] No serious axe-core violations

### Manual testing

1. **Screen reader**: Test with VoiceOver (Mac) or NVDA (Windows)
2. **Keyboard only**: Navigate without mouse
3. **Zoom**: Test at 200% zoom
4. **Color blind**: Use browser extension to simulate

- [ ] Site is usable with screen reader
- [ ] Site is usable with keyboard only
- [ ] Content reflows properly at 200% zoom

---

## Quick Audit Commands

```bash
# Find potential issues
echo "=== Images without alt ==="
rg "<img" --type tsx | grep -v "alt="

echo "=== Buttons without type ==="
rg "<button[^>]*>" --type tsx | grep -v "type="

echo "=== Missing aria-labels ==="
rg "onClick.*>" --type tsx | grep -v "aria-label" | head -10

echo "=== Heading structure ==="
rg "<h[1-6]" --type tsx -o | sort | uniq -c
```
