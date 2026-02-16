# Code Cleanup Checklist

Run this checklist periodically to keep the codebase clean and efficient.

---

## Build & Lint

```bash
# Must pass with no errors
npm run build

# Check for lint warnings
npm run lint
```

- [ ] Build completes with no errors
- [ ] No ESLint warnings or errors

---

## Unused Code

### Check for unused imports

```bash
# Look for imports that might not be used
rg "^import" --type tsx -l | head -20
```

- [ ] No unused imports in components
- [ ] No unused imports in hooks
- [ ] No unused imports in data files

### Check for unused exports

**Files to check:**
- `data/media.ts` - Are all media items actually used?
- `data/svgSprite.ts` - Are all sprites rendered?
- `data/content.ts` - Are all exports consumed?

```bash
# Find exports
rg "^export (const|function|interface)" data/
```

- [ ] All exports in `data/` are actually imported somewhere

### Check for unused CSS styles

```bash
# Extract class names from globals.css and check if they're used
# Look for custom classes (not Tailwind)
rg "^\." app/globals.css | head -20

# Check if a specific class is used anywhere
rg "glow-text|clickable|nav-link" --type tsx
```

Common unused patterns to check:
- Utility classes in `globals.css` (e.g., `.glow-text`, `.clickable`)
- Library-specific styles (e.g., Swiper) when library isn't used
- Animation keyframes that aren't referenced

- [ ] No unused CSS classes in `globals.css`
- [ ] No styles for libraries that aren't installed

### Check for unused files

```bash
# List all data files
ls data/

# Check if each file is imported
rg "from '@/data/media'" --type tsx
rg "from '@/data/svgSprite'" --type tsx
```

- [ ] All files in `data/` are imported somewhere
- [ ] No orphaned component files

---

## Component Consistency

### Shared UI Components

All sections should use these shared components from `components/ui/`:

| Component | Purpose | Check |
|-----------|---------|-------|
| `Card` | Card containers | All cards use `<Card>` |
| `Button` | Buttons & filters | All buttons use `<Button>` |
| `SectionHeader` | Section headers | All sections use `<SectionHeader>` |
| `Modal` | Modal dialogs | All modals use `<Modal>` |

```bash
# Find raw card usage (should be minimal)
rg "className.*card" --type tsx

# Find raw button patterns that should use Button component
rg "<button" --type tsx -l
```

- [ ] No raw `className="card"` without using Card component
- [ ] Filter buttons use `<Button variant="filter">`
- [ ] All sections use `<SectionHeader>`

---

## Hardcoded Values

### Colors should use CSS variables

```bash
# Find hardcoded hex colors (excluding data files)
rg "#[0-9A-Fa-f]{3,6}" --type tsx -g "!data/*"
```

Allowed exceptions:
- Tailwind utilities for non-theme colors (e.g., `text-red-500` for errors)
- SVG inline colors in icons

- [ ] No hardcoded colors in components (use `var(--color-name)`)

### Magic numbers

```bash
# Find pixel values that might need CSS variables
rg "\d+px" --type css
```

- [ ] Spacing uses Tailwind utilities or CSS variables
- [ ] Font sizes use Tailwind or theme variables

---

## Code Quality

### Console statements

```bash
# Should be empty in production code
rg "console\.(log|warn|error)" --type tsx
```

- [ ] No `console.log` in production code
- [ ] `console.error` only in error handlers

### Commented-out code

```bash
# Look for large commented blocks
rg "^//.*{" --type tsx
```

- [ ] No large blocks of commented-out code
- [ ] Comments are documentation, not dead code

---

## Duplicate Patterns

### Check for repeated patterns

Look for these patterns that should be componentized:

1. **Section headers** - Should use `<SectionHeader>`
2. **Card layouts** - Should use `<Card>`
3. **Button groups** - Should use `<Button>`
4. **Tech chip lists** - Check for repeated chip styling

```bash
# Find potential duplicates
rg "text-sm uppercase tracking" --type tsx -l
```

- [ ] No duplicated UI patterns across components

---

## Performance

### Image optimization

- [ ] All images in `public/` are optimized
- [ ] Large images use Next.js `<Image>` component
- [ ] Decorative images have `aria-hidden="true"`

### Bundle size

```bash
# Check build output size
npm run build
# Look at the route sizes in output
```

- [ ] No unexpectedly large chunks
- [ ] Heavy libraries are dynamically imported

---

## Summary Commands

Run all at once:

```bash
# Full check
npm run build && npm run lint

# Quick grep checks
echo "=== Hardcoded colors ===" && rg "#[0-9A-Fa-f]{6}" --type tsx -g "!data/*" | head -10
echo "=== Console logs ===" && rg "console\.log" --type tsx
echo "=== Raw card classes ===" && rg 'className="[^"]*card[^"]*"' --type tsx -g "!ui/*" | head -10
```
