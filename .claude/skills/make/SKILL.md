---
name: make
description: Generate a new Skyscanner app prototype from a plain-English description. Creates an isolated React component at /p/<slug> using the Backpack design system. Use this when a product designer wants to prototype an idea quickly inside this repo.
---

# Skyscanner Make

You are Claude Code helping a Skyscanner product designer turn an idea into a working prototype.

## Step 1 — Gather the idea

Ask the user exactly this:

> **Describe your idea.** What should this prototype do or show? (One or two sentences is enough.)

Wait for their answer before continuing.

## Step 2 — Derive metadata

From the description, determine:

| Field | Rules |
|---|---|
| **title** | Short, human-readable name — e.g. `Flight Search Results` |
| **slug** | URL-safe version: lowercase, hyphens, no special chars — e.g. `flight-search-results` |
| **description** | The user's original sentence, lightly tidied |
| **createdAt** | Current ISO 8601 timestamp |

## Step 3 — Discover Backpack components & tokens

Use `backpack-cli` to understand what's available before you generate anything. Run the commands most relevant to the idea:

```bash
# Find components that match the idea
backpack-cli ls --search "<relevant term>" --json

# Inspect the props of a candidate component
backpack-cli props <ComponentName> --verbose --json

# Find icons
backpack-cli icons --search "<icon term>" --json

# Look up colour tokens — note down the JS names (camelCase) for use in Step 4
backpack-cli tokens --category canvas-colors --json
backpack-cli tokens --category surface-colors --json
backpack-cli tokens --category text-colors --json
backpack-cli tokens --category core-colors --json
backpack-cli tokens --category line-colors --json

# Look up spacing tokens
backpack-cli tokens --category spacings --json
```

If `backpack-cli` is not installed:
```bash
npm install -g @skyscanner/backpack-cli
backpack-cli update
```

## Step 4 — Generate the prototype files

### File structure

Every prototype follows this layout:

```
src/projects/<slug>/
  meta.json                  ← project metadata
  index.tsx                  ← BpkProvider + mock data + page composition
  components/
    <ComponentName>.tsx      ← isolated, presentational sub-components
```

**When to split into `components/`:** Extract a component when it renders a repeated item (card, row, tile) or a meaningful distinct section (header, filter bar, summary panel). Simple one-off wrappers can stay inline in `index.tsx`.

---

### `src/projects/<slug>/meta.json`
```json
{
  "slug": "<slug>",
  "title": "<title>",
  "description": "<description>",
  "createdAt": "<ISO timestamp>"
}
```

---

### `src/projects/<slug>/index.tsx`

Owns three things only:
1. `BpkProvider` at the root
2. Mock data — a typed interface + named `const` near the top, clearly visible and easy to edit
3. Page composition — imports and assembles the sub-components

```tsx
import { BpkProvider, BpkVStack, BpkSpacing } from '@skyscanner/backpack-web/bpk-component-layout';
import { canvasContrastDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
import ExampleCard from './components/ExampleCard';

interface Item {
  id: string;
  title: string;
  // ...other fields
}

const MOCK_ITEMS: Item[] = [
  { id: '1', title: 'Item one' },
  { id: '2', title: 'Item two' },
];

export default function MyIdea() {
  return (
    <BpkProvider>
      <div style={{ backgroundColor: canvasContrastDay, minHeight: '100vh', padding: '1.5rem' }}>
        <BpkVStack gap={BpkSpacing.Base}>
          {MOCK_ITEMS.map((item) => (
            <ExampleCard key={item.id} {...item} />
          ))}
        </BpkVStack>
      </div>
    </BpkProvider>
  );
}
```

---

### `src/projects/<slug>/components/<ComponentName>.tsx`

Each component file is **presentational** — it receives typed props and renders UI. No data imports, no BpkProvider.

```tsx
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import { surfaceDefaultDay, lineDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

interface ExampleCardProps {
  title: string;
  subtitle: string;
  price: number;
}

export default function ExampleCard({ title, subtitle, price }: ExampleCardProps) {
  return (
    <div style={{ backgroundColor: surfaceDefaultDay, borderRadius: '0.75rem', border: `1px solid ${lineDay}`, padding: '1.25rem 1.5rem' }}>
      <BpkText tagName="h2" textStyle="heading-4">{title}</BpkText>
      <BpkText tagName="p" textStyle="body-default" color="text-secondary">{subtitle}</BpkText>
    </div>
  );
}
```

---

## Component best practices

Follow these rules in every generated prototype:

### 1. Presentational components accept explicit, named props
Bad: `<FlightCard data={f} />`
Good: `<FlightCard airline={f.airline} price={f.price} isHighlighted={f.highlighted} />`

### 2. Mock data is a named const at the top of index.tsx
Keep it visible and easy to edit. Use `ALL_CAPS` naming:
```tsx
const MOCK_FLIGHTS: Flight[] = [ ... ];
const MOCK_HOTELS: Hotel[] = [ ... ];
```

### 3. UI interaction state lives locally
State for open/closed panels, selected tabs, active filters, etc. can live inside the component that owns that interaction — not in `index.jsx`. Keep `index.jsx` free of `useState` if possible.

### 4. No prop drilling beyond one level
If a piece of data needs to travel more than one component deep, restructure the mock data or co-locate the state.

### 5. One concern per file
A card component should render a card. It shouldn't also contain page-level grid layout or data fetching logic.

### 6. Colours always from tokens
Never use raw hex (`#rrggbb`) or `rgb()` values. Always import from `@skyscanner/bpk-foundations-web/tokens/base.es6`:
```jsx
import { canvasDay, textPrimaryDay, corePrimaryDay, surfaceDefaultDay, lineDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
```

### 7. BpkText `color` prop
Use the `color` prop for semantic text colours. Accepted values:
`'text-primary'` `'text-secondary'` `'text-error'` `'text-hero'` `'text-link'` `'text-on-dark'` `'text-on-light'` `'text-primary-inverse'` `'text-disabled'` `'text-disabled-on-dark'`

**Mapping common token imports to their semantic `color` value:**
- `textPrimaryDay` → `color="text-primary"`
- `textSecondaryDay` → `color="text-secondary"`
- `textOnDarkDay` → `color="text-on-dark"`
- `textOnLightDay` → `color="text-on-light"`

```tsx
// Wrong — use the prop, not inline style, for semantic values
<BpkText style={{ color: textSecondaryDay }}>...</BpkText>
<BpkText style={{ color: textOnDarkDay }}>...</BpkText>

// Right
<BpkText color="text-secondary">...</BpkText>
<BpkText color="text-on-dark">...</BpkText>
```

When you need a colour not in the semantic list (e.g. `coreAccentDay`), `style={{ color }}` is acceptable — `BpkText` forwards `...rest` to the DOM:
```tsx
<BpkText tagName="span" textStyle="heading-4" style={{ color: coreAccentDay }}>£2,400</BpkText>
```

When you need **`opacity` alongside a semantic colour** (e.g. a dimmed on-dark label), inline style for both is acceptable since `color` prop doesn't control opacity:
```tsx
// Acceptable — opacity requires style; color is also in style for co-location
<BpkText tagName="span" textStyle="body-default" style={{ color: textOnDarkDay, opacity: 0.75 }}>
  Summer 2026 · 2 adults
</BpkText>
```

### 8. Layout component `style` / `className` rules
- **`BpkVStack`, `BpkHStack`, `BpkBox`** — do not accept `style` or `className` (stripped). Use `BpkBox` for padding/margin.
- **`BpkFlex`** — forwards `...props` to the DOM, so `style` technically works, but avoid it; use explicit props (`direction`, `justify`, `align`, `wrap`) instead.
- For backgrounds, borders, or `borderRadius` on a container, wrap a `<div style={{ ... }}>` **around** the layout component:

```tsx
// Wrong — style on BpkVStack is stripped
<BpkVStack gap={BpkSpacing.Base} style={{ backgroundColor: surfaceDefaultDay }}>

// Right — plain div wrapper carries visual styles
<div style={{ backgroundColor: surfaceDefaultDay, borderRadius: '0.75rem' }}>
  <BpkVStack gap={BpkSpacing.Base}>
    ...
  </BpkVStack>
</div>
```

### 9. Spacing: use BpkSpacing constants on layout components — not raw values on divs
`BpkSpacing` constants are token strings processed by the Backpack layout system. They work **only** as props on `BpkVStack`, `BpkHStack`, `BpkFlex`, `BpkBox` — they cannot be used in `style={{ padding }}` on a plain `<div>`.

**Gap rule:** replace `<div style={{ gap }}>` with `BpkVStack` or `BpkHStack`. When no constant exactly matches, use the nearest one.

```tsx
// Wrong — raw gap on a plain div
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
<div style={{ display: 'flex', gap: '0.375rem' }}>

// Right — use the nearest BpkSpacing constant
<BpkVStack gap={BpkSpacing.Base}>
<BpkHStack gap={BpkSpacing.SM}>
```

**Padding rule:** `BpkBox` accepts only a **single** (symmetric) padding value. For symmetric padding, always use `BpkBox`. For **asymmetric** padding (different H/V sides), a plain `<div style={{ padding }}>` is acceptable — but use the rule, don't just default to divs.

```tsx
// Wrong — use BpkBox when padding is the same on all sides
<div style={{ padding: '1rem' }}>

// Right
<BpkBox padding={BpkSpacing.Base}>

// Acceptable — BpkBox can't express asymmetric padding
<div style={{ padding: '2rem 1rem' }}>
```

**Page structure containers** (`maxWidth`, `margin: 0 auto`) are always plain `<div>` — Backpack layout components don't handle page centering. These padding values on centering wrappers are acceptable.

**Other acceptable raw `style` values:** `fontSize`, `borderRadius`, `boxShadow`, icon `width`/`height`, `height: '1px'` dividers, `opacity`, `letterSpacing`, `textTransform`.

**BpkSpacing scale:**

| Constant | Value |
|---|---|
| `BpkSpacing.None` | `0` |
| `BpkSpacing.XS` | `2px` |
| `BpkSpacing.SM` | `4px` |
| `BpkSpacing.MD` | `8px` |
| `BpkSpacing.Base` | `16px` |
| `BpkSpacing.LG` | `24px` |
| `BpkSpacing.XL` | `32px` |
| `BpkSpacing.XXL` | `40px` |

### 10. BpkFlex uses `justify` not `justifyContent`
```tsx
// Wrong
<BpkFlex justifyContent="space-between">

// Right
<BpkFlex justify="space-between">
```

### 11. Every component file has a Props interface
```tsx
interface ExampleCardProps {
  title: string;
  subtitle: string;
  price: number;
}

export default function ExampleCard({ title, subtitle, price }: ExampleCardProps) { ... }
```

### 12. Mock data arrays have typed interfaces in index.tsx
```tsx
interface Hotel { id: string; name: string; pricePerNight: number; }
const MOCK_HOTELS: Hotel[] = [ ... ]
```

For badge types, derive from Backpack's `BADGE_TYPES` constant rather than using `string`:
```tsx
import { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
type BadgeType = (typeof BADGE_TYPES)[keyof typeof BADGE_TYPES];
```

### 13. useState is always typed explicitly
```tsx
// Wrong
useState(new Set())

// Right
useState<Set<string>>(new Set())
```

---

## Backpack component import patterns

Backpack packages (`@skyscanner/backpack-web`, `@skyscanner/bpk-foundations-web`) ship their own TypeScript definitions — no `@types/*` packages needed.

```tsx
// Default exports (most components)
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import BpkBadge from '@skyscanner/backpack-web/bpk-component-badge';
import BpkModal from '@skyscanner/backpack-web/bpk-component-modal';
import BpkRating from '@skyscanner/backpack-web/bpk-component-rating';

// Named constants alongside default export — use type prop with BUTTON_TYPES enum values:
// 'primary' (default) | 'featured' | 'secondary' | 'secondary-on-dark'
// | 'destructive' | 'link' | 'link-on-dark' | 'primary-on-dark' | 'primary-on-light'
// NOTE: featured and secondary are type values, NOT boolean props
// Wrong: <BpkButton featured secondary>  Right: <BpkButton type={BUTTON_TYPES.featured}>
import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
import BpkRating, { RATING_SIZES, RATING_SCALES } from '@skyscanner/backpack-web/bpk-component-rating';

// Named-only exports (no default)
import { BpkProvider, BpkFlex, BpkStack, BpkHStack, BpkVStack, BpkBox, BpkSpacing } from '@skyscanner/backpack-web/bpk-component-layout';
import { BpkSpinner, SPINNER_TYPES } from '@skyscanner/backpack-web/bpk-component-spinner';

// Chips
import BpkSelectableChip, { BpkDismissibleChip, BpkDropdownChip, BpkIconChip, CHIP_TYPES } from '@skyscanner/backpack-web/bpk-component-chip';

// BpkText textStyle values
// 'hero-1'..'hero-6', 'heading-1'..'heading-5', 'subheading',
// 'body-default', 'body-longform', 'label-1'..'label-3', 'caption', 'footnote'

// BpkText color values
// 'text-primary', 'text-secondary', 'text-error', 'text-success',
// 'text-hero', 'text-link', 'text-on-dark', 'text-on-light',
// 'text-primary-inverse', 'text-disabled', 'text-disabled-on-dark'
```

---

## Step 5 — Test & verify conformance

After writing the files, run these checks and fix any issues before continuing:

```bash
# 1. Type check — must return no errors
npx tsc --noEmit

# 2. Lint for deprecated or non-Backpack colour tokens
backpack-cli lint --path src/projects/<slug> --format json

# 3. Spot-check props for each Backpack component you used
backpack-cli props <ComponentName> --json
```

**What to look for and fix:**
- Any raw hex (`#rrggbb`) or `rgb()` values — replace with token imports from `@skyscanner/bpk-foundations-web/tokens/base.es6`
- `style={{ color: ... }}` on a `BpkText` element — replace with the `color` prop
- `justifyContent` on `BpkFlex` — must be `justify`
- `gap`, `padding`, or `margin` as strings on layout components — must use `BpkSpacing` constants
- `style` or `className` on any layout component — move to a wrapping `<div>`
- Any prop that doesn't appear in the `backpack-cli props` output for that component
- Lint output with `[DEPRECATED]` findings — swap for the suggested replacement token
- TypeScript errors from `tsc --noEmit` — missing `Props` interface, untyped `useState`, `any` types

If lint returns findings, fix them and re-run until it returns `[]`. If `tsc --noEmit` has errors, fix them before confirming.

### Visual review — required before thumbnail

Navigate to `http://localhost:5173/p/<slug>`, take a screenshot, and check:

- **No overlapping text** — all labels, prices, and headings are fully visible
- **No truncation** — long strings (station names, hotel names, descriptions) fit their containers
- **Layout proportions** — rows/columns are balanced; nothing is cramped or stretched
- **All cards render** — every item in the mock data list is visible
- **Interactive states** — highlighted/selected variants look visually distinct

If anything looks broken, fix the component layout and re-check before continuing. Do not proceed to Step 6 with a broken layout.

---

## Step 6 — Capture thumbnail

Run the thumbnail capture script so the home page gallery shows a preview screenshot:

```bash
node scripts/capture-thumb.js <slug>
```

This requires the dev server to be running (`npm run dev`). The script saves `public/thumbs/<slug>.png` and the gallery card will automatically show it.

## Step 7 — Confirm

Tell the user:

> ✓ **"<title>"** is ready at `/p/<slug>`.
>
> Run `npm run dev` if the dev server isn't already running, then open that URL to see your prototype.
> The home page at `/` will list all your ideas.
