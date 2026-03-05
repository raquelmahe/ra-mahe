---
name: backpack-cli
description: Explores Skyscanner Backpack design system components, inspects their props, browses icons, looks up design tokens, scans for deprecated token usage, and manages the local component registry. Use when the user needs to find Backpack components, check component props, types, defaults, browse icons, look up design tokens (colors, spacing, typography, etc.), scan for deprecated tokens, or update the local component cache.
allowed-tools: Bash(backpack-cli:*)
---

# Backpack Design System CLI

## Quick start

```bash
# Find components by name
backpack-cli ls --search button
# Inspect a component's props
backpack-cli props BpkButton --verbose
# Browse icons
backpack-cli icons --search flight --verbose
# Look up a design token
backpack-cli token canvasDay
# Browse tokens by category
backpack-cli tokens --category spacings --verbose
# Scan for deprecated token usage
backpack-cli lint --path src
# Update the local cache from the Backpack repository
backpack-cli update
```

## Commands

| Command | Alias | Purpose |
|---------|-------|---------|
| `backpack-cli list-components` | `ls` | Find components by name, category, status, or tags |
| `backpack-cli list-props` | `props` | Inspect component props with types, defaults, descriptions |
| `backpack-cli list-icons` | `icons` | Browse icons with import paths and usage examples |
| `backpack-cli list-tokens` | `tokens` | Browse design tokens (colors, spacing, typography, etc.) |
| `backpack-cli token` | `t` | Quick single-token lookup with JS/SCSS usage |
| `backpack-cli lint` | — | Scan source files for deprecated color token usage with replacement suggestions |
| `backpack-cli update` | — | Refresh the local component/props/icons cache from the Backpack repo |
| `backpack-cli install --skills` | — | Install Claude skills into the current project |

## Workflow

When a user asks about Backpack components, follow this sequence:

1. **Search** — Find matching components with `backpack-cli ls --search "<query>" --json`
2. **Inspect** — Get prop details with `backpack-cli props <ComponentName> --verbose --json`
3. **Icons** — Find icons with `backpack-cli icons --search "<query>" --json`
4. **Tokens** — Look up design tokens with `backpack-cli token <name>` or browse with `backpack-cli tokens --category <cat> --json`
5. **Lint** — Scan for deprecated tokens with `backpack-cli lint --path <dir> --format json`
6. **Update** — If data seems stale or a component/icon is missing, suggest `backpack-cli update`

Prefer `--json` output when processing results programmatically.

## Component discovery

```bash
# Search by name, description, or tags
backpack-cli ls --search button --json
# Filter by category
backpack-cli ls --category navigation --json
# Filter by status
backpack-cli ls --status deprecated --json
# Include sub-components
backpack-cli ls --search accordion --sub --json
# Show only sub-components
backpack-cli ls --only-sub --json
# Verbose table output
backpack-cli ls --search card --verbose
```

**Categories**: action, calendar, card, chip, data-display, feedback, form, layout, map, media, navigation, overlay, skeleton, utility

**Statuses**: stable, beta, deprecated

## Prop inspection

```bash
# All props for a component
backpack-cli props BpkButton --json
# Only required props
backpack-cli props BpkButton --required --json
# Only optional props
backpack-cli props BpkButton --optional --json
# Search across all components for a prop name
backpack-cli props --search onClick --json
# Verbose output with types, descriptions, and enum values
backpack-cli props BpkButton --verbose
```

Each prop includes: `name`, `type`, `required`, `defaultValue`, `description`, `enumValues`.

## Icon discovery

```bash
# Search icons by name
backpack-cli icons --search flight --json
# Filter by size
backpack-cli icons --size sm --json
# Verbose output with import paths and usage examples
backpack-cli icons --search arrow --verbose
# List all icons
backpack-cli icons --json
```

Each icon includes: `name`, `sizes` (sm, lg, xxxl), `importPaths` (keyed by size), `sourcePaths` (keyed by size).

## Token lookup

```bash
# Quick single-token lookup (accepts JS, SCSS, or raw name)
backpack-cli token canvasDay
backpack-cli token $bpk-canvas-day
backpack-cli token CANVAS_DAY
# Get just the value (for scripting)
backpack-cli token spacingLg --format value
# Get the JS import statement
backpack-cli token canvasDay --format js
# Get the SCSS usage
backpack-cli token canvasDay --format scss
```

## Token browsing

```bash
# Browse all public day-mode tokens
backpack-cli tokens --json
# Filter by category
backpack-cli tokens --category spacings --verbose
# Filter by type
backpack-cli tokens --type color --json
# Search by name or value
backpack-cli tokens --search elevation --json
# List available categories
backpack-cli tokens --categories
# Include private tokens (shows warning)
backpack-cli tokens --private --json
# Show only private tokens
backpack-cli tokens --only-private --json
```

Each token includes: `name`, `value`, `type`, `category`, `isPrivate`, `isNight`, `deprecated`, `formats` (js, scss, scssIsFunction), `pairedWith`.

**Important**: Private tokens (prefixed `PRIVATE_`) are internal implementation details — never use them directly. They exist only as reference for finding suitable public replacements. Deprecated tokens are marked with `[DEPRECATED]`.

**SCSS usage**: Spacing tokens use function syntax (`tokens.bpk-spacing-lg()`), all other tokens use variable syntax (`tokens.$bpk-canvas-day`). Both require `@use '@skyscanner/backpack-web/bpk-mixins/tokens' as tokens;`.

**Token categories**: animations, borders, box-shadows, breakpoints, buttons, calendar, canvas-colors, cards, colors, core-colors, flare, font-weights, forms, icons, letter-spacings, line-colors, modals, notifications, overlay-colors, panels, radii, scrim-colors, spacings, status-colors, surface-colors, text-colors, typesettings, z-indices (and more component-specific categories).

## Lint for deprecated tokens

```bash
# Scan current directory for deprecated color tokens
backpack-cli lint
# Scan a specific directory
backpack-cli lint --path src/components
# JSON output for CI/automation
backpack-cli lint --format json
# Limit suggestions and filter by confidence
backpack-cli lint --max-suggestions 1 --threshold 0.5
```

The lint command detects deprecated color tokens in JS/TS/SCSS/CSS/LESS files and suggests perceptually-similar replacements using OKLab color distance. It considers both day and night mode values when scoring paired tokens. Returns exit code 1 when findings are detected (CI-friendly). Manual replacements can be defined in `artifacts/lint-replacements.json` to override auto-suggestions for specific tokens.

## Cache management

```bash
# Update the local component and props cache
backpack-cli update
# Preview what would change without writing
backpack-cli update --dry-run
```

The update command clones the Backpack repository and the backpack-foundations repository, extracts component metadata, prop types, icon files, and design tokens, and regenerates the local cache.

## BpkProvider

`BpkProvider` must wrap the top-level component in your application. Use it exactly once, as high as possible in the component tree. All Backpack layout components (e.g., `BpkPageContainer`, `BpkGridContainer`, `BpkGridRow`, `BpkGridColumn`) require `BpkProvider` to be present above them. Do not nest multiple `BpkProvider` instances — a single root-level wrapper is correct.

```tsx
import BpkProvider from '@skyscanner/backpack-web/bpk-component-provider';

function App() {
  return (
    <BpkProvider>
      <AppRouter />
    </BpkProvider>
  );
}
```

## Common tasks

| Task | Command |
|------|---------|
| Find all button components | `backpack-cli ls --search button --json` |
| What props does BpkButton accept? | `backpack-cli props BpkButton --json` |
| Show deprecated components | `backpack-cli ls --status deprecated --json` |
| List layout components | `backpack-cli ls --category layout --json` |
| Find required props for a component | `backpack-cli props BpkButton --required --json` |
| Search for a prop across components | `backpack-cli props --search className --json` |
| Find an icon by name | `backpack-cli icons --search flight --json` |
| List small icons only | `backpack-cli icons --size sm --json` |
| Get icon import path and usage | `backpack-cli icons --search flight --verbose` |
| Look up a token value and usage | `backpack-cli token canvasDay` |
| Browse spacing tokens | `backpack-cli tokens --category spacings --verbose` |
| List all color tokens | `backpack-cli tokens --type color --json` |
| Get a token's SCSS usage | `backpack-cli token spacingLg --format scss` |
| List token categories | `backpack-cli tokens --categories` |
| Scan for deprecated tokens | `backpack-cli lint --path src --format json` |
| Get replacement suggestions | `backpack-cli lint --path src --max-suggestions 3` |
| CI lint check | `backpack-cli lint --format json` |
| Update stale cache | `backpack-cli update` |

## Specific tasks

* **Layout components** [references/layout.md](references/layout.md)
* **Component discovery** [references/component-discovery.md](references/component-discovery.md)
* **Prop inspection** [references/prop-inspection.md](references/prop-inspection.md)
* **Icon discovery** [references/icon-discovery.md](references/icon-discovery.md)
* **Token lookup** [references/token-lookup.md](references/token-lookup.md)
* **Lint deprecated tokens** [references/lint-deprecated-tokens.md](references/lint-deprecated-tokens.md)
* **Cache management** [references/cache-management.md](references/cache-management.md)
