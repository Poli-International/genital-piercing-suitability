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

## Architecture Overview

### Technology Stack

- **HTML5** - Semantic markup with ARIA attributes
- **CSS3** - External stylesheet (`/tools/genital-piercing-suitability/css/style.css`)
- **JavaScript (ES6)** - Vanilla JS, no external libraries or frameworks
- **Dependency-free** - Zero external dependencies, CDN links, or npm packages

### File Structure

```
/tools/genital-piercing-suitability/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

### Component / Logic Breakdown

The tool consists of three interconnected components:

1. **HTML Structure** (`index.html`)
   - Age gate banner (18+ content warning)
   - Filter dropdown for anatomy type (female/male/all)
   - Piercing type selection dropdown (dynamically populated)
   - Dynamic info card container (`#piercing-info`)
   - Disclaimer section

2. **Data Layer** (`app.js`)
   - `PIERCINGS` array - Static dataset containing 8 piercing objects
   - Each object holds anatomical, technical, and safety data

3. **Presentation Logic** (`app.js`)
   - `populateSelect()` - Filters and renders piercing options
   - `showInfo()` - Generates and injects info card HTML
   - Event handlers for dropdown change events

## Data Schemas

### PIERCINGS Array

The `PIERCINGS` constant is a static array of 8 objects. Each object follows this schema:

```javascript
{
  id: String,              // Unique identifier (e.g., 'vch', 'pa')
  name: String,            // Display name with abbreviation (e.g., 'VCH (Vertical Clitoral Hood)')
  anatomy: String,         // Anatomy type: 'female' or 'male'
  desc: String,            // Brief anatomical description
  suitability: String,     // Suitability percentage and requirements
  gauge: String,           // Standard gauge with mm equivalent (e.g., '14g (1.6 mm)')
  healing: String,         // Typical healing time range (e.g., '4-8 weeks')
  material: String,        // Recommended jewelry material
  risks: String,           // Key risks and complications
  suitabilityTest: String, // Assessment method description
  contraindications: [     // Array of contraindication strings
    String,
    String,
    ...
  ]
}
```

### Example Object (VCH)

```javascript
{
  id: 'vch',
  name: 'VCH (Vertical Clitoral Hood)',
  anatomy: 'female',
  desc: 'Passes vertically through the clitoral hood fold.',
  suitability: 'Approximately 70-80% of anatomy is suitable. The hood must have sufficient depth and forward projection to support the barbell without pressure on the glans.',
  gauge: '14g (1.6 mm)',
  healing: '4-8 weeks',
  material: 'Curved barbell, BioFlex® or implant-grade titanium',
  risks: 'Incorrect sizing causes pressure on the clitoris and nerve sensitivity changes. Hood must be assessed in person by an APP-certified piercer using a taper test.',
  suitabilityTest: 'The Q-tip test: if a Q-tip inserted under the hood can stand upright with only gentle support, anatomy is likely suitable.',
  contraindications: [
    'Very small or low-set clitoral hood',
    'Prior scarring from hood reduction procedures',
    'Sensitivity disorders requiring avoidance of pressure'
  ]
}
```

### Complete List of Piercing IDs

| ID | Name | Anatomy |
|----|------|---------|
| `vch` | VCH (Vertical Clitoral Hood) | female |
| `hch` | HCH (Horizontal Clitoral Hood) | female |
| `triangle` | Triangle Piercing | female |
| `fourchette` | Fourchette | female |
| `pa` | PA (Prince Albert) | male |
| `apadravya` | Apadravya | male |
| `ampallang` | Ampallang | male |
| `dydoe` | Dydoe | male |

## Calculation / Logic Algorithms

### `populateSelect()`

**Purpose**: Filters the `PIERCINGS` array based on the selected anatomy filter and populates the piercing type dropdown.

**Algorithm**:

1. Clear existing dropdown options by setting `innerHTML` to a default placeholder option
2. Read current filter value from `#anatomy-filter` select element
3. Filter `PIERCINGS` array:
   - If filter is `'all'`, include all piercing objects
   - If filter is `'female'` or `'male'`, include only objects where `p.anatomy === filter`
4. For each filtered piercing object, insert an `<option>` element with:
   - `value` attribute set to `escHtml(p.id)`
   - Display text set to `escHtml(p.name)`
5. Clear the info card display area (`#piercing-info`)

### `showInfo()`

**Purpose**: Generates and renders the detailed info card for the selected piercing type.

**Algorithm**:

1. Find the piercing object in `PIERCINGS` array by matching `p.id === piercingSel.value`
2. If no match found, clear `infoDiv` and exit
3. Build contraindications HTML by mapping each contraindication string to an `<li>` element with `escHtml()` sanitization
4. Construct complete info card HTML template with:
   - Piercing name and description
   - Anatomy suitability section
   - Suitability assessment section
   - Grid display for gauge, healing time, and material
   - Key risks section
   - Contraindications list
   - CTA footer with BioFlex® link
5. Inject the HTML into `#piercing-info` div

### `escHtml()`

**Purpose**: Sanitizes user-facing strings to prevent XSS attacks.

**Algorithm**:

1. Convert input to string (or empty string if null/undefined)
2. Replace special HTML characters with their entity equivalents:
   - `&` → `&amp;`
   - `<` → `&lt;`
   - `>` → `&gt;`
   - `"` → `&quot;`

## API Reference

### Public Functions

#### `escHtml(s)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | Any | Value to sanitize for HTML output |

**Returns**: Sanitized string with HTML entities escaped.

**Behavior**: Converts special characters (`&`, `<`, `>`, `"`) to their HTML entity equivalents. Returns empty string for null/undefined input.

---

#### `populateSelect()`

**Parameters**: None

**Returns**: `undefined`

**Behavior**: Filters `PIERCINGS` array by `#anatomy-filter` value, populates `#piercing-select` dropdown with matching options, clears info card display.

---

#### `showInfo()`

**Parameters**: None

**Returns**: `undefined`

**Behavior**: Reads selected piercing ID from `#piercing-select`, finds matching object in `PIERCINGS` array, generates and renders complete info card HTML in `#piercing-info` div.

### Event Handlers

| Element | Event | Handler | Description |
|---------|-------|---------|-------------|
| `#anatomy-filter` | `change` | `populateSelect` | Re-filter piercing options when anatomy type changes |
| `#piercing-select` | `change` | `showInfo` | Display info card when piercing type is selected |

### Global Variables

| Variable | Type | Description |
|----------|------|-------------|
| `PIERCINGS` | Array | Immutable array of 8 piercing data objects |
| `piercingSel` | DOM Element | Reference to `#piercing-select` select element |
| `anatFilter` | DOM Element | Reference to `#anatomy-filter` select element |
| `infoDiv` | DOM Element | Reference to `#piercing-info` div element |

## Integration Guide

### Standalone Embedding

The tool can be embedded in any webpage using an iframe:

```html
<iframe 
  src="https://poliinternational.com/tools/genital-piercing-suitability/"
  width="100%"
  height="800"
  frameborder="0"
  allowfullscreen>
</iframe>
```

### Theme Support

When embedded in an iframe, the tool automatically detects if it is in a cross-origin context (`window.self !== window.top`). It listens for `message` events with type `poli-theme` to switch between light and dark themes:

```javascript
// Parent window can send theme updates
iframe.contentWindow.postMessage({
  type: 'poli-theme',
  light: true  // or false for dark mode
}, '*');
```

### Dependencies

- **Zero external dependencies** - No jQuery, React, or any third-party libraries
- **No CDN resources** - All assets are self-hosted
- **No build tools required** - Plain HTML/CSS/JS

## Customization

### Adding New Piercing Types

To add a new piercing type, append an object to the `PIERCINGS` array in `app.js` following the existing schema:

```javascript
{
  id: 'new-piercing-id',
  name: 'Display Name',
  anatomy: 'female',  // or 'male'
  desc: 'Description text',
  suitability: 'Suitability text',
  gauge: '14g (1.6 mm)',
  healing: '4-8 weeks',
  material: 'Recommended material',
  risks: 'Risk description',
  suitabilityTest: 'Assessment method',
  contraindications: [
    'Contraindication 1',
    'Contraindication 2'
  ]
}
```

### Styling

All visual styling is controlled via `/tools/genital-piercing-suitability/css/style.css`. Key CSS classes:

- `.tool-wrapper` - Main container
- `.tool-header` - Header section
- `.age-gate` - Age verification banner
- `.select-card` - Dropdown container
- `.info-card` - Dynamic info card
- `.info-grid` - Gauge/healing/material grid
- `.contra-list` - Contraindications list
- `.disclaimer` - Footer disclaimer

## Performance

- **Minimal DOM manipulation** - Only two DOM updates occur: dropdown population and info card rendering
- **No network requests** - All data is static JavaScript, no API calls or database queries
- **No animations or transitions** - Instant content rendering
- **Small payload** - Total page weight under 15KB (HTML + CSS + JS)
- **No reflows** - Content is injected once and remains static until user interaction

## Browser Compatibility

- **Chrome** (latest 2 versions) - Full support
- **Firefox** (latest 2 versions) - Full support
- **Safari** (latest 2 versions) - Full support
- **Edge** (latest 2 versions) - Full support
- **Opera** (latest 2 versions) - Full support
- **Internet Explorer** - Not supported (ES6 features not available)

### Requirements

- JavaScript enabled
- ES6 support (`const`, `let`, arrow functions, template literals)
- `Array.find()` and `Array.filter()` support
- `String.replace()` with regex support

## Security

### XSS Prevention

All user-facing text is sanitized through the `escHtml()` function before being inserted into the DOM. This function:

- Converts `&` to `&amp;`
- Converts `<` to `&lt;`
- Converts `>` to `&gt;`
- Converts `"` to `&quot;`

### Input Handling

- All data comes from the static `PIERCINGS` array, not from user input
- Dropdown values are validated against the predefined array before display
- No form submission or data persistence
- No cookies, localStorage, or sessionStorage usage

### Content Security

- The tool sets `noindex, nofollow` meta tags to prevent search engine indexing
- External links use `rel="noopener noreferrer"` for security
- The age gate provides content-appropriate warnings

## Version History

### Version 1.0.0 (Current)

- Initial release with 8 genital piercing types
- Anatomy filter (female/male/all)
- Dynamic info card with suitability, gauge, healing, materials, risks, and contraindications
- Age verification gate
- Theme support for iframe embedding
- XSS sanitization via `escHtml()`
- Responsive design

## Support / Contact

For technical issues or inquiries about this tool:

- **Email**: support@poliinternational.com
- **Website**: https://poliinternational.com
- **BioFlex® Information**: https://poliinternational.com/bioflex/

For clinical or safety concerns regarding genital piercings, consult an APP-certified piercer with specific genital piercing experience.
