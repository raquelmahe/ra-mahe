---
name: backpack-build
description: Reference for building UIs with Skyscanner's Backpack design system. Use when implementing pages, features, or components. Covers component selection, layout, tokens, icons, typography, accessibility, and anti-patterns.
---

# Building with Backpack

You are building a UI using Skyscanner's Backpack design system (`@skyscanner/backpack-web`). Use Backpack components and tokens exclusively. Do not write custom CSS classes or inline styles unless no Backpack equivalent exists.

## Core principle

If a Backpack component exists for the job, use it. A card is `BpkCard`, a price is `BpkPrice`, a heading is `BpkText`, a button is `BpkButton`, layout spacing is `BpkStack`. Never re-implement what the system already provides.

## Setup

Wrap the application root in `BpkProvider` exactly once, as high as possible. All layout components require it.

```tsx
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';

function App() {
  return (
    <BpkProvider>
      <AppRouter />
    </BpkProvider>
  );
}
```

## Quick component lookup

| Need | Component | Import from |
|------|-----------|-------------|
| Layout / spacing | `BpkStack`, `BpkFlex`, `BpkGrid` | `bpk-component-layout` |
| Text / headings | `BpkText` | `bpk-component-text` |
| Button | `BpkButton` | `bpk-component-button` |
| Card | `BpkCard` | `bpk-component-card` |
| Form inputs | `BpkInput`, `BpkSelect`, `BpkCheckbox`, `BpkFieldset` | various `bpk-component-*` |
| Modal / dialog | `BpkModal`, `BpkDialog` | `bpk-component-modal`, `bpk-component-dialog` |
| Alert banner | `BpkInfoBanner` | `bpk-component-info-banner` |
| Price display | `BpkPrice` | `bpk-component-price` |
| Icons | `sm/*` / `lg/*` | `bpk-component-icon` |
| Chips / filters | `BpkSelectableChip`, `BpkDismissibleChip` | `bpk-component-chip` |

All imports prefixed with `@skyscanner/backpack-web/`.

## Deprecated components — do not use

| Deprecated | Use instead |
|-----------|-------------|
| `BpkBannerAlert` | `BpkInfoBanner` |
| `BpkTicket` | `BpkCard` |

## Anti-patterns

| Don't | Do |
|-------|-----|
| `<div style={{ padding: '16px' }}>` | `<BpkBox padding="base">` |
| `<h2 className="my-heading">` | `<BpkText textStyle="heading-3" tagName="h2">` |
| `<button className="btn">` | `<BpkButton type="primary">` |
| `<span style={{ color: '#0062E3' }}>` | `<BpkText color="textHero">` |
| Custom CSS flex/grid | `<BpkStack>`, `<BpkFlex>`, `<BpkGrid>` |
| `@media` queries in CSS | Responsive props: `direction={{ base: 'column', md: 'row' }}` |
| Hard-coded color values | Semantic tokens: `textPrimaryDay`, `canvasDay` |
| `<input placeholder="Email">` only | `<BpkFieldset label="Email"><BpkInput /></BpkFieldset>` |
| Centering body text | Left-align body text. Center only hero headings. |

## Prop inspection

```bash
backpack-cli props BpkComponentName --verbose   # component props
backpack-cli ls --search "query"                # find components
backpack-cli icons --search "icon-name"         # find icons
backpack-cli token tokenName                    # token value
```

## Detailed references

* **Layout** — [references/layout.md](references/layout.md)
* **Typography & text color** — [references/typography.md](references/typography.md)
* **Components** — [references/components.md](references/components.md)
* **Design tokens** — [references/tokens.md](references/tokens.md)
* **Icons** — [references/icons.md](references/icons.md)
* **Accessibility** — [references/accessibility.md](references/accessibility.md)
