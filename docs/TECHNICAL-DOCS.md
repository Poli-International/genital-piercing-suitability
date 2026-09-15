# Genital Piercing Anatomy Suitability Checker (V2): Technical Documentation

## Architecture & Design Principles

This application is built as a self-contained, zero-dependency client application conforming to strict standards:

1. **Zero External Dependencies in Browser Code**: No CDN links, no remote scripts, no remote web fonts, no tracking scripts, and no external images.
2. **Synchronous Internationalization**: Dictionaries load synchronously at parse time via `js/i18n.js` to eliminate layout shift and key-path flashes.
3. **Pure Vector Graphics**: Schematic cross-section diagrams are built as inline SVGs in `js/diagrams.js`.
4. **Theme Handshake**: Integrates with the parent website via `window.addEventListener('message')` listening for `poli-theme`. Supports dark and light themes with WCAG AA contrast.
5. **No Hardcoded Colours**: All visual presentation is governed by CSS custom properties in `css/style.css`.
6. **Strict Privacy Architecture**: No data is sent over the network. Local persistence is strictly opt-in via a checkbox and clearable via a single click.

---

## File Structure

```
.
├── index.html              # Main HTML entry point
├── css/
│   └── style.css           # Styling, themes, and print stylesheet
├── js/
│   ├── i18n.js             # Translation engine & English dictionary
│   ├── diagrams.js         # Inline SVG schematic generator
│   └── app.js              # Application logic, filters, and print handlers
├── docs/
│   ├── USER-GUIDE.md       # End-user guide
│   └── TECHNICAL-DOCS.md   # Architectural documentation
├── server.js               # Node.js static file server (port 3000)
├── build.js                # Production verification script
├── lint.js                 # Syntax and lint verification script
├── package.json            # Node package definition
└── metadata.json           # Application metadata
```

---

## Shipped Browser Files

| File | Size (Bytes) | Description | Loaded Via |
|---|---|---|---|
| `index.html` | ~8.8 KiB | Primary markup, controls, and accessibility structure | Entry point |
| `css/style.css` | ~15.0 KiB | Theme tokens, card layout, and `@media print` rules | `<link rel="stylesheet" href="css/style.css">` |
| `js/i18n.js` | ~29.2 KiB | Translation dictionary and `window.t` helper | `<script src="js/i18n.js"></script>` |
| `js/diagrams.js` | ~21.2 KiB | SVG cross-sectional schematics generator | `<script src="js/diagrams.js"></script>` |
| `js/app.js` | ~22.8 KiB | Data model, search/alias matching, and interactions | `<script src="js/app.js"></script>` |

Every file is well below the 512 KiB (524,288 bytes) export limit.

---

## Runtime Verification

- **Lint**: `npm run lint` (runs `node lint.js`, verifying syntax of all JavaScript files via `node --check`).
- **Build**: `npm run build` (runs `node build.js`, validating file sizes, security checks, and entry point integrity).
- **Start**: `npm start` (runs `node server.js` on port 3000).
