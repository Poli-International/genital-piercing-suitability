# Genital Piercing Anatomy Suitability Checker - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

The Genital Piercing Anatomy Suitability Checker is a dependency-free static web application built with plain HTML, CSS, and vanilla JavaScript. There is no build step, no framework, no bundler, and no runtime package dependency. Everything runs client-side in the browser.

- **Markup:** HTML5 (`index.html`), with `data-i18n` and `data-i18n-attr` attributes driving runtime translation.
- **Styling:** A single external stylesheet referenced as `css/style.css`.
- **Scripts:** Three synchronous scripts loaded in document order: `js/i18n.js`, `js/diagrams.js`, `js/app.js`.
- **Storage:** Browser `localStorage` (single key, see [Security](#security)).
- **Networking:** None. The tool sends no data over the network.

### File Structure

Based on the source file headers provided:

```
/
├── index.html                 # Main application shell (UI, controls, mounts)
├── css/
│   └── style.css              # All visual styling (incl. print styles)
├── js/
│   ├── i18n.js                # Translation dictionaries + language switching
│   ├── diagrams.js            # Inline SVG anatomical cross-section diagrams
│   └── app.js                 # Placement data, filtering, worksheet, print logic
├── documentation.html         # English documentation page
├── documentation-de.html      # German documentation page
├── documentation-es.html      # Spanish documentation page
├── documentation-fr.html      # French documentation page
├── documentation-it.html      # Italian documentation page
├── documentation-nl.html      # Dutch documentation page
└── documentation-pt.html      # Portuguese documentation page
```

The seven documentation pages are static, self-contained HTML files (each with inline `<style>`), and are marked `noindex, nofollow`. Each carries a language navigation bar linking to the other six.

### Component / Logic Breakdown

`index.html` defines the static shell and mount points; the JavaScript modules populate them.

**Shell regions in `index.html`:**

| Element ID | Purpose |
|---|---|
| `top-bar` | Language switcher bar |
| `language-select` | `<select>` populated by `i18n.js` |
| `tool-header` | Badge, title, tagline |
| `age-banner` | 18+ / consent notice |
| `search-card` | Search field + anatomy filter + placement selector |
| `placement-search` | Free-text search input |
| `clear-search-btn` | Clears the search filter |
| `anatomy-filter` | Category `<select>` (all / female / male / neutral) |
| `placement-select` | Placement `<select>` (populated by `app.js`) |
| `placement-card-container` | `<main>` mount for the active placement reference card |
| `worksheet-section` | "Is It Right for Me?" consultation worksheet |
| `talking-points-mount` | Mount for generated talking points |
| `client-notes-area` | `<textarea>` for private notes |
| `save-notes-checkbox` | Opt-in localStorage persistence |
| `clear-notes-btn` | Clears notes and storage |
| `print-sheet-btn` | Triggers print |
| `shared-reasons-container` | Mount for the shared refusal-reasons section |
| `printable-consultation-sheet` | Hidden `print-only` container rendered on demand |

**Logic modules:**

- **`i18n.js`** owns the language dictionaries and the `language-select` control. It translates every element carrying `data-i18n` (text) and `data-i18n-attr` (attributes such as `placeholder` and `aria-label`) without a page reload.
- **`diagrams.js`** provides the neutral, non-explicit vector cross-section diagrams rendered per placement.
- **`app.js`** holds the placement dataset, wires the search/filter/select controls, renders the active placement card, generates the consultation talking points, manages the notes field and its optional persistence, and builds the printable sheet.

### Iframe / Theme Handling

An inline script in `<head>` detects embedding:

```js
if (window.self !== window.top) {
  document.documentElement.setAttribute('data-theme', 'dark');
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'poli-theme') {
      document.documentElement.setAttribute('data-theme', e.data.light ? 'light' : 'dark');
    }
  });
}
```

When embedded, the tool defaults to the dark theme and listens for a `postMessage` event of type `poli-theme` carrying a `light` boolean, switching the `data-theme` attribute accordingly. The documentation pages apply the analogous `in-iframe` body class to hide the hero heading when framed.

---

## Data Schemas

The tool is data-driven. The following structures are defined in the JavaScript modules.

### Placement Record

Each of the 14 placements is a record rendered into the active placement card. The card exposes the following labelled sections (field names as surfaced in the UI and documentation):

| Field | Description | Example |
|---|---|---|
| `name` | Placement name | `"VCH (Vertical Clitoral Hood)"` |
| `commonName` | Colloquial / searchable alias | `"clit hood"` |
| `anatomyCategory` | One of `female`, `male`, `neutral` | `"female"` |
| `requiredAnatomy` | Anatomical requirement + rationale | Hood depth sufficient for a barbell without pressing the glans |
| `inPersonAssessment` | What the piercer physically checks | Cotton-swab test under the hood |
| `refusalReasons` | Placement-specific reasons a studio declines | Insufficient hood depth |
| `healingTime` | Typical healing duration | e.g. 4 to 8 weeks |
| `startingJewellery` | First-placement jewellery spec | e.g. 12g / 10g minimum for PA |
| `talkingPoints` | Four key questions for the piercer | Array of four strings |
| `diagram` | Key into the `diagrams.js` SVG set | Cross-section vector |

### Anatomy Filter Options

The `anatomy-filter` `<select>` defines four fixed option values:

| `value` | Label (EN) | Meaning |
|---|---|---|
| `all` | All placements (14) | No category filter |
| `female` | Female anatomy placements | Female-category records |
| `male` | Male anatomy placements | Male-category records |
| `neutral` | Shared / perineal placements | Shared-category records |

### Shared Refusal Reasons

The `shared-reasons-container` renders a fixed set of five general clinical refusal causes:

1. Insufficient tissue depth
2. Immediate proximity to nerve bundles
3. High-friction / pressure points
4. Pre-existing scar tissue
5. Active skin irritation

### Notes Persistence

| Item | Value |
|---|---|
| Storage key | `poli_genital_suitability_notes` |
| Storage type | `localStorage` |
| Default state | Not persisted (in-memory only) |
| Opt-in control | `save-notes-checkbox` |

### Printable Sheet Contents

The generated print sheet (rendered into `printable-consultation-sheet`) contains only:

- The selected placement name
- The four consultation talking points
- The user's entered notes

---

## Calculation / Logic Algorithms

There are no numeric formulas in this tool. The "logic" is filtering, rendering, and persistence. The following describes the real behaviours.

### 1. Search Filtering

The `placement-search` input filters the placement set by matching the typed term against placement names and common aliases (e.g. `VCH`, `clit hood`, `PA`, `guiche`). Matching is performed as the user types (`autocomplete="off"`). The `clear-search-btn` resets the term and restores the full list.

### 2. Anatomy Category Filtering

The `anatomy-filter` value is combined with the search term. Selecting `all` shows all 14; `female`, `male`, or `neutral` restrict the visible set to that category. The `placement-select` dropdown is populated from the currently visible set.

### 3. Active Placement Rendering

When a placement is chosen (via `placement-select` or by search), `app.js` renders its card into `placement-card-container` (`aria-live="polite"`, so screen readers announce the change). The card presents the required-anatomy section, the in-person assessment section, the refusal reasons, healing time, starting jewellery, and the four talking points. A diagram toggle ("Show schematic diagram" / "Hide schematic diagram") reveals or hides the SVG from `diagrams.js`.

### 4. Talking Points Generation

`app.js` builds the consultation talking points into `talking-points-mount`, combining the two fixed worksheet prompts (comfort with in-person assessment; time and activity flexibility for healing) with the selected placement's four key questions.

### 5. Notes Persistence Logic

- If `save-notes-checkbox` is unchecked, text in `client-notes-area` lives only in the tab's memory and is lost on close or refresh.
- If checked, the text is written to `localStorage` under `poli_genital_suitability_notes`.
- `clear-notes-btn` empties the textarea and removes the storage key immediately.

### 6. Print Sheet Generation

`print-sheet-btn` renders the summary into `printable-consultation-sheet` and invokes the browser print flow. Print-specific CSS hides navigation, language controls, search fields, and buttons, producing a grayscale A4/Letter-friendly document. The user can print to paper or "Save as PDF".

---

## API Reference

The tool exposes no public JavaScript API and no network endpoints. Its "interface" is the DOM controls and the documented behaviours below.

### DOM Handlers (as wired in `index.html` / `app.js`)

| Handler / Control | Type | Behaviour |
|---|---|---|
| `language-select` | `change` | Switches UI language via `i18n.js`; re-translates all `data-i18n` / `data-i18n-attr` nodes without reload |
| `placement-search` | `input` | Filters placements by name / common alias |
| `clear-search-btn` | `click` | Clears the search term and restores all placements |
| `anatomy-filter` | `change` | Restricts visible placements to `all` / `female` / `male` / `neutral` |
| `placement-select` | `change` | Loads the selected placement's reference card |
| `save-notes-checkbox` | `change` | Enables/disables `localStorage` persistence of notes |
| `clear-notes-btn` | `click` | Empties the notes textarea and deletes the storage key |
| `print-sheet-btn` | `click` | Builds the printable consultation sheet and opens the print dialog |

### `postMessage` Interface (iframe embedding)

| Message | Direction | Payload | Effect |
|---|---|---|---|
| `poli-theme` | Parent → tool | `{ type: "poli-theme", light: boolean }` | Sets `data-theme` to `light` when `light` is true, otherwise `dark` |

### Storage Interface

| Key | Read/Write | Value |
|---|---|---|
| `poli_genital_suitability_notes` | Read/Write/Delete | Raw notes text (only when opt-in checkbox is checked) |

---

## Integration Guide

### Standalone

Open the live URL directly:

```
https://poliinternational.com/genital-piercing-suitability/
```

No installation, server, or build step is required. The tool is fully static and dependency-free.

### Iframe Embedding

Embed the tool in any page with a standard iframe:

```html
<iframe
  src="https://poliinternational.com/tools/genital-piercing-suitability/"
  title="Genital Piercing Anatomy Suitability Checker"
  width="100%"
  height="900"
  loading="lazy"
></iframe>
```

When framed, the tool automatically applies the dark theme and responds to theme messages from the parent:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: false }, '*');
```

Send `light: true` to switch the embedded tool to the light theme.

### Notes on Embedding

- The tool is self-contained; no external CDN assets are required.
- The documentation pages detect framing and add an `in-iframe` class to suppress the hero heading, so they can be embedded alongside the tool.

---

## Customization

- **Language:** The UI language is user-selectable at runtime (English, French, Italian, German, Spanish, Dutch, Portuguese). Translation strings live in `js/i18n.js` and are applied via `data-i18n` and `data-i18n-attr` attributes.
- **Placement data:** Placement records, categories, refusal reasons, and talking points are defined in `js/app.js`. Editing the dataset updates the search index, the `placement-select` options, and the rendered cards.
- **Diagrams:** The neutral cross-section SVGs live in `js/diagrams.js` and are keyed per placement.
- **Styling:** All visual styling, including print rules, is centralized in `css/style.css`.

---

## Performance

- **Zero network requests at runtime:** No fonts, scripts, or data are fetched after load; all assets are local.
- **Synchronous, ordered scripts:** `i18n.js`, `diagrams.js`, and `app.js` load in document order, so there is no async race between translation, diagrams, and app logic.
- **Client-side filtering:** Search and category filtering operate on an in-memory dataset of 14 placements, so interaction is effectively instantaneous.
- **Lazy iframe loading:** The integration example uses `loading="lazy"` to defer off-screen embedding.

---

## Browser Compatibility

The tool relies on widely supported web platform features:

- `localStorage` for optional notes persistence.
- `postMessage` / `message` events for iframe theme control.
- `data-*` attributes and `setAttribute` for theming and i18n.
- Standard `<select>`, `<input type="search">`, and `<textarea>` controls.
- `aria-live="polite"` for accessible announcements of the active placement card.

No polyfills or transpilation are used; the code targets modern evergreen browsers.

---

## Security

- **No data transmission:** The application sends nothing over the network. Notes and search terms never leave the device.
- **Input handling:** User input is confined to the search field and the notes textarea. Notes are stored as plain text in `localStorage` under `poli_genital_suitability_notes` and are never executed or injected as markup.
- **XSS surface:** Because the tool performs no server round-trips and renders user text as textarea content, there is no server-side injection vector. Any rendering of dataset strings into the DOM should continue to use text nodes rather than raw HTML to keep this property.
- **Storage control:** Persistence is strictly opt-in via `save-notes-checkbox`; `clear-notes-btn` removes the key immediately, and clearing browser cookies/site data achieves the same result.
- **Indexing:** `index.html` and the documentation pages carry `<meta name="robots" content="noindex, nofollow">`.

---

## Version History

### 1.0.0
- Initial release of the Genital Piercing Anatomy Suitability Checker.
- 14 placement records across female, male, and shared/perineal anatomy categories.
- Search by placement name or common alias, plus anatomy-category filtering.
- Per-placement reference cards: required anatomy, in-person assessment, refusal reasons, healing time, starting jewellery, and four talking points.
- Neutral, non-explicit SVG cross-section diagrams with show/hide toggle.
- Private "Is It Right for Me?" consultation worksheet with optional `localStorage` persistence and a printable consultation sheet.
- Shared clinical refusal-reasons section (five general causes).
- Seven-language UI (EN, FR, IT, DE, ES, NL, PT) plus seven matching documentation pages.
- Iframe embedding with automatic dark theme and `poli-theme` message support.

---

## Support / Contact

For questions, bug reports, or integration help:

**Email:** support@poliinternational.com

**Live tool:** https://poliinternational.com/tools/genital-piercing-suitability/
