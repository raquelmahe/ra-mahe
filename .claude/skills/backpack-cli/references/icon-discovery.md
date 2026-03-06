# Icon Discovery

Browse Backpack design system icons with import paths and usage examples.

## Command syntax

```bash
backpack-cli list-icons [options]
backpack-cli icons [options]
```

## Options

| Flag | Description |
|------|-------------|
| `-s, --size <size>` | Filter by size: `sm`, `lg`, or `xxxl` |
| `-q, --search <query>` | Search by icon name (case-insensitive) |
| `-v, --verbose` | Show all sizes, import paths, and usage example |
| `--json` | Output as JSON (best for programmatic use) |

## Icon data model

Each icon includes:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Kebab-case icon name (e.g., `flight`, `arrow-left`) |
| `sizes` | string[] | Available sizes: `sm`, `lg`, `xxxl` |
| `importPaths` | Record<string, string> | Import path keyed by size |
| `sourcePaths` | Record<string, string> | Source file path keyed by size |

## Examples

### Search icons by name

```bash
backpack-cli icons --search flight --json
```

### Filter by size

```bash
backpack-cli icons --size sm --json
```

### Get import paths and usage examples

```bash
backpack-cli icons --search flight --json
```

Verbose output shows all available sizes with their import paths, plus a ready-to-use import statement:

```
flight
  Sizes: sm, lg
  Import (sm): @skyscanner/backpack-web/bpk-component-icon/sm/flight
  Import (lg): @skyscanner/backpack-web/bpk-component-icon/lg/flight
  Usage:  import BpkSmFlight from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';
```

### List all icons as JSON

```bash
backpack-cli icons --json
```

## Output formats

- **Default**: ASCII table with name, sizes, and default import path columns, plus a summary count
- **`--verbose`**: Full metadata per icon including all size-specific import paths and a usage example
- **`--json`**: Structured JSON array — preferred when processing results programmatically

## Tips

- Search is case-insensitive and matches against the icon name
- Use `--size sm` to see only icons available in a specific size
- Use `--verbose` to get ready-to-use import statements
- If icons are missing, run `backpack-cli update` to refresh the cache (this requires building the Backpack repo)
