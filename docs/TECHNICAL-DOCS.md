# Professional Gauge Converter & Size Chart - Technical Documentation v2.0

## System Architecture

### 1. Technology Stack
- **HTML5**: Semantic layout with accessibility features (`role="alert"`, `role="dialog"`, `role="button"`, `tabindex="0"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`).
- **CSS3**: CSS Custom Properties (`:root`, `body.light-mode`), SVG styling, and dedicated `@media print` true-scale styles. Strict enforcement of `[hidden] { display: none !important; }`.
- **Vanilla JavaScript (ES6+)**: Zero external browser libraries or remote CDNs. Runs under strict CSP `script-src 'self'`.
- **Pre-Render Synchronous i18n**: Loaded synchronously in `<head>` via `js/i18n.js` to eliminate raw key flashes. Supports 7 languages: EN, ES, FR, DE, IT, PT, NL. Choice stored under `poli_tools_language`.
- **Node.js Server**: Serves static files and provides a same-origin `/api/feedback` endpoint.

---

## Technical Specifications & Formulas

### 1. Honest Gauge & Stretched Size Standards
Body jewelry gauges are an industry convention derived from American Wire Gauge (AWG) with rounded millimeter values:
$$\text{AWG Diameter (mm)} = 0.127 \times 92^{\frac{36 - n}{39}}$$
Where $n$ is the gauge number (with $00\text{G} = -1$).
Due to manufacturing differences between European (metric) and US tooling, dual supplier values are handled explicitly:
- **10G**: Standard 2.4 mm (derived AWG 2.588 mm) vs. 2.5 mm
- **2G**: Standard 6.0 mm (derived AWG 6.544 mm) vs. 6.5 mm
- **00G**: Standard 10.0 mm (derived AWG 9.266 mm) vs. 9.5 mm

### 2. Stretched Sizes Above 00G
For stretched and plug dimensions above 00G, sizes are indexed in exact metric millimeters (11, 12, 14, 16, 19, 22, 25 mm) with the nearest common commercial fraction:
- 11 mm $\approx$ 7/16" (0.433")
- 12 mm $\approx$ 1/2" (0.472")
- 14 mm $\approx$ 9/16" (0.551")
- 16 mm $\approx$ 5/8" (0.630")
- 19 mm $\approx$ 3/4" (0.748")
- 22 mm $\approx$ 7/8" (0.866")
- 25 mm $\approx$ 1" (0.984")

### 3. Screen Calibration (ISO/IEC 7810 ID-1)
- Standard bank card / ID card width: $W_{\text{card}} = 85.60\text{ mm}$.
- User matches an on-screen card guide to physical card width $W_{\text{px}}$.
- Screen calibration factor:
  $$\text{pxPerMM} = \frac{W_{\text{px}}}{85.60}$$
- Stored in browser `localStorage` under `poli_screen_px_per_mm`.
- Fallback: Runtime probe or standard 96 DPI ($96 / 25.4 \approx 3.7795\text{ px/mm}$).

### 4. Reverse Caliper Lookup Algorithm
When a measured millimeter value $x$ is input:
$$\text{Diff} = |x - \text{standardMm}|$$
The algorithm iterates through all registered primary and dual sizes, selecting the record that minimizes $\text{Diff}$. If $\text{Diff} < 0.03\text{ mm}$, it is flagged as an exact match; otherwise, the delta and variance direction are displayed.

---

## CSP & Offline Isolation
- Zero external resources (`http://`, `https://`, `cdn`, `unpkg`, `unsplash` = 0).
- Pure client-side calculations and rendering.
