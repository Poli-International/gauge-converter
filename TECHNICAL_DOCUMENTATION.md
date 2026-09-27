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
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

The Professional Gauge Converter is a dependency-free static web application built with plain HTML, CSS, and vanilla JavaScript. There is no build step, no framework, and no runtime package manager.

- **Markup:** HTML5 (`index.html`), with a `manifest.webmanifest` for installability metadata.
- **Styling:** External stylesheets, `css/style.css` for the tool plus shared `tools/shared/print.css` (print media) and `tools/shared/a11y.css` (accessibility).
- **Scripts:** `js/i18n.js` (pre-rendered synchronous translation dictionary), `js/feedback.js` (community feedback form handler), and the converter logic referenced as `converter.js` (renders the reference table body and drives conversions). A shared `/js/input-guards.js` is loaded in the head.
- **Structured data:** A `schema.org` `WebApplication` JSON-LD block declaring `applicationCategory: UtilityApplication`, `operatingSystem: Any`, `offers.price: 0`, `isAccessibleForFree: true`, and `inLanguage` for en, fr, de, es, it, nl, pt.

### File Structure

Based on the source file headers:

```
gauge-converter/
├── index.html                  # Main tool shell and markup
├── embed.html                  # Standalone downloadable copy (linked from embed modal)
├── manifest.webmanifest        # PWA manifest
├── documentation.html          # English user guide
├── documentation-fr.html       # French user guide
├── documentation-de.html       # German user guide
├── documentation-es.html       # Spanish user guide
├── documentation-it.html       # Italian user guide
├── documentation-nl.html       # Dutch user guide
├── documentation-pt.html       # Portuguese user guide
├── css/
│   └── style.css               # Tool styles
├── js/
│   ├── i18n.js                 # Synchronous translation dictionary
│   ├── converter.js            # Conversion + table rendering logic
│   └── feedback.js             # Feedback form submission handler
└── images/
    └── Poli-International-Co.webp
```

Shared assets loaded from outside the tool folder: `/js/input-guards.js`, `/tools/shared/print.css`, `/tools/shared/a11y.css`.

### Component Breakdown

The `index.html` page is organized into these functional regions:

1. **Breadcrumb navigation** (`nav.breadcrumb-nav`) linking Home, Tools, Piercing Tools, and the current page.
2. **Site header** (`header.site-header`) with logo and top-level nav links.
3. **Tool title section** (`section.tool-title-section`) with the H1, a GitHub CTA, and the subtitle.
4. **Main converter container** (`div.gauge-converter`) containing:
   - **Header bar** with language selector (`#language-selector`), Free Embed button (`#embed-button`), and dark mode toggle (`#dark-mode-toggle`).
   - **Embed modal** (`#embed-modal`) with copyable iframe snippet (`#embed-code`), copy button (`#copy-embed-code`), and download links.
   - **Calibration modal** (`#calibration-modal`) with card guide (`#calibration-card-guide`), range slider (`#card-slider`, min 200, max 500, step 1), pixel readout (`#slider-px-val`), and save/cancel buttons.
   - **Input section** with three inputs: gauge `<select>` (`#gauge-input`), millimetres number input (`#mm-input`), inches number input (`#inch-input`), plus an error region (`#error-message`).
   - **Visual display section** with an SVG circle (`#gauge-circle`), a background dashed reference circle, calibration status badge (`#calibration-status-badge`), calibrate button (`#open-calibrate-modal`), and reset button (`#reset-calibration-btn`). Four measurement readouts: `#display-gauge`, `#display-mm`, `#display-inches`, `#display-fraction`.
   - **Caliper reverse lookup section** with input (`#caliper-input`), calculate button (`#caliper-calc-btn`), error region (`#caliper-error`), and result card (`#caliper-result-card`, `#caliper-result-text`).
   - **Honest reference table** (`#honest-table-body`) rendered dynamically by `converter.js`, with a click-to-load hint.
   - **Printable chart section** with print trigger (`#trigger-print-btn`).
   - **Related tools grid**, **GEO semantic block**, **more tools nav**, and a **community feedback form** (`#feedbackForm`).

---

## Data Schemas

### Gauge Dictionary (rendered into `#gauge-input` and `#honest-table-body`)

The gauge `<select>` is populated dynamically from a JS dictionary, and the reference table is rendered by `converter.js`. The table columns (from the `<thead>` `data-i18n` keys) define the row schema:

| Field (i18n key) | Meaning | Example |
|---|---|---|
| `table.col_gauge` | Gauge / Size label | `16G` |
| `table.col_awg_exact` | Derived AWG exact value | `1.291 mm` |
| `table.col_industry_mm` | Industry millimetre value | `1.2 mm` |
| `table.col_inch` | Approximate inches | `0.047 in` |
| `table.col_fraction` | Nearest common fraction | `3/64` |
| `table.col_placements` | Typical starting placements | Helix, Tragus, Conch |

Rows with dual millimetre values (documented for 10G, 2G, and 00G) list both manufacturer standards, since the piece's own specification wins.

### Feedback Payload (`js/feedback.js`)

The feedback form builds this object and POSTs it as JSON:

```js
{
  email:     document.getElementById('userEmail').value,
  role:      document.getElementById('userRole').value,
  feedback:  document.getElementById('feedbackText').value,
  toolName:  document.title,
  toolUrl:   window.location.href,
  timestamp: new Date().toString()
}
```

`role` is one of: `piercer`, `apprentice`, `shop_owner`, `tattoo_artist`, `enthusiast`, `other`.

### localStorage Keys

The documentation states that screen calibration data and the dark mode selection are stored in `localStorage` under separate keys. Clearing browser storage resets calibration to the 96 DPI fallback.

---

## Calculation / Logic Algorithms

### Unit Conversion

The converter links three representations of the same physical thickness:

- **Gauge to mm:** gauge values map to rounded industry millimetre values (for example 16G = 1.2 mm, 18G = 1.0 mm, 20G = 0.8 mm, 12G = 2.0 mm), derived from American Wire Gauge (AWG) and rounded for industry use.
- **mm to inches:** `inches = mm / 25.4`. The inches input has `step="0.001"`, `min="0"`, `max="2"`.
- **mm input constraints:** `step="0.1"`, `min="0"`, `max="50"`.
- **Fractional output:** the decimal inch value is matched to the nearest common fraction for display in `#display-fraction`.

Editing any one field recalculates the others. If a typed value matches a standard gauge within tolerance, that gauge is highlighted in the select and table; otherwise the value is labelled `Custom` (localized).

### Screen Calibration

1. User opens the calibration modal via `#open-calibrate-modal`.
2. A standard ISO/IEC 7810 ID-1 card (85.60 mm wide) is held against the on-screen guide box.
3. The `#card-slider` (range 200 to 500, step 1) adjusts the guide width in pixels; the live value is shown in `#slider-px-val` (default `323px`).
4. On save, the tool derives the real pixels-per-millimetre ratio for the display and updates the status badge from `96 DPI Fallback` to the calibrated scale.
5. `#reset-calibration-btn` restores the 96 DPI default.

### True-Scale Circle Rendering

The SVG uses `viewBox="0 0 300 300"` with the active circle at `cx="150" cy="150"`. The circle radius (`r`) is set from the selected diameter so that, after calibration, the rendered circle matches the physical diameter. A dashed background circle (`r="140"`) provides a reference frame. If a large stretched size exceeds the preview frame, the graphic is scaled down proportionally with an explanatory note.

### Reverse Caliper Lookup

1. User enters a measured thickness in `#caliper-input` (`step="0.01"`, `min="0.1"`, `max="50"`, placeholder `e.g. 1.25`).
2. Clicking `#caliper-calc-btn` finds the nearest standard gauge.
3. The result card (`#caliper-result-card`) reports the closest gauge, whether the measured piece is larger or smaller than standard, and the variance to the hundredth of a millimetre.
4. Invalid input surfaces in `#caliper-error`.

### Print Calibration

The print button (`#trigger-print-btn`) triggers a one-page wall chart. The instruction note requires printing at 100% scale (no fit-to-page) on A4 or US Letter, then verifying the printed 50 mm calibration bar with a ruler.

---

## API Reference

### `js/feedback.js`

**`DOMContentLoaded` handler**
- Looks up `#feedbackForm`, `#feedbackSuccess`, `#feedbackError`.
- Attaches a `submit` listener to the form.

**Form submit handler (`async function(e)`)**
- Calls `e.preventDefault()`.
- Builds the `formData` object (see [Data Schemas](#data-schemas)).
- Hides success/error messages, disables the submit button, and swaps its label to the localized `feedback.sending` string (fallback `Sending...`).
- `POST`s JSON to `/api/feedback` with headers `Content-Type: application/json` and `Accept: application/json`.
- On `result.success === true`: shows `#feedbackSuccess`, resets the form, smooth-scrolls the message into view, and auto-hides it after 10000 ms.
- On failure or thrown error: logs to console and shows `#feedbackError`, scrolled into view.
- `finally`: re-enables the submit button and restores its original innerHTML.

### `js/i18n.js`

Provides a synchronous translation dictionary loaded before render. Exposes `window.i18n.t(key)` used by `feedback.js` for the `feedback.sending` string. The language selector (`#language-selector`) offers en, fr, it, de, es, nl, pt.

### `converter.js` (referenced)

Responsible for rendering `#honest-table-body` and driving the conversion, calibration, circle, and caliper logic described above. The source for this file was not included in the provided excerpt, so its internal function names are not documented here.

### DOM Handlers and IDs (public surface)

| Element ID | Role |
|---|---|
| `#language-selector` | Language switch (en/fr/it/de/es/nl/pt) |
| `#embed-button` / `#embed-modal` / `#modal-close` | Embed modal open/close |
| `#embed-code` / `#copy-embed-code` / `#copy-success` | Copy iframe snippet |
| `#dark-mode-toggle` | Toggle dark/light mode |
| `#open-calibrate-modal` / `#close-calibrate-modal` / `#save-calibrate-btn` / `#cancel-calibrate-btn` | Calibration modal controls |
| `#card-slider` / `#slider-px-val` | Calibration slider and readout |
| `#reset-calibration-btn` | Reset to 96 DPI |
| `#gauge-input` / `#mm-input` / `#inch-input` | Conversion inputs |
| `#error-message` | Conversion error region |
| `#gauge-circle` | Active SVG circle |
| `#display-gauge` / `#display-mm` / `#display-inches` / `#display-fraction` | Measurement readouts |
| `#caliper-input` / `#caliper-calc-btn` / `#caliper-error` / `#caliper-result-card` / `#caliper-result-text` | Reverse lookup |
| `#honest-table-body` | Dynamically rendered reference table |
| `#trigger-print-btn` | Print wall chart |
| `#feedbackForm` | Community feedback form |

---

## Integration Guide

### Standalone Embedding via iframe

The embed modal exposes a responsive iframe snippet:

```html
<iframe src="https://poliinternational.com/tools/gauge-converter/index.html" width="100%" height="800" frameborder="0"></iframe>
```

Clicking `#copy-embed-code` copies this snippet to the clipboard (confirmation shown in `#copy-success`). The modal also offers a **Download HTML File** link to `embed.html` for a self-contained offline copy, and a link to the full tools directory.

### Dependency-Free Static Hosting

The tool is static HTML/CSS/JS with no build step and no external runtime dependencies. It can be hosted on any static file server. The only server-side endpoint referenced is `/api/feedback` for the optional feedback form; the converter, calibration, and caliper features run entirely client-side.

### Offline Use

The downloaded `embed.html` contains the full application code and operates without an internet connection, per the documentation.

---

## Customization

- **Language:** switch among en, fr, it, de, es, nl, pt via `#language-selector`. All visible strings are keyed through `data-i18n` attributes, so translations are driven by `js/i18n.js`.
- **Theme:** `#dark-mode-toggle` switches dark/light mode; the choice persists in `localStorage`.
- **Calibration:** the `#card-slider` range is fixed at min 200, max 500, step 1 in the markup, and the default pixel readout is `323px`.
- **Styling:** visual changes are made in `css/style.css`; print output is governed by `tools/shared/print.css`; accessibility styles by `tools/shared/a11y.css`.

---

## Performance

- Fully client-side; no network round-trips for conversions, calibration, or caliper lookup.
- `js/i18n.js` is loaded synchronously in the head as a pre-render dictionary, so strings are available before the UI paints.
- The reference table is rendered dynamically into `#honest-table-body` rather than hard-coded in markup.
- The SVG uses a fixed `viewBox` (300x300), so scaling does not require re-layout.

---

## Browser Compatibility

- Declared as `operatingSystem: Any` with `browserRequirements: Requires JavaScript. Requires HTML5.`
- Uses standard HTML5 inputs (`type="number"`, `type="range"`, `<select>`, `<textarea>`), SVG, `localStorage`, `fetch`, and `navigator`-free logic.
- The feedback handler uses `async/await` and `fetch`, requiring a modern browser.
- A `manifest.webmanifest` is linked for installability.

---

## Security

- **Input handling:** numeric inputs are constrained by `type="number"`, `min`, `max`, and `step` attributes (mm: 0 to 50; inches: 0 to 2; caliper: 0.1 to 50). A shared `/js/input-guards.js` is loaded in the head.
- **XSS surface:** the feedback handler reads values via `.value` and sends them as a JSON body; it does not inject user input into the DOM as HTML. The submit button label is restored from a captured `innerHTML` string rather than from user input.
- **Data locality:** all conversions, calibration values, and display preferences are processed in the browser. Calibration and theme are stored in `localStorage`. No measurement input, device information, or personal data is transmitted to external servers, except the feedback form which POSTs to the same-origin `/api/feedback` endpoint.
- **Embedded copy:** the downloadable `embed.html` runs fully offline.

---

## Version History

### 1.0.0
- Initial release of the Professional Gauge Converter.
- Gauge, millimetre, and inch conversion with fractional output.
- True-scale SVG circle reference with ISO/IEC 7810 ID-1 card calibration and 96 DPI fallback.
- Reverse caliper lookup with variance reporting.
- Honest reference table with dual millimetre values for 10G, 2G, and 00G.
- Printable one-page wall chart with 50 mm verification bar.
- Seven-language interface (en, fr, it, de, es, nl, pt).
- Free iframe embed and downloadable standalone HTML.
- Community feedback form.

---

## Support / Contact

For questions, bug reports, or feedback about the Professional Gauge Converter, contact **support@poliinternational.com**.

You can also use the in-page Community Feedback form, which posts to `/api/feedback` and includes your email, role, message, tool name, tool URL, and timestamp.
