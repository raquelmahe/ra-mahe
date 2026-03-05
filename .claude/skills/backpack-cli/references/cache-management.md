# Cache Management

The Backpack CLI works with a local cache of component metadata and prop types. The `update` command refreshes this cache from the Backpack repository.

## Command syntax

```bash
backpack-cli update [options]
```

## Options

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview changes without writing files |

## How it works

The update command:

1. Clones the Backpack repository (`@skyscanner/backpack`) into a temporary directory
2. Scans for component files matching `Bpk*.{tsx,ts,jsx,js}` in `packages/bpk-component-*/src/`
3. Extracts component metadata: name, package, import path, source path, sub-components, deprecation status
4. Uses the TypeScript Compiler API to extract prop types, defaults, descriptions, and enum values
5. Writes the results to `artifacts/components.json` and `artifacts/props.json`
6. Cleans up the temporary clone

Hand-authored metadata (description, category, tags) is preserved across regeneration cycles.

## When to update

- A component you expect is not found in search results
- Prop information seems outdated or incomplete
- You know the Backpack repository has been updated recently
- After initial installation of the CLI

## Artifacts

The cache consists of two JSON files bundled with the CLI:

| File | Contents |
|------|----------|
| `artifacts/components.json` | Component registry with names, packages, paths, categories, status, and tags |
| `artifacts/props.json` | Prop registry with types, defaults, required status, descriptions, and enum values |

## Examples

### Update the cache

```bash
backpack-cli update
```

### Preview without writing

```bash
backpack-cli update --dry-run
```

## Notes

- The update requires network access to clone the Backpack repository via SSH
- The process may take a minute depending on network speed
- Existing hand-authored metadata (descriptions, categories, tags) is preserved
