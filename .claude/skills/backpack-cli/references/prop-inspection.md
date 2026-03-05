# Prop Inspection

Inspect component props including types, defaults, required status, and descriptions.

## Command syntax

```bash
backpack-cli list-props [component] [options]
backpack-cli props [component] [options]
```

The optional `[component]` argument filters to a specific component. It supports partial matching — `Button` will match `BpkButton`.

## Options

| Flag | Description |
|------|-------------|
| `-q, --search <query>` | Search by component name or prop name |
| `--required` | Show only required props |
| `--optional` | Show only optional props |
| `-v, --verbose` | Show types, descriptions, defaults, and enum values |
| `--json` | Output as JSON (best for programmatic use) |

## Prop data model

Each prop includes:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Prop name (e.g., `onClick`) |
| `type` | string | TypeScript type (e.g., `() => void`, `'primary' \| 'secondary'`) |
| `required` | boolean | Whether the prop is required |
| `defaultValue` | string or null | Default value extracted from destructured parameters |
| `description` | string or null | Description from JSDoc comments |
| `enumValues` | string[] or null | Expanded values for string literal union types |

## Examples

### Get all props for a component

```bash
backpack-cli props BpkButton --json
```

### Get only required props

```bash
backpack-cli props BpkButton --required --json
```

This is useful for understanding the minimum set of props needed to render a component.

### Get only optional props

```bash
backpack-cli props BpkButton --optional --json
```

### Search for a prop across all components

```bash
backpack-cli props --search onClick --json
```

This finds all components that have a prop matching the search query.

### Verbose output with full details

```bash
backpack-cli props BpkButton --verbose
```

Shows prop signatures with type, required marker (`*`), default value, description, and expanded enum values.

## Tips

- Use `--required --json` to quickly determine what props are needed to render a component
- Use `--search` without a component name to find which components accept a specific prop
- Partial name matching works: `backpack-cli props Button` matches `BpkButton`
- Enum values are expanded for union types like `'primary' | 'secondary' | 'destructive'`
