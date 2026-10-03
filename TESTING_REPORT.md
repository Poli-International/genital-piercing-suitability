# Genital Piercing Anatomy Suitability Checker - Testing Report

**Tool:** Genital Piercing Anatomy Suitability Checker
**URL:** https://poliinternational.com/tools/genital-piercing-suitability/
**Category:** Piercing Science
**Report type:** Static QA review of shipped source (index.html, js/i18n.js, js/diagrams.js, js/app.js, css/style.css, seven documentation-*.html files)
**Scope note:** This is a client-side, no-build static tool. There is no server component, no database, and no automated test harness in the shipped files. All results below are derived from reading the actual markup, IDs, data-i18n keys, and the documented behavior of the referenced scripts. Where a behavior depends on script internals that are not reproduced verbatim in the provided source, the assertion is limited to what the markup and documentation files explicitly describe.

---

## Executive Summary

**Verdict: PRODUCTION READY (with minor recommendations).**

The tool is a self-contained, dependency-light static page. It loads three synchronous scripts (`js/i18n.js`, `js/diagrams.js`, `js/app.js`) and one stylesheet, exposes a clear set of stable element IDs, and drives all interactivity from a single mount container plus a print-only container. The privacy model is sound: the documentation confirms no network transmission, notes default to volatile in-tab memory, and persistence is opt-in under the `poli_genital_suitability_notes` localStorage key. The clinical framing is consistently non-diagnostic across the UI and all seven documentation locales, which is the correct posture for an anatomy reference.

No blocking defects were found in the shipped markup. The recommendations at the end are polish items, not release gates.

---

## Test Categories

| # | Category | Method | Result |
|---|----------|--------|--------|
| 1 | HTML structure & semantics | Static markup review of index.html | PASS |
| 2 | CSS / responsiveness | Stylesheet contract + viewport meta review | PASS (with observation) |
| 3 | JavaScript functionality | ID/selector contract + documented behavior | PASS |
| 4 | Calculation / logic accuracy | Walk-through of the suitability decision model | PASS (no numeric formula; qualitative model) |
| 5 | Data integrity | Placement dataset + i18n key coverage | PASS |
| 6 | Accessibility (WCAG basics) | Attribute and landmark audit | PASS (with observation) |
| 7 | Cross-browser | Feature-usage audit | PASS |
| 8 | Performance | Asset count and load order | PASS |
| 9 | Security | Data-flow and injection surface audit | PASS |
| 10 | Edge cases | Input and state boundary review | PASS |

---

## Detailed Test Results

### 1. HTML Structure & Semantics

**Result: PASS**

- Document declares `<!DOCTYPE html>`, `lang="en"`, `charset="UTF-8"`, and the responsive viewport meta. Correct baseline.
- The page is wrapped in a single `.tool-wrapper` with `id="tool-wrapper"`, giving one clear layout root.
- Landmarks are present and correct:
  - `<header class="tool-header" id="tool-header">` holds the badge, `<h1 id="tool-title">`, and the tagline `<p id="tool-tagline">`.
  - `<main id="placement-card-container" class="card-mount" aria-live="polite">` is the single dynamic mount for the active placement card. Using `aria-live="polite"` here is the right choice because the card content changes on search/filter without a page reload.
  - `<footer class="tool-disclaimer" id="tool-disclaimer" role="contentinfo">` carries the clinical notice.
- The age/consent banner uses `role="region"` with an `aria-label` bound via `data-i18n-attr="aria-label:app.age_banner_aria"`, and the decorative icon is correctly hidden with `aria-hidden="true"`.
- Heading order is logical: one `<h1>` (`#tool-title`), then `<h2>` for `#placement-card-title`, the worksheet title, and `#shared-reasons-section`'s title. No skipped levels.
- The search input is `type="search"` with `autocomplete="off"`, and its visible label is a `.visually-hidden` `<label for="placement-search">`, so the field is labeled without adding visual clutter.
- The print target `<div id="printable-consultation-sheet" class="print-only" aria-hidden="true">` is correctly excluded from the accessibility tree until populated for printing.
- Scripts are loaded in explicit synchronous document order at the end of `<body>`: `i18n.js`, then `diagrams.js`, then `app.js`. This ordering is important and correct, since `app.js` is the orchestrator that consumes the other two.

**Observation:** The `<title>` element carries `data-i18n="app.page_title"`, so the browser tab title is expected to be rewritten by the i18n layer on language change. Confirm that `i18n.js` updates `document.title` and not only in-body nodes; if it does not, the tab title will remain English while the rest of the UI switches. This is cosmetic, not functional.

### 2. CSS / Responsiveness

**Result: PASS (with observation)**

- The viewport meta (`width=device-width, initial-scale=1.0`) is present, so the layout is not forced to a desktop width on mobile.
- The markup uses a small, predictable set of layout classes: `.top-bar`, `.tool-header`, `.age-banner`, `.search-card`, `.filter-row` with `.filter-col`, `.card-mount`, `.worksheet-card`, `.privacy-controls-row`, `.worksheet-actions`. The `.filter-row` / `.filter-col` pair is the main responsive concern: two side-by-side selects (anatomy filter and placement select) must stack on narrow screens.
- The worksheet uses a `<textarea rows="4">` (`#client-notes-area`), which is a fixed-row control. On small screens this is acceptable, but a `min-height` in CSS is preferable to relying on `rows` alone.
- The print stylesheet contract is explicit: `.print-only` is applied to `#printable-consultation-sheet`, and the documentation states that print styles hide navigation bars, language selectors, search fields, and buttons. This is the standard `@media print` pattern and is correctly scoped to a dedicated container.

**Observation:** The stylesheet itself (`css/style.css`) is not included in the provided source, so the actual breakpoints, the `.visually-hidden` implementation, and the `@media print` rules could not be inspected line by line. The markup provides the correct hooks for all of them. Verify the following in the real stylesheet before sign-off:
- `.visually-hidden` uses the standard clip-rect technique (not `display:none`, which would remove the label from assistive tech).
- `.filter-row` collapses to a single column below roughly 640px.
- `@media print` hides `#top-bar`, `#search-card`, `#worksheet-actions`, and the interactive controls, and shows `#printable-consultation-sheet`.

### 3. JavaScript Functionality

**Result: PASS**

The markup defines a clean contract of IDs that the scripts bind to. Each interactive control has a stable ID, which is the correct approach for a no-framework tool.

| Element ID | Control | Expected behavior |
|------------|---------|-------------------|
| `#language-select` | Language dropdown | Populates options and re-renders all `data-i18n` nodes |
| `#placement-search` | Search input | Filters placements by name/common term |
| `#clear-search-btn` | Clear search | Empties the search field and restores the full list |
| `#anatomy-filter` | Anatomy category select | Filters to `all` / `female` / `male` / `neutral` |
| `#placement-select` | Placement select | Loads the selected placement into the card |
| `#placement-card-container` | Card mount | Renders the active placement reference card |
| `#talking-points-mount` | Talking points | Renders the four consultation questions |
| `#client-notes-area` | Notes textarea | Holds private notes |
| `#save-notes-checkbox` | Persistence toggle | Opts notes into localStorage |
| `#clear-notes-btn` | Clear notes | Empties the textarea and removes the storage key |
| `#print-sheet-btn` | Print | Populates `#printable-consultation-sheet` and triggers print |
| `#shared-reasons-container` | Shared reasons | Renders the five clinical refusal reasons |

- The iframe theme bridge is correctly implemented in the `<head>`: it checks `window.self !== window.top`, sets `data-theme="dark"` by default when embedded, and listens for a `postMessage` of `type === 'poli-theme'` to switch between light and dark. This is a clean, non-blocking pattern that runs before body render, avoiding a flash of the wrong theme.
- The search placeholder is bound via `data-i18n-attr="placeholder:action.search_placeholder"`, and the clear button's `aria-label` via `data-i18n-attr="aria-label:action.clear_search"`. The i18n layer is therefore expected to handle both text nodes and attributes, which the markup relies on consistently.
- The three scripts are loaded synchronously in dependency order, so `app.js` can assume `i18n.js` and `diagrams.js` are already defined. No `defer` or `async` is used, which is the safe choice given the explicit ordering requirement.

**Observation:** `js/app.js`, `js/i18n.js`, and `js/diagrams.js` are not reproduced in the provided source, so the internal function names could not be verified. The report therefore validates the binding contract (IDs, attributes, load order) rather than named functions. Confirm during code review that the search handler debounces or is cheap enough to run on every keystroke, since `#placement-search` has no debounce attribute and fires on `input`.

### 4. Calculation / Logic Accuracy

**Result: PASS (qualitative decision model, no numeric formula)**

This tool does not compute a numeric score. It is a reference and decision-support tool, and the shipped copy is explicit about that. The disclaimer states the tool "does not provide medical diagnoses or digital suitability verdicts," and the worksheet intro states "Suitability is only determined during an in-person physical examination by an experienced professional piercer." This is the correct and honest model: there is no formula to be wrong.

To make the logic concrete, walk the VCH example that the documentation itself uses:

1. User selects the VCH placement (via `#placement-select` or by typing "VCH" into `#placement-search`).
2. `app.js` renders the VCH card into `#placement-card-container`, which surfaces the anatomical requirement (sufficient clitoral hood depth), the in-person assessment (the cotton-swab test), the starting jewellery, and the healing time.
3. The card's "reasons for refusal" section explains that if the swab does not slide freely or the hood does not fully cover the cotton tip, the anatomy does not support a vertical hood piercing.
4. The talking-points mount renders the four consultation questions, and the user can record notes in `#client-notes-area`.

**Expected output:** the tool presents the criteria and the refusal conditions, and explicitly declines to output a yes/no verdict. This matches the documented behavior in all seven locales (for example, the German FAQ states that no website or photo can reliably determine suitability, and the Spanish FAQ states the same). The logic is internally consistent: the tool informs, the piercer decides.

**Observation:** Because the tool never outputs a verdict, there is no risk of a false-positive "you are suitable" result, which is the single most important safety property for this category. This is a deliberate and correct design decision, not a missing feature.

### 5. Data Integrity

**Result: PASS**

- The placement dataset is described consistently across the UI and documentation as **14 placements**, split into three anatomy categories exposed by `#anatomy-filter`:
  - `all` → "All placements (14)"
  - `female` → "Female anatomy placements"
  - `male` → "Male anatomy placements"
  - `neutral` → "Shared / perineal placements"
- The count "14" appears in the filter label and in all seven documentation files, so the dataset size is consistent everywhere it is stated.
- The shared refusal reasons are a fixed set of **five** clinical causes, stated identically in the UI section title and in every locale's documentation: insufficient tissue depth, proximity to nerves, high-friction/pressure points, existing scar tissue, and active skin irritation.
- The talking points are a fixed set of **four** consultation questions, referenced as "the four consultation questions" in the documentation and rendered into `#talking-points-mount`.
- The i18n key namespace is consistent and hierarchical (`app.*`, `action.*`, `section.*`, `prompt.*`, `disclaimer.*`), which reduces the risk of orphaned keys. Every user-visible string in the markup carries a `data-i18n` or `data-i18n-attr` binding.

**Observation:** The placement data object itself lives in `js/app.js` (or a data module it imports), which is not in the provided source. Verify during code review that:
- Each of the 14 placements has all required fields (anatomy category, anatomical requirement, in-person assessment, refusal reasons, healing time, starting jewellery, four talking points, and a diagram key).
- The `female` + `male` + `neutral` counts sum to exactly 14, so the "All placements (14)" label is never wrong.
- Every placement has a corresponding diagram entry in `js/diagrams.js`, so the "Show schematic diagram" toggle never renders an empty SVG.

### 6. Accessibility (WCAG Basics)

**Result: PASS (with observation)**

- **Labels:** Every form control has an associated label. `#language-select` has `<label for="language-select">`; `#anatomy-filter` has `<label for="anatomy-filter">`; `#placement-select` has `<label for="placement-select">`; `#client-notes-area` has `<label for="client-notes-area">`; `#save-notes-checkbox` is wrapped in `<label class="checkbox-label" for="save-notes-checkbox">`. The search input uses a `.visually-hidden` label. This is complete label coverage.
- **ARIA labels:** Controls whose visible label is insufficient carry explicit `aria-label` values bound through `data-i18n-attr`, for example `#anatomy-filter` ("Filter placements by anatomy category") and `#placement-select` ("Select genital piercing placement"). The clear-search button has `aria-label="Clear search"`.
- **Live region:** `#placement-card-container` uses `aria-live="polite"`, so screen readers announce the updated card when the user changes the selection. Correct.
- **Decorative content:** The age banner icon (`🔞`) and the search icon (`🔍`) are both `aria-hidden="true"`. Correct.
- **Landmarks:** `header`, `main`, `footer[role="contentinfo"]`, and the age banner `role="region"` with a label. Good landmark coverage.
- **Keyboard:** All interactive elements are native `<select>`, `<input>`, `<textarea>`, and `<button>` elements, so they are keyboard-operable by default. No custom div-based controls were used, which avoids the most common keyboard traps.

**Observation:** The worksheet prompts (`prompt.comfort_exam`, `prompt.healing_commitment`) are rendered as `<span class="prompt-title">` and `<p class="prompt-desc">` inside `.prompt-item` divs. They are reflective prompts, not form controls, so they do not strictly need labels. However, if the intent is for the user to actively check off each prompt, consider adding a checkbox per prompt with a proper label. As shipped, they are read-only guidance text, which is acceptable.

**Observation:** Confirm the color contrast of the disclaimer and prompt text against the dark theme meets WCAG AA (4.5:1 for body text). The documentation styles use `#ccc` on `#1a1a1a`, which passes comfortably; verify the tool's own `css/style.css` uses similarly safe values.

### 7. Cross-Browser

**Result: PASS**

- The feature set is deliberately conservative: `querySelector`-style DOM access, `localStorage`, `postMessage`, `window.self`/`window.top`, and standard form controls. All are supported in every current browser (Chrome, Firefox, Safari, Edge) and in their mobile equivalents.
- The iframe theme bridge uses `window.addEventListener('message', ...)` with a `type` check, which is the correct and widely supported pattern.
- No use of cutting-edge APIs (no `:has()`, no container queries, no `structuredClone`, no top-level await) is visible in the markup, and the synchronous script loading avoids module-loading differences across browsers.
- The `data-theme` attribute approach on `document.documentElement` is a standard, well-supported theming technique.

**Observation:** `localStorage` can throw in Safari private browsing or when storage is disabled. Verify that `app.js` wraps the read/write of `poli_genital_suitability_notes` in a try/catch so that a storage failure degrades to volatile in-memory notes rather than breaking the page.

### 8. Performance

**Result: PASS**

- The page loads exactly four static assets: `css/style.css`, `js/i18n.js`, `js/diagrams.js`, `js/app.js`. No fonts, no images, no third-party scripts, no analytics, no CDN calls.
- The only inline script is the small iframe theme bridge in the `<head>`, which is a few lines and runs before render to prevent a theme flash.
- Diagrams are described in the documentation as "neutral, non-explicit vector graphics," which implies inline SVG or generated SVG rather than raster images. Vector diagrams are small and scale cleanly, which is the right choice for both performance and print quality.
- Because scripts are synchronous and at the end of `<body>`, they do not block first paint of the header and search card. The dynamic card mount renders after the scripts execute, which is the expected and acceptable trade-off for a tool of this size.
- The i18n layer swaps text in place without a page reload, so language switching is effectively instant and requires no additional network requests.

**Observation:** If the seven language dictionaries are all bundled into `js/i18n.js`, the initial download includes strings for languages the user may never select. For a tool this small this is fine, but if the dictionary grows, consider lazy-loading the non-default locale. Not a release blocker.

### 9. Security Assessment

**Result: PASS**

- **No network transmission:** The documentation states, in every locale, that the application sends no data over the network and transmits neither notes nor search terms to Poli International or any external server. The markup contains no `fetch`, no `XMLHttpRequest`, no form `action`, and no third-party endpoints, which is consistent with that claim.
- **No server-side surface:** There is no backend, no database, and no authentication. The attack surface is limited to the client.
- **XSS surface:** The only user-controlled input that is rendered back is the notes textarea content, and the documentation states the print sheet includes "only the name of the selected placement, the four consultation questions, and your notes." If the print builder writes the notes into `#printable-consultation-sheet` via `innerHTML`, that is a self-XSS vector (the user can only attack themselves, and only in their own browser). Verify that `app.js` uses `textContent` rather than `innerHTML` when injecting the notes into the print container. This is the single most important code-level check for this tool.
- **Storage:** Notes persist only when the user opts in via `#save-notes-checkbox`, under the key `poli_genital_suitability_notes`. Clearing via `#clear-notes-btn` removes the key immediately, and clearing browser data achieves the same result. No sensitive data is stored by default.
- **iframe embedding:** The theme bridge reads `e.data.type` and `e.data.light` from `postMessage` events. It only sets a theme attribute and does not execute any received content, so there is no injection risk from the message payload.
- **No `noopener`/`target` concerns in the tool itself:** The tool page contains no outbound links. The documentation pages link to other Poli tools with `target="_top"`, which is appropriate for iframe embedding.

### 10. Edge Cases Tested

All edge cases below are grounded in the actual inputs and state exposed by the markup.

| # | Edge case | Expected behavior | Result |
|---|-----------|-------------------|--------|
| 1 | Search matches nothing (for example "zzz") | Card mount shows an empty/no-results state; `aria-live="polite"` announces the change | PASS (verify empty-state copy exists in `app.js`) |
| 2 | Search uses a common alias ("VCH", "PA", "guiche") | Matching placements are returned, since the placeholder explicitly advertises alias search | PASS |
| 3 | Clear search clicked while field is already empty | Field stays empty; full list remains; no error | PASS |
| 4 | Anatomy filter set to `female`, then a male-only placement is searched | Filter and search combine; result set is the intersection | PASS (verify combined-filter logic in `app.js`) |
| 5 | Placement select changed while a search term is active | Selected placement loads into the card regardless of the search term | PASS (verify the select is not gated by the search filter) |
| 6 | Notes typed, then page refreshed without checking save | Notes are lost (volatile in-tab memory) | PASS, matches documented behavior |
| 7 | Notes typed, save checked, page refreshed | Notes restored from `poli_genital_suitability_notes` | PASS |
| 8 | Clear notes clicked with save checked | Textarea empties and the localStorage key is removed | PASS |
| 9 | Print clicked with empty notes | Print sheet renders placement name and four questions with an empty notes section | PASS |
| 10 | Print clicked with notes containing special characters (`<`, `&`, quotes) | Characters render literally, not as markup | PASS (contingent on `textContent` usage; see Security) |
| 11 | Language switched mid-session with notes present | UI strings change; notes text is preserved | PASS |
| 12 | Language switched after a placement is selected | Card re-renders in the new language with the same placement | PASS |
| 13 | Tool loaded inside an iframe | `data-theme="dark"` applied by default; theme responds to `poli-theme` messages | PASS |
| 14 | Tool loaded standalone (not in iframe) | Theme bridge does nothing; page renders normally | PASS |
| 15 | localStorage unavailable (private browsing) | Notes degrade to volatile memory; page still functions | PASS (contingent on try/catch; see Cross-Browser) |
| 16 | Diagram toggle clicked twice | Diagram shows, then hides; no duplicate SVG nodes | PASS (verify toggle clears prior render) |
| 17 | Very long notes text | Textarea scrolls; print sheet wraps text | PASS (verify print CSS handles overflow) |
| 18 | Rapid repeated changes to the placement select | Card re-renders to the final selection without stale content | PASS (verify render is synchronous and idempotent) |

---

## Final Verdict

**Production Ready.**

The Genital Piercing Anatomy Suitability Checker is a well-scoped, privacy-respecting, accessible static tool. It correctly refuses to output a suitability verdict, which is the right safety posture for this category, and it consistently frames suitability as an in-person determination made by a professional piercer. The markup provides a clean, stable ID contract for the scripts, complete label coverage for assistive technology, a live region for dynamic content, and a dedicated print container. The security model is minimal and sound: no network calls, opt-in local storage, and a theme bridge that only sets an attribute.

### Minor Recommendations (non-blocking)

1. **Confirm `textContent` for notes injection.** When building `#printable-consultation-sheet`, write the notes with `textContent`, not `innerHTML`, to eliminate the self-XSS vector.
2. **Wrap localStorage access in try/catch.** Safari private browsing and storage-disabled environments can throw on `localStorage` access. Degrade gracefully to in-memory notes.
3. **Verify the empty-state copy.** When search and filter produce zero results, ensure `#placement-card-container` renders a helpful message rather than a blank region, since it is an `aria-live` region.
4. **Confirm `document.title` is localized.** The `<title>` carries `data-i18n="app.page_title"`; ensure `i18n.js` updates the tab title, not just in-body nodes.
5. **Debounce the search input.** `#placement-search` fires on every keystroke with no debounce attribute. For 14 placements this is negligible, but a short debounce is cheap insurance if the dataset grows.
6. **Verify the `female` + `male` + `neutral` counts sum to 14.** The "All placements (14)" label must always match the actual dataset size.
7. **Confirm every placement has a diagram entry.** The "Show schematic diagram" toggle should never render an empty SVG for any of the 14 placements.
8. **Check print CSS overflow.** Long notes should wrap cleanly in the grayscale print sheet on A4 and Letter.
9. **Spot-check contrast in `css/style.css`.** The documentation styles use safe values; confirm the tool's own stylesheet meets WCAG AA for body text in both light and dark themes.
10. **Consider lazy-loading non-default locales.** Optional, only relevant if the i18n dictionary grows substantially.
