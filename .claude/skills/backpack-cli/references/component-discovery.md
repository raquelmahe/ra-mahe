# Component Discovery

Find and explore Backpack design system components using the `list-components` command.

## Command syntax

```bash
backpack-cli list-components [options]
backpack-cli ls [options]
```

## Options

| Flag | Description |
|------|-------------|
| `-c, --category <category>` | Filter by category (e.g., `layout`, `navigation`) |
| `-s, --status <status>` | Filter by status: `stable`, `beta`, or `deprecated` |
| `--sub` | Include sub-components in results |
| `--only-sub` | Show only sub-components |
| `-q, --search <query>` | Search by name, description, or tags (case-insensitive) |
| `-v, --verbose` | Show full metadata per component |
| `--json` | Output as JSON (best for programmatic use) |

## Categories

Components are organised into these categories:

`action`, `calendar`, `card`, `chip`, `data-display`, `feedback`, `form`, `layout`, `map`, `media`, `navigation`, `overlay`, `skeleton`, `utility`

## Examples

### Find components by keyword

```bash
backpack-cli ls --search button --json
# Matches against name, description, and tags
```

### Filter by category

```bash
backpack-cli ls --category navigation --json
```

### Find deprecated components

```bash
backpack-cli ls --status deprecated --json
```

### Include sub-components

By default, sub-components (e.g., `BpkAccordionItem`) are excluded. Include them with:

```bash
backpack-cli ls --search accordion --sub --json
```

Or show only sub-components:

```bash
backpack-cli ls --only-sub --json
```

### Combine filters

```bash
backpack-cli ls --category form --status stable --search input --json
```

## Output formats

- **Default**: ASCII table with name, category, and status columns, plus a summary count
- **`--verbose`**: Full metadata per component including package, import path, description, tags, and sub-components
- **`--json`**: Structured JSON array — preferred when processing results programmatically

## Tips

- Search is case-insensitive and matches against name, description, and tags
- Use `--json` output when you need to parse or filter results further
- If a component you expect is missing, run `backpack-cli update` to refresh the cache
