# Layout Components

Backpack layout components are CSS-property-based primitives for building responsive layouts. They differ from semantic components (like `BpkButton` or `BpkDatepicker`) in that most of their props map directly to CSS properties, wrapped in `BpkResponsiveValue` for breakpoint-aware values.

All layout components share a common set of spacing, sizing, and positioning props. This reference focuses on the semantic differences between components and when to use each one.

## Overview

| Component | Purpose | Key props |
|-----------|---------|-----------|
| `BpkStack` | Stack children vertically or horizontally with gap | `direction`, `align`, `justify`, `gap` |
| `BpkFlex` | Flexbox container with shorthand props | `direction`, `align`, `justify`, `wrap`, `gap` |
| `BpkGrid` | CSS Grid container | `templateColumns`, `templateRows`, `gap`, `autoFlow` |
| `BpkGridItem` | Child of `BpkGrid` for grid placement | `colSpan`, `rowSpan`, `area` |
| `BpkBox` | Low-level primitive — accepts all CSS layout props | Any CSS layout property |
| `BpkVessel` | Polymorphic element wrapper | `as` (element type) |
| `BpkProvider` | Required root wrapper | `children` |

All are imported from `@skyscanner/backpack-web/bpk-component-layout`.

## When to use which

- **Stacking items with spacing** -> `BpkStack` (simplest API, covers 80% of layouts)
- **Flex layouts needing wrap, grow, shrink** -> `BpkFlex`
- **Grid-based layouts** -> `BpkGrid` + `BpkGridItem`
- **One-off CSS property overrides** -> `BpkBox`
- **Rendering as a different HTML element** -> `BpkVessel`

Prefer `BpkStack` over `BpkFlex` when you just need to arrange items in a row or column with spacing. Use `BpkFlex` when you need control over wrapping, grow/shrink, or individual item alignment.

## BpkProvider (required)

`BpkProvider` must wrap your application root. All layout components depend on it.

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

Rules:
- Use exactly once, as high as possible in the tree
- Never nest multiple `BpkProvider` instances

## BpkStack

The most common layout component. Arranges children in a row or column with consistent spacing.

```tsx
import { BpkStack } from '@skyscanner/backpack-web/bpk-component-layout';

// Vertical stack with base spacing
<BpkStack direction="column" gap="base">
  <Header />
  <Content />
  <Footer />
</BpkStack>

// Horizontal row
<BpkStack direction="row" gap="md" align="center">
  <Icon />
  <Label />
</BpkStack>

// Responsive direction
<BpkStack direction={{ base: 'column', md: 'row' }} gap="lg">
  <Sidebar />
  <Main />
</BpkStack>
```

**Semantic props:** `direction`, `align`, `justify`, `wrap`
**Also accepts:** All flex, grid, spacing, sizing, and positioning props (55 total).

## BpkFlex

Flexbox container with shorthand prop names. Use when you need more control than `BpkStack` provides.

```tsx
import { BpkFlex } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkFlex direction="row" wrap="wrap" justify="space-between" gap="md">
  <Card />
  <Card />
  <Card />
</BpkFlex>

// Inline flex
<BpkFlex inline direction="row" align="center" gap="sm">
  <Icon />
  <Text />
</BpkFlex>
```

**Semantic props:** `direction`, `align`, `justify`, `wrap`, `grow`, `shrink`, `basis`, `inline`

## BpkGrid + BpkGridItem

CSS Grid layout for two-dimensional positioning.

```tsx
import { BpkGrid, BpkGridItem } from '@skyscanner/backpack-web/bpk-component-layout';

// Three-column layout
<BpkGrid templateColumns="1fr 2fr 1fr" gap="lg">
  <BpkGridItem>Sidebar</BpkGridItem>
  <BpkGridItem>Main</BpkGridItem>
  <BpkGridItem>Aside</BpkGridItem>
</BpkGrid>

// Responsive grid
<BpkGrid
  templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }}
  gap="base"
>
  <BpkGridItem colSpan={{ base: 1, lg: 2 }}>Wide item</BpkGridItem>
  <BpkGridItem>Regular item</BpkGridItem>
</BpkGrid>
```

**BpkGrid props:** `templateColumns`, `templateRows`, `autoColumns`, `autoFlow`, `autoRows`, `column`, `row`, `columnGap`, `rowGap`, `align`, `justify`, `inline`

**BpkGridItem props:** `area`, `colSpan`, `colStart`, `colEnd`, `rowSpan`, `rowStart`, `rowEnd`

## BpkBox

Low-level primitive that exposes all CSS layout properties. Use sparingly — prefer `BpkStack`, `BpkFlex`, or `BpkGrid` when their APIs suffice.

```tsx
import { BpkBox } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkBox
  padding="base"
  marginBottom="lg"
  display="flex"
  alignItems="center"
  justifyContent="space-between"
>
  <Left />
  <Right />
</BpkBox>
```

BpkBox accepts 56 props covering flex, grid, spacing, sizing, and positioning. It uses the full CSS property names (`flexDirection`, `alignItems`, `gridTemplateColumns`) rather than the shorthand names used by `BpkFlex` and `BpkGrid`.

## Responsive values

All layout props accept `BpkResponsiveValue`, which enables breakpoint-based values:

```tsx
// Single value (all breakpoints)
<BpkStack gap="md" />

// Responsive object
<BpkStack gap={{ base: 'sm', md: 'base', lg: 'xl' }} />
```

Breakpoints: `base` (mobile-first default), `sm`, `md`, `lg`, `xl`.

## Spacing tokens

Spacing props (`margin*`, `padding*`, `gap`) accept `BpkSpacingValue` tokens:

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | No spacing |
| `sm` | 0.25rem (4px) | Tight spacing |
| `md` | 0.5rem (8px) | Compact spacing |
| `base` | 1rem (16px) | Default spacing |
| `lg` | 1.5rem (24px) | Comfortable spacing |
| `xl` | 2rem (32px) | Generous spacing |
| `xxl` | 2.5rem (40px) | Large spacing |
| `xxxl` | 4rem (64px) | Section spacing |
| `xxxxl` | 6rem (96px) | Page-level spacing |

These map to the Backpack spacing design tokens. Use token names (not raw values) to stay consistent with the design system.

## Shared prop groups

Layout components share props across these categories. Understanding the groups helps navigate the large prop counts.

### Spacing (19 props)
`margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`, `marginStart`, `marginEnd`, `marginInline`, `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`, `paddingStart`, `paddingEnd`, `paddingInline`, `gap`, `columnGap`, `rowGap`

Type: `BpkResponsiveValue<BpkSpacingValue>`

Shared by: BpkBox, BpkStack, BpkFlex, BpkGrid, BpkGridItem

### Sizing (6 props)
`width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`

Type: `BpkResponsiveValue<BpkSizeValue>`

Shared by: BpkBox, BpkStack, BpkFlex, BpkGrid, BpkGridItem

### Positioning (4–5 props)
`top`, `bottom`, `left`, `right`, `order` (BpkBox and BpkStack only)

Type: `BpkResponsiveValue<BpkPositionValue>`

Shared by: BpkBox, BpkStack, BpkFlex, BpkGrid, BpkGridItem

## Tips

- Look up available spacing and sizing tokens with `backpack-cli tokens --category spacings --json`
- Inspect all props for a layout component with `backpack-cli props BpkStack --json`
- Find layout components with `backpack-cli ls --category layout --json`
- Most layout props are optional. Start with the semantic props (`direction`, `gap`, `align`) and add spacing/sizing only as needed.
