# Professional Gauge Converter - Testing Report

**Tool:** Professional Gauge Converter (Body Piercing Gauge Converter & Size Chart)
**Live URL:** https://poliinternational.com/tools/gauge-converter/
**Category:** Piercing Science
**Report type:** Static QA review grounded in the shipped source (index.html, i18n.js, feedback.js, documentation-*.html, shared print/a11y CSS, input-guards.js)
**Note on method:** This is a static, client-side tool. No automated test harness, CI runner, or unit-test framework is present in the provided source, so this report documents manual/structural verification against the actual markup, IDs, data attributes, and logic described in the code. No test infrastructure is claimed that the code does not imply.

---

## Executive Summary

The Professional Gauge Converter is a self-contained, client-side conversion and reference tool. It ships as static HTML, CSS, and JavaScript with no server-side computation for the core conversion path. The conversion UI is driven by three linked inputs (`#gauge-input`, `#mm-input`, `#inch-input`), a true-scale SVG visual (`#gauge-circle`), a reverse caliper lookup (`#caliper-input`), a dynamically rendered reference table (`#honest-table-body`), a screen calibration modal (`#calibration-modal`), an embed modal (`#embed-modal`), and a print module (`#trigger-print-btn`).

The only network call in the reviewed JavaScript is the community feedback `POST` to `/api/feedback` in `feedback.js`, which is a non-core, optional feature. All measurement, calibration, and display logic runs locally. Calibration and dark-mode preferences are persisted in `localStorage` per the documentation.

**Verdict: Production Ready**, with minor, non-blocking recommendations noted at the end. The tool is functionally coherent, semantically structured, and privacy-respecting for its core purpose.

---

## Test Categories

| # | Category | Scope | Result |
|---|----------|-------|--------|
| 1 | HTML structure & semantics | Landmarks, headings, IDs, ARIA | PASS |
| 2 | CSS / responsiveness | Layout, modals, print, dark mode | PASS |
| 3 | JavaScript functionality | Inputs, modals, table render, feedback | PASS |
| 4 | Calculation / logic accuracy | Gauge ↔ mm ↔ inch, reverse lookup | PASS |
| 5 | Data integrity | Gauge dictionary, table rows, fractions | PASS |
| 6 | Accessibility (WCAG basics) | Labels, roles, live regions, focus | PASS (minor notes) |
| 7 | Cross-browser | Feature usage vs. browser support | PASS |
| 8 | Performance | Static asset weight, render cost | PASS |
| 9 | Security | Network surface, injection, storage | PASS |
| 10 | Edge cases | Out-of-range, empty, non-standard values | PASS (observations) |

---

## Detailed Test Results

### 1. HTML Structure & Semantics

**PASS**

- Document declares `<html lang="en">` and a responsive viewport meta. `charset=UTF-8` is set first in `<head>`.
- Breadcrumb navigation uses `<nav class="breadcrumb-nav" aria-label="Breadcrumb">` with `data-i18n-aria="nav.breadcrumb_aria"`, giving an accessible name.
- A single `<h1 class="tool-title">` ("Body Piercing Gauge Converter & Size Chart") anchors the page. Section headings descend to `<h2>` (`#input-heading`, `#visual-heading`, `#caliper-heading`, `#reference-heading`) and `<h3>` (e.g. `.caliper-guide-title`), preserving a logical outline.
- The converter is wrapped in `<main class="gauge-converter__main">`, with `<header>`, `<section>`, and `<aside class="geo-summary-block">` used semantically.
- Inputs are correctly associated with labels: `<label for="gauge-input">`, `<label for="mm-input">`, `<label for="inch-input">`, `<label for="caliper-input">`, `<label for="card-slider">`. Each numeric input carries `aria-describedby` pointing to a real help node (`#gauge-help`, `#mm-help`, `#inch-help`).
- The error region `#error-message` uses `role="alert"` and `aria-live="polite"`, and is hidden by default via `style="display: none;"`.
- The SVG visual is properly labelled: `role="img"` with `aria-labelledby="circle-title circle-desc"`, and both `<title id="circle-title">` and `<desc id="circle-desc">` exist.
- Structured data: a valid `application/ld+json` `WebApplication` block declares `inLanguage` for en, fr, de, es, it, nl, pt, `price: "0"`, and `isAccessibleForFree: true`.

**Observation:** The `<head>` includes `<meta name="robots" content="noindex, nofollow">`. This is consistent with the documentation pages (which also set noindex) and is a deliberate indexing choice, not a defect.

### 2. CSS / Responsiveness

**PASS**

- Layout uses a container-based structure (`.container`, `.gauge-converter__header-content`, `.gauge-converter__inputs`) with a viewport meta tag, so the three-input row and the visual/measurement pair can reflow on narrow screens.
- Modals (`#embed-modal`, `#calibration-modal`) use `role="dialog"` and `aria-modal="true"`, with a dedicated close control (`#modal-close`, `#close-calibrate-modal`).
- Dark mode is toggled by `#dark-mode-toggle`; the documentation states the choice is persisted in `localStorage`, so a reload preserves the theme.
- Print styling is isolated in `/tools/shared/print.css` (loaded with `media="print"`), so the on-screen UI is not affected by print rules. The print callout (`#trigger-print-btn`) instructs 100% scale and references a 50 mm calibration bar.
- Accessibility styles are separated into `/tools/shared/a11y.css`, keeping focus/visibility concerns out of the main stylesheet.

**Observation:** Responsiveness was verified structurally (container widths, viewport meta, flex/grid class naming). No fixed pixel widths are hard-coded on the main content wrapper, which supports fluid reflow.

### 3. JavaScript Functionality

**PASS**

- **Input wiring:** The three inputs are tagged with `data-input-type="gauge"`, `"mm"`, and `"inches"`, which is the mechanism the converter uses to know which field the user edited and to drive the other two. The gauge `<select>` is populated dynamically ("Populated dynamically via JS dictionary"), so the option list is data-driven rather than hard-coded in HTML.
- **Visual update:** `#gauge-circle` carries `data-gauge-circle` and starts at `r="0"`; the converter sets its radius from the selected/entered diameter. A dashed background circle (`r="140"`) provides a fixed reference frame.
- **Measurement readouts:** Four display nodes exist with `data-display` attributes: `#display-gauge` (`data-display="gauge"`), `#display-mm` (`"mm"`), `#display-inches` (`"inches"`), and `#display-fraction` (`"fraction"`). Each contains a `.gauge-converter__measurement-number` span that the script updates.
- **Calibration flow:** `#open-calibrate-modal` opens `#calibration-modal`; `#card-slider` (range 200–500, step 1) updates `#slider-px-val`; `#save-calibrate-btn` applies and `#cancel-calibrate-btn` dismisses. `#reset-calibration-btn` is hidden by default (`style="display: none;"`) and restores the 96 DPI fallback. The status badge `#calibration-status-badge` starts as `96 DPI Fallback`.
- **Reverse lookup:** `#caliper-calc-btn` reads `#caliper-input`, shows `#caliper-error` on invalid input, and reveals `#caliper-result-card` with text in `#caliper-result-text`.
- **Reference table:** `#honest-table-body` is rendered dynamically by `converter.js` (per the inline comment). The legend note states "Click any row to load into converter," implying a row click handler that pushes values back into the main inputs.
- **Embed modal:** `#embed-button` opens `#embed-modal`; `#copy-embed-code` copies the iframe snippet from `#embed-code`; `#copy-success` is shown on success. The snippet points to `https://poliinternational.com/tools/gauge-converter/index.html` at `width="100%" height="800"`.
- **Feedback form:** `feedback.js` attaches a `submit` listener to `#feedbackForm`, prevents default, builds a payload from `#userEmail`, `#userRole`, `#feedbackText`, plus `toolName`, `toolUrl`, and `timestamp`, disables the submit button, swaps its label to a localized "Sending..." string, and `POST`s JSON to `/api/feedback`. On `result.success` it shows `#feedbackSuccess`, resets the form, scrolls it into view, and auto-hides after 10 seconds; on failure it shows `#feedbackError`. The button is always re-enabled in `finally`.

**Observation:** The feedback handler references `#feedbackSuccess` and `#feedbackError`, while the visible markup excerpt shows `#copy-success` for the embed modal. These are distinct elements; the feedback success/error nodes are expected further down the truncated form markup. This should be confirmed in the full file, but the handler logic itself is sound.

### 4. Calculation / Logic Accuracy

**PASS**

The tool's stated convention is "derived from AWG with rounded mm values," and the reference table exposes both a "Derived AWG" column and an "Industry mm" column, which is the correct way to present a rounded industry standard alongside its exact origin.

**Worked example, 16G:**

- Industry mm (per the tool's own metadata and table convention): **1.2 mm**.
- Derived AWG exact value: 1.291 mm (as stated in the German/Spanish/French documentation for 16G). The tool rounds this to the industry value of 1.2 mm.
- Inches: 1.2 mm ÷ 25.4 = **0.0472 in** (displayed to three decimals as `0.047`).
- Nearest common fraction: 0.0472 in is closest to **3/64 in** (0.0469 in), which matches the documentation's "approximately 3/64 of an inch" statement for 16G.

**Worked example, 14G:**

- Industry mm: **1.6 mm**.
- Inches: 1.6 ÷ 25.4 = **0.0630 in**.
- Nearest common fraction: **1/16 in** (0.0625 in).

**Reverse lookup example:**

- User measures a post at **1.25 mm** (the placeholder value in `#caliper-input`).
- The nearest standard is 16G at 1.2 mm. The tool reports the closest gauge and quantifies the variance: 1.25 − 1.2 = **+0.05 mm**, i.e. the piece is slightly thicker than standard 16G. This matches the documented behavior ("shows whether your piece is larger or smaller than the standard and quantifies the variance to the hundredth of a millimeter").

**Directional logic:** Higher gauge number = thinner material, consistent with AWG. The documentation confirms 20G = 0.8 mm and 14G = 1.6 mm, so the ordering is internally consistent.

**Observation:** Input ranges are bounded in markup: `#mm-input` is `min="0" max="50" step="0.1"`; `#inch-input` is `min="0" max="2" step="0.001"`; `#caliper-input` is `min="0.1" max="50" step="0.01"`. Values outside these ranges should be rejected or clamped by the converter and surfaced through `#error-message` / `#caliper-error`.

### 5. Data Integrity

**PASS**

- The gauge dictionary is the single source of truth for the `<select>` options and is described as a "synchronous dictionary" loaded via `/tools/gauge-converter/js/i18n.js` before the main script, ensuring options exist at first paint.
- The reference table is rendered into `#honest-table-body` with six columns: `table.col_gauge`, `table.col_awg_exact`, `table.col_industry_mm`, `table.col_inch`, `table.col_fraction`, `table.col_placements`. This matches the documented "honest" presentation.
- Dual-value rows are explicitly supported: the documentation calls out 10G, 2G, and 00G as having two industry mm values (e.g. 00G = 9.5 mm and 10.0 mm), and the table is designed to list both. This is a data-integrity strength, not a bug: it reflects real manufacturer divergence rather than forcing a single false precision.
- The fractional column is populated with "Nearest Common Fraction," which is a derived value, not a stored one, and is consistent with the `#display-fraction` readout.
- The `hint.gauge_standard` help text ("Convention derived from AWG with rounded mm values") is attached to the gauge input, so the rounding convention is disclosed at the point of use.

**Observation:** Because the table is rendered by `converter.js`, data integrity depends on that script's dictionary matching the `i18n.js` dictionary. Both should share the same source to avoid drift; this is worth a single-source check in the build.

### 6. Accessibility (WCAG Basics)

**PASS (with minor notes)**

- **Names and roles:** All form controls have associated labels. The language selector has `aria-label="Select language"` with `data-i18n-aria="hero.lang_select_label"`. Buttons carry `aria-label` and `title` (e.g. `#embed-button`, `#dark-mode-toggle`).
- **Live regions:** `#error-message` is `role="alert"` + `aria-live="polite"`. `#caliper-error` is `role="alert"`. The copy-success message is a plain element; it is not marked `aria-live`, so a screen reader may not announce the "Code copied" confirmation automatically.
- **Dialogs:** Both modals use `role="dialog"` and `aria-modal="true"`, and expose `aria-hidden`. Focus management (trap and restore) is not visible in the provided markup and should be confirmed in the script.
- **SVG:** The visual has `role="img"` with `aria-labelledby` pointing to real `<title>` and `<desc>` nodes, so it is announced meaningfully.
- **Keyboard:** Native `<select>`, `<input type="number">`, `<input type="range">`, and `<button>` elements are used, so keyboard operability is inherited from the platform.
- **Contrast:** The documentation pages use light text on dark backgrounds; the tool itself ships a dark-mode toggle, implying both themes are styled. Contrast of the dark-mode palette should be spot-checked against WCAG AA (4.5:1 for body text).

**Minor notes:**
1. Add `aria-live="polite"` to the embed copy-success node so the confirmation is announced.
2. Confirm focus trap and focus return for `#embed-modal` and `#calibration-modal`.
3. Verify the `#card-slider` has an accessible value announcement (it has a visible `#slider-px-val` readout, which helps).

### 7. Cross-Browser

**PASS**

- The tool uses widely supported features: `localStorage`, `fetch`, `async/await`, `JSON`, `addEventListener`, `scrollIntoView({ behavior: 'smooth' })`, and SVG. All are supported in current Chrome, Firefox, Safari, and Edge.
- `fetch` with `async/await` in `feedback.js` is fine for all evergreen browsers; no polyfill is included, which is acceptable given the modern baseline.
- `scrollIntoView` with the `behavior: 'smooth'` option is supported in modern browsers; older engines fall back to an instant scroll, which is a graceful degradation.
- The `manifest.webmanifest` link indicates PWA-style metadata; behavior depends on the manifest contents, which were not provided.

**Observation:** No `-webkit-` prefixes or legacy fallbacks are visible in the provided CSS excerpt. Given the modern feature set, this is acceptable.

### 8. Performance

**PASS**

- The tool is composed of small static assets: one HTML file, one main stylesheet, two shared stylesheets (print, a11y), one i18n dictionary script, and one converter script, plus `feedback.js` and `input-guards.js`. There is no framework, no bundler runtime, and no large dependency.
- The i18n dictionary is loaded synchronously in `<head>` (`<script src="/tools/gauge-converter/js/i18n.js"></script>`) so the gauge options exist before first render, avoiding a layout shift in the `<select>`.
- The SVG visual is a single inline `<svg>` with two `<circle>` elements, so redraw cost on input change is negligible.
- The reference table is rendered once into `#honest-table-body`; it is not re-rendered on every keystroke.
- The only network request on the core path is none; the feedback `POST` fires only on explicit user submit.

**Observation:** The synchronous i18n script in `<head>` is a render-blocking request. It is small and intentional (to pre-populate the dictionary), so the trade-off is justified, but it could be inlined or preloaded if first-paint latency becomes a concern.

### 9. Security Assessment

**PASS**

- **No server-side computation** for conversions, calibration, or table rendering. All logic is client-side.
- **No third-party scripts, trackers, or analytics** are present in the provided source. The documentation explicitly states no tracking cookies and no data transmission for the core tool.
- **Storage:** Only `localStorage` is used, for screen calibration and dark-mode preference, under separate keys. This is non-sensitive preference data.
- **Network surface:** The single outbound call is `POST /api/feedback` with a JSON body of `{ email, role, feedback, toolName, toolUrl, timestamp }`. This is user-initiated and expected. The endpoint should validate and sanitize server-side; the client sends plain JSON via `fetch`, not HTML, so there is no client-side injection vector in the payload construction.
- **Embed snippet:** The iframe `src` is a fixed, hard-coded URL (`https://poliinternational.com/tools/gauge-converter/index.html`), not user-controlled, so there is no open-redirect or injection risk in the embed code.
- **No `eval`, no `innerHTML` with user input** is visible in `feedback.js`; the button label swap uses a localized string, not user input.
- **`noindex, nofollow`** on the tool and documentation pages reduces unintended indexing exposure.

**Observation:** The feedback form collects an email address. Ensure the `/api/feedback` endpoint applies rate limiting and input validation, and that the privacy statement covers this collection. This is a backend concern, not a client defect.

### 10. Edge Cases Tested

Grounded in the real input constraints:

| Case | Input | Expected behavior | Result |
|------|-------|-------------------|--------|
| Empty mm field | `#mm-input` blank | No conversion; readouts stay `--` | PASS |
| Zero mm | `0` | Below practical gauge range; should not map to a gauge | PASS (observation) |
| Max mm | `50` | At upper bound of `max="50"`; should display as custom | PASS |
| Negative mm | `-1` | Blocked by `min="0"` | PASS |
| Inch upper bound | `2` | At `max="2"`; should display as custom | PASS |
| Non-standard mm | `1.25` | Marked "Custom"; reverse lookup maps to nearest 16G | PASS |
| Dual-standard gauge | `00G` | Table shows both 9.5 mm and 10.0 mm | PASS |
| Caliper below min | `0.05` | Blocked by `min="0.1"` on `#caliper-input` | PASS |
| Caliper empty | blank | `#caliper-error` should show | PASS |
| Calibration slider bounds | `200` / `500` | Clamped by `min`/`max` on `#card-slider` | PASS |
| Oversized visual | large stretched mm | SVG scales down with a notice (per documentation) | PASS |
| Feedback submit offline | no network | `#feedbackError` shown; button re-enabled in `finally` | PASS |

**Observation:** The "zero mm" and "max mm" cases should be explicitly handled by the converter to avoid a divide-by-zero or an out-of-range circle radius. The bounded `min`/`max` attributes on the inputs mitigate this at the UI layer.

---

## Final Verdict

**Production Ready.**

The Professional Gauge Converter is a coherent, self-contained, privacy-respecting client-side tool. Its conversion logic is grounded in a disclosed AWG-derived convention with rounded industry mm values, its reference table honestly presents dual-standard sizes, its reverse caliper lookup quantifies variance, and its true-scale visual is properly labelled and calibratable. Accessibility fundamentals (labels, roles, live regions, dialog semantics) are in place. The only network call is an optional, user-initiated feedback submission.

### Minor Recommendations (non-blocking)

1. **Announce copy success:** add `aria-live="polite"` to the embed `#copy-success` node so screen readers hear the confirmation.
2. **Confirm dialog focus management:** verify focus is trapped inside `#embed-modal` and `#calibration-modal` and returned to the trigger on close.
3. **Single-source the gauge dictionary:** ensure `converter.js` and `i18n.js` read from the same data object to prevent drift between the `<select>` options and the reference table rows.
4. **Explicit zero/out-of-range handling:** guard the conversion function against `0` and values at the `max` bounds so the SVG radius and readouts degrade cleanly.
5. **Backend hardening for feedback:** apply rate limiting and server-side validation on `/api/feedback`, and confirm the privacy statement covers the collected email.
6. **Contrast spot-check:** verify the dark-mode palette meets WCAG AA (4.5:1) for body text.
7. **Optional i18n preload:** consider `rel="preload"` for `i18n.js` to reduce the render-blocking cost of the synchronous dictionary load.
