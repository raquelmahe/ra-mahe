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

# Look up colour / spacing tokens
backpack-cli tokens --category colors --json
backpack-cli tokens --category spacings --json
```

If `backpack-cli` is not installed:
```bash
npm install -g @skyscanner/backpack-cli
backpack-cli update
```

## Step 4 — Generate the prototype files

Create exactly two files:

### `src/projects/<slug>/meta.json`
```json
{
  "slug": "<slug>",
  "title": "<title>",
  "description": "<description>",
  "createdAt": "<ISO timestamp>"
}
```

### `src/projects/<slug>/index.jsx`

A **self-contained** React component. Rules:

- **Always** wrap the root in `BpkProvider`:
  ```jsx
  import BpkProvider from '@skyscanner/backpack-web/bpk-component-provider';
  ```
- Import Backpack components discovered in Step 3, e.g.:
  ```jsx
  import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
  ```
- Use realistic placeholder data — no external API calls, no props required
- Scope any custom styles to a co-located CSS module (`<slug>.module.css`) or inline styles
- Make it look polished and representative of Skyscanner's visual language

**Minimal template:**
```jsx
import BpkProvider from '@skyscanner/backpack-web/bpk-component-provider';

export default function MyIdea() {
  return (
    <BpkProvider>
      {/* prototype here */}
    </BpkProvider>
  );
}
```

## Step 6 — Confirm

Tell the user:

> ✓ **"<title>"** is ready at `/p/<slug>`.
>
> Run `npm run dev` if the dev server isn't already running, then open that URL to see your prototype.
> The home page at `/` will list all your ideas.
