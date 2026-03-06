# Lint: Scan for Deprecated Color Tokens

Scan source files for deprecated Backpack color token usage and get perceptually-similar replacement suggestions.

## Command

```bash
backpack-cli lint [options]
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--path <dir>` | Directory to scan | Current working directory |
| `--format <format>` | Output format: `text` or `json` | `text` |
| `--max-suggestions <n>` | Max replacement suggestions per finding | `3` |
| `--threshold <0..1>` | Min confidence to show a suggestion | `0` |
| `--rules <rules>` | Comma-separated rules to enable | `deprecated-color-tokens` |

## How it works

1. Loads the token registry and filters to deprecated color day-tokens
2. Builds a combined regex matching all deprecated token names in JS (`coreEcoDay`), SCSS (`$bpk-core-eco-day`), and CSS custom property (`--bpk-core-eco-day`) formats
3. Recursively walks the target directory, skipping `node_modules`, `dist`, `build`, `.git`, `.next`, `coverage`, and `.gitignore` entries
4. Scans `.ts`, `.tsx`, `.js`, `.jsx`, `.scss`, `.css`, `.less` files line-by-line
5. For each match, computes replacement suggestions using OKLab perceptual color distance
6. Considers both day AND night mode values when scoring paired tokens
7. Sets `process.exitCode = 1` if any findings are detected (CI-friendly)

## Replacement scoring

Suggestions are ranked by perceptual similarity in OKLab color space:

- **Paired tokens** (day/night): Default score (when `deltaD >= 0.02`) = `0.4 * dayDistance + 0.4 * nightDistance + 0.2 * behaviorPenalty`
- **Static tokens** (same value day/night, `deltaD < 0.02`): Behavior penalty weight increases to 0.6 and color weights drop to 0.2, so score = `0.2 * dayDistance + 0.2 * nightDistance + 0.6 * behaviorPenalty`
- **Unpaired tokens** (legacy, no `_DAY`/`_NIGHT` suffix): Scored by day value only
- **Confidence**: `1 - clamp(score / 1.4, 0, 1)` — higher is better

Candidates are filtered to non-deprecated, non-private, non-night, color tokens only.

## Text output format

```
src/components/Banner.tsx
  3:12  warning  'coreEcoDay' is deprecated
    Suggestions:
      1. coreAccentDay (confidence: 0.72) - closest match in both modes
      2. statusSuccessSpotDay (confidence: 0.45) - good day match, check night mode

src/styles/banner.scss
  5:10  warning  '$bpk-core-eco-day' is deprecated
    ...

✖ 4 problem(s) found
```

## JSON output format

```json
[
  {
    "rule": "deprecated-color-tokens",
    "filePath": "src/components/Banner.tsx",
    "line": 3,
    "column": 12,
    "lineText": "  return <div style={{ color: coreEcoDay }}>Hello</div>;",
    "deprecatedToken": "coreEcoDay",
    "suggestions": [
      {
        "token": "statusSuccessSpotDay",
        "distance": 0.1234,
        "confidence": 0.9117,
        "dayDistance": 0.0987,
        "nightDistance": 0.1481,
        "note": "closest match in both modes"
      }
    ]
  }
]
```

## Examples

### Scan current project

```bash
backpack-cli lint --format json
```

### Scan a specific directory

```bash
backpack-cli lint --path src/components --format json
```

### Get JSON output for CI/automation

```bash
backpack-cli lint --format json
```

### Limit to high-confidence suggestions only

```bash
backpack-cli lint --threshold 0.5 --max-suggestions 1 --format json
```

### Use in CI pipeline

```bash
# Fails with exit code 1 if deprecated tokens are found
backpack-cli lint --path src --format json
```

## Manual replacements

Define manual token replacement mappings in `artifacts/lint-replacements.json`:

```json
{
  "version": "1.0.0",
  "generatedAt": "2025-01-01T00:00:00Z",
  "replacements": {
    "CORE_ECO_DAY": "STATUS_SUCCESS_SPOT_DAY",
    "OLD_GREEN": "CORE_ACCENT_DAY"
  }
}
```

Keys are deprecated token raw names (UPPER_SNAKE_CASE), values are replacement token raw names. When a manual mapping exists for a deprecated token, it **fully replaces** auto-generated suggestions — only the manual replacement is shown with confidence 1.0. Tokens without manual mappings still get OKLab-based auto-suggestions.

In text output, manual replacements display as: `→ statusSuccessSpotDay (manual replacement)`

In JSON output, manual suggestions include `"manual": true`.

## Important notes

- **Exit code**: Returns exit code 1 when findings are detected — suitable for CI checks
- **Manual replacements**: Define in `artifacts/lint-replacements.json` to override auto-suggestions for specific tokens
- **Night mode awareness**: Replacement suggestions account for how tokens change between day and night modes, not just day values
- **Caching**: Replacement scores are cached per deprecated token, so scanning large codebases with repeated token usage is efficient
- **No auto-fix**: The `--fix` option is not yet available. Review suggestions and apply changes manually.
- **Color tokens only**: Currently limited to the `deprecated-color-tokens` rule. Other token types (spacing, typography) are not scanned.
