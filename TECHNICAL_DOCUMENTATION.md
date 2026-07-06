# Professional Gauge Converter - Technical Documentation

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
11. [Support and Contact](#support-and-contact)

---

## Architecture Overview

### Technology Stack

The tool is a standalone, dependency-free static web application built with:

- **HTML5** - Semantic markup with ARIA labels for accessibility
- **CSS3** - Custom properties (CSS variables), responsive grid layout, dark/light mode
- **Vanilla JavaScript (ES6+)** - No frameworks, libraries, or external dependencies

### File Structure

```
gauge-converter/
├── index.html              # Main tool page with tabs (Tool, Documentation, Embed)
├── documentation.html      # Full documentation page (loaded in iframe)
├── embed.html              # Standalone embeddable version
├── embed-code.html         # Embed code generator page
├── embed_backup.html       # Backup of embed version
├── css/
│   ├── poli-standard.css   # Standard Poli stylesheet
│   └── style.css           # Tool-specific styles
└── js/
    ├── converter.js        # Core conversion logic
    ├── feedback.js         # Feedback form handler
    └── common.js           # Shared utilities (theme, modal, email form)
```

### Component Breakdown

| Component | File | Purpose |
|-----------|------|---------|
| Tool Interface | `index.html` | Main UI with three tabs (Tool, Documentation, Embed) |
| Input Section | `index.html` | Gauge dropdown, mm input, inches input |
| Visual Display | `index.html` | SVG circle showing life-size diameter |
| Reference Tables | `index.html` | Two-column table with piercing types and sizes |
| Embed Version | `embed.html` | Lightweight version for iframe embedding |
| Core Logic | `js/converter.js` | Conversion functions and event handlers |
| Theme Manager | `js/common.js` | Dark/light mode toggle and persistence |
| Feedback Handler | `js/feedback.js` | Email submission via Web3Forms API |

### Data Flow

```
User Input (select/input)
    ↓
Event Listener (change/input/keyup)
    ↓
Debounce Timer (300ms for numeric inputs)
    ↓
Conversion Functions
    ↓
DOM Updates:
    - SVG circle radius
    - Measurement display
    - Other input fields
```

---

## Data Schemas

### Gauge-to-Millimeter Mapping

Defined in `js/converter.js` as constant `GAUGE_TO_MM`:

```javascript
const GAUGE_TO_MM = {
    '00G': 10.0,
    '0G':  8.0,
    '1G':  7.0,
    '2G':  6.0,
    '4G':  5.0,
    '6G':  4.0,
    '8G':  3.2,
    '10G': 2.4,
    '12G': 2.0,
    '14G': 1.6,
    '16G': 1.2,
    '18G': 1.0,
    '20G': 0.8,
    '22G': 0.6
};
```

### Reverse Mapping (Computed)

```javascript
const MM_TO_GAUGE = Object.entries(GAUGE_TO_MM).reduce((acc, [gauge, mm]) => {
    acc[mm] = gauge;
    return acc;
}, {});
// Example: { 10.0: '00G', 8.0: '0G', 1.2: '16G', ... }
```

### Conversion Constants

```javascript
const MM_PER_INCH = 25.4;
const PIXELS_PER_MM = 3.78;
const MAX_CIRCLE_RADIUS = 140;
const DEBOUNCE_DELAY = 300;
```

### Measurement Display Object

Used by `updateMeasurementDisplay()`:

```javascript
{
    gauge: '16G',          // String or null
    mm: '1.2',             // String (formatted) or null
    inches: '0.047'        // String (formatted) or null
}
```

---

## Calculation / Logic Algorithms

### Function: `gaugeToMM(gauge)`

**Purpose**: Convert gauge string to millimeters.

**Algorithm**:
1. Check if gauge is null or empty string → return `null`
2. Look up gauge in `GAUGE_TO_MM` object
3. Return the millimeter value or `null` if not found

**Example**: `gaugeToMM('16G')` → `1.2`

### Function: `mmToInches(mm)`

**Purpose**: Convert millimeters to inches.

**Algorithm**:
1. Check if mm is null/undefined/empty → return `null`
2. Parse mm to float; if NaN or negative → return `null`
3. Divide by `MM_PER_INCH` (25.4)
4. Round to 3 decimal places

**Formula**: `inches = mm / 25.4`

**Example**: `mmToInches(1.2)` → `0.047`

### Function: `inchesToMM(inches)`

**Purpose**: Convert inches to millimeters.

**Algorithm**:
1. Check if inches is null/undefined/empty → return `null`
2. Parse to float; if NaN or negative → return `null`
3. Multiply by `MM_PER_INCH` (25.4)
4. Round to 1 decimal place

**Formula**: `mm = inches * 25.4`

**Example**: `inchesToMM(0.047)` → `1.2`

### Function: `mmToClosestGauge(mm)`

**Purpose**: Find the closest standard gauge for a given millimeter value.

**Algorithm**:
1. Check if mm is null/undefined/empty → return `null`
2. Parse to float; if NaN or negative → return `null`
3. If exact match exists in `MM_TO_GAUGE` → return that gauge
4. Otherwise, iterate all gauges, calculate absolute difference
5. Return gauge with smallest difference

**Example**: `mmToClosestGauge(1.5)` → `14G` (closest to 1.6mm)

### Function: `inchesToClosestGauge(inches)`

**Purpose**: Convert inches to closest gauge via millimeter intermediate.

**Algorithm**:
1. Convert inches to mm using `inchesToMM()`
2. Pass result to `mmToClosestGauge()`

### Function: `updateCircleDisplay(mm)`

**Purpose**: Update the SVG circle to show life-size diameter.

**Algorithm**:
1. Get SVG circle element by ID `gauge-circle`
2. If mm is null/undefined/empty → set radius to 0
3. Parse mm to float; if NaN or ≤ 0 → set radius to 0
4. Calculate radius in pixels: `(mm / 2) * PIXELS_PER_MM`
5. Cap at `MAX_CIRCLE_RADIUS` (140px)
6. Set SVG `r` attribute

### Function: `validateNumericInput(value, min, max)`

**Purpose**: Validate numeric input within range.

**Algorithm**:
1. If value is empty/null/undefined → return `true` (allow empty)
2. Parse to float; if NaN → return `false`
3. If value < min or > max → return `false`
4. Otherwise → return `true`

**Default parameters**: `min=0, max=Infinity`

### Debounce Logic

Numeric inputs (mm and inches) use a 300ms debounce timer:

```javascript
let debounceTimer = null;

function handleMMChange() {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        // ... conversion logic ...
    }, DEBOUNCE_DELAY);
}
```

---

## API Reference

### Public Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `gaugeToMM(gauge)` | `gauge`: String (e.g., '16G') | Number or null | Converts gauge to millimeters |
| `mmToInches(mm)` | `mm`: Number | Number (3 decimals) or null | Converts mm to inches |
| `inchesToMM(inches)` | `inches`: Number | Number (1 decimal) or null | Converts inches to mm |
| `mmToClosestGauge(mm)` | `mm`: Number | String or null | Finds closest standard gauge |
| `inchesToClosestGauge(inches)` | `inches`: Number | String or null | Converts inches to closest gauge |
| `updateCircleDisplay(mm)` | `mm`: Number or null | void | Updates SVG circle radius |
| `updateMeasurementDisplay(values)` | `values`: Object `{gauge, mm, inches}` | void | Updates measurement display |
| `showError(message)` | `message`: String | void | Shows error message (auto-hides after 5s) |
| `hideError()` | none | void | Hides error message |
| `clearAllInputs()` | none | void | Resets all inputs and displays |
| `validateNumericInput(value, min, max)` | `value`: String/Number, `min`: Number, `max`: Number | Boolean | Validates numeric range |

### Event Handlers

| Handler | Trigger | Description |
|---------|---------|-------------|
| `handleGaugeChange()` | `change` event on gauge select | Converts gauge to mm/inches, updates display |
| `handleMMChange()` | `input`/`keyup` on mm input (debounced 300ms) | Converts mm to gauge/inches, updates display |
| `handleInchesChange()` | `input`/`keyup` on inches input (debounced 300ms) | Converts inches to gauge/mm, updates display |

### Initialization

```javascript
function initConverter()
```

Called on `DOMContentLoaded`. Attaches event listeners to all three inputs and initializes display to empty state.

---

## Integration Guide

### Standalone Embedding

The tool is dependency-free static HTML/CSS/JS and can be embedded via iframe:

```html
<iframe
  src="https://poliinternational.com/tools/gauge-converter/embed.html"
  width="100%"
  height="600"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 8px;"
  title="Professional Gauge Converter by Poli International">
</iframe>
```

### Embed Options

| Version | Dimensions | Features |
|---------|------------|----------|
| Compact | 320×500px | Inputs and measurements only |
| Standard (Recommended) | 100%×600px | Full-width with visual display |
| Large | 100%×800px | Maximum visibility |

### Theme Integration

The embed version supports theme control via postMessage:

```javascript
// Send theme from parent to iframe
iframe.contentWindow.postMessage({
    type: 'poli-theme',
    light: true  // or false for dark mode
}, '*');
```

### No Dependencies

The tool requires:
- No external CSS frameworks
- No JavaScript libraries
- No API keys
- No server-side processing
- No cookies or tracking

---

## Customization

### CSS Variables

The tool uses CSS custom properties for easy theming:

```css
:root {
    --color-primary: #0066CC;
    --color-primary-dark: #004C99;
    --color-primary-light: #3385D6;
    --color-text-primary: #333;
    --color-text-secondary: #666;
    --color-background: #F5F5F5;
    --color-background-white: #FFF;
    --color-border: #DDD;
    --color-error: #DC3545;
    --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-family-mono: "SF Mono", Monaco, "Cascadia Code", monospace;
    --border-radius: 8px;
    --transition-speed: 0.3s;
}
```

### Dark Mode

Dark mode is toggled by adding class `dark-mode` to `<body>`. The embed version persists preference in `localStorage` under key `embed-theme`.

### Gauge Data

To customize available gauge sizes, modify the `GAUGE_TO_MM` object in `js/converter.js`. The select dropdown options in `index.html` and `embed.html` must be updated to match.

---

## Performance

- **Total Size**: Under 50KB (HTML, CSS, JS combined)
- **Load Time**: Under 2 seconds on standard connections
- **No External Requests**: Zero network dependencies
- **Debounced Input**: 300ms debounce prevents excessive calculations during typing
- **Efficient DOM Updates**: Only affected elements are updated
- **CSS Animations**: Respects `prefers-reduced-motion`

---

## Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

### Features Used

- CSS Grid (`grid-template-columns`)
- CSS Custom Properties (`var()`)
- ES6 Arrow Functions
- `Array.reduce()`, `Object.entries()`
- `fetch()` API (feedback form only)
- `localStorage` API
- `MutationObserver`
- `postMessage` API

---

## Security

### Input Handling

- **Numeric Validation**: All numeric inputs are validated with `validateNumericInput()` to ensure values are within acceptable ranges (mm: 0-20, inches: 0-1)
- **Type Checking**: All conversion functions check for null/undefined/empty values before processing
- **NaN Protection**: `parseFloat()` results are checked with `isNaN()` before use

### XSS Prevention

- No `innerHTML` is used for user-supplied values
- All dynamic content is set via `textContent` property
- Select dropdown values are constrained to predefined options
- No user input is evaluated as code

### Embed Security

- iframe uses no special permissions (no `allow` attributes)
- No cross-origin data sharing
- No cookies or tracking mechanisms
- Works on both HTTP and HTTPS

---

## Version History

### Version 1.0.0 (Current)

- Initial release of Professional Gauge Converter
- 14 standard gauge sizes (00G to 22G)
- Bidirectional conversion (gauge ↔ mm ↔ inches)
- SVG visual circle display
- Reference tables with 30+ piercing types
- Dark/light mode support
- Embeddable iframe version
- Email notification signup
- Feedback form integration
- WCAG 2.1 AA accessibility compliance

---

## Support and Contact

For technical support, integration assistance, or bug reports:

- **Email**: support@poliinternational.com
- **Website**: https://poliinternational.com
- **Contact Form**: https://poliinternational.com/contact-us/

### Feedback

The tool includes a built-in feedback form (in `js/feedback.js`) that submits to:

- **API**: Web3Forms (https://api.web3forms.com/submit)
- **Recipient**: patrick@poli-international.com
- **Access Key**: `ebd0e138-c7aa-4290-b028-74d1c3fa8faa`

---

*Documentation generated from source code version 1.0.0*
