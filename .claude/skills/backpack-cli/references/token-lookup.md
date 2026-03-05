# Token Lookup

Browse and look up Backpack design system tokens — colors, spacing, typography, breakpoints, borders, shadows, animations, and more.

## Commands

### `list-tokens` — browse and search tokens

```bash
backpack-cli list-tokens [name] [options]
backpack-cli tokens [name] [options]
```

### `token` — quick single-token lookup

```bash
backpack-cli token <name> [options]
backpack-cli t <name> [options]
```

## Options (list-tokens)

| Flag | Description |
|------|-------------|
| `[name]` | Optional positional argument to search by name |
| `-c, --category <category>` | Filter by category (e.g., `spacings`, `colors`, `typesettings`) |
| `-t, --type <type>` | Filter by type (e.g., `color`, `size`, `duration`) |
| `-q, --search <query>` | Search by name, value, or category |
| `--private` | Include private/internal tokens (excluded by default) |
| `--only-private` | Show only private tokens |
| `--categories` | List all available categories with token counts |
| `-v, --verbose` | Show detailed output with JS/SCSS import paths |
| `--json` | Output as JSON (best for programmatic use) |

## Options (token)

| Flag | Description |
|------|-------------|
| `<name>` | Token name in any format: JS (`canvasDay`), SCSS (`$bpk-canvas-day`), raw (`CANVAS_DAY`), or partial |
| `--format <format>` | Output format: `js`, `scss`, or `value` |
| `--json` | Output as JSON |

## Token data model

Each token includes:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Raw UPPER_SNAKE_CASE name (e.g., `CANVAS_DAY`) |
| `value` | string | Resolved value (e.g., `rgb(255, 255, 255)`) |
| `type` | string | Token type: `color`, `size`, `duration`, `font-size`, etc. |
| `category` | string | Token category (e.g., `canvas-colors`, `spacings`) |
| `isPrivate` | boolean | True for internal tokens (PRIVATE_ prefix) |
| `isNight` | boolean | True for night-mode tokens |
| `deprecated` | boolean | True for deprecated tokens |
| `formats.js` | string | camelCase JS name (e.g., `canvasDay`) |
| `formats.scss` | string | SCSS usage (e.g., `tokens.$bpk-canvas-day` or `tokens.bpk-spacing-lg()`) |
| `formats.scssIsFunction` | boolean | True for spacing tokens that use SCSS function syntax |
| `pairedWith` | string? | Name of the day/night counterpart (when both exist) |

## SCSS usage patterns

Tokens are consumed via `@use` with a namespace:

```scss
@use '@skyscanner/backpack-web/bpk-mixins/tokens' as tokens;
```

**Variables** — most tokens (colors, typography, borders, etc.):
```scss
background-color: tokens.$bpk-canvas-day;
color: tokens.$bpk-text-primary-day;
border-radius: tokens.$bpk-border-radius-sm;
```

**Functions** — spacing scale tokens only:
```scss
margin-top: tokens.bpk-spacing-lg();
padding: tokens.bpk-spacing-base();
gap: tokens.bpk-spacing-sm();
```

## JS usage

```javascript
import { canvasDay, spacingLg } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
```

## Examples

### Look up a single token

```bash
backpack-cli token canvasDay
# Output:
# canvasDay
#   Value:  rgb(255, 255, 255)
#   JS:     import { canvasDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
#   SCSS:   tokens.$bpk-canvas-day
#           @use '@skyscanner/backpack-web/bpk-mixins/tokens' as tokens;
#   Pair:   canvasNight = rgb(1, 9, 19)
```

### Look up by SCSS name

```bash
backpack-cli token '$bpk-spacing-lg'
```

### Get just the value (for scripting)

```bash
backpack-cli token spacingLg --format value
# Output: 1.5rem
```

### Browse spacing tokens with full details

```bash
backpack-cli tokens --category spacings --verbose
```

### List all color tokens as JSON

```bash
backpack-cli tokens --type color --json
```

### List available categories

```bash
backpack-cli tokens --categories
```

### Search for tokens by value

```bash
backpack-cli tokens --search "rgb(0, 98, 227)"
```

## Important notes

- **`--categories` counts include private tokens**: `backpack-cli tokens --categories` shows a count for every category, but some categories (e.g. `badge-colors`) only contain private tokens. Running `--category badge-colors --json` returns `[]` unless you also pass `--private`. Don't assume a category has usable tokens just because the count is non-zero.
- **Spacing JS imports are inaccurate**: The `token` command claims `spacingBase`, `spacingLg` etc. have a JS import path (`import { spacingBase } from '...'`), but these named exports do not exist in the installed package — only `spacingNone` and `spacingIconText` are individually exported. The spacing scale tokens are SCSS-function–only. Use their raw `value` field directly (e.g. `'1rem'` for `spacingBase`, `'1.5rem'` for `spacingLg`).
- **Day-only by default**: Only day-mode tokens are shown. Night tokens are filtered out.
- **Private tokens hidden by default**: Use `--private` to include them or `--only-private` to see only them. A warning is displayed reminding you that private tokens should never be used directly — only as reference for finding a suitable public replacement.
- **Deprecated tokens**: Marked with `[DEPRECATED]` in output. Avoid using these in new code.
- **Flexible name matching**: The `token` command accepts names in any format (JS camelCase, SCSS $bpk-kebab-case, raw UPPER_SNAKE_CASE, or partial matches).

## Categories reference

Key categories for common use cases:

| Category | What it contains |
|----------|-----------------|
| `spacings` | Spacing scale (sm, md, base, lg, xl, xxl, xxxl, xxxxl) |
| `canvas-colors` | Background canvas colors |
| `surface-colors` | Surface/container colors |
| `text-colors` | Text and label colors |
| `core-colors` | Brand accent and primary colors |
| `status-colors` | Success, danger, warning colors |
| `line-colors` | Border and divider colors |
| `typesettings` | Font sizes, line heights |
| `font-weights` | Font weight values |
| `radii` | Border radius values |
| `borders` | Border size values |
| `box-shadows` | Shadow definitions |
| `breakpoints` | Responsive breakpoint values and media queries |
| `animations` | Duration values |
| `z-indices` | Z-index stacking values |
