# Professional Gauge Converter - Complete Guide

## Target Keywords

**Primary keyword:** gauge converter

**Long-tail keywords (derived from the tool's real functions):**

1. gauge to mm converter for body jewelry
2. piercing gauge chart 16g 1.2mm 18g 1.0mm 20g 0.8mm
3. mm to gauge conversion for stretched ears
4. piercing size chart gauge to inches
5. how to measure piercing jewelry with digital calipers
6. find closest gauge from measured thickness
7. true scale piercing gauge chart on screen
8. calibrate screen with credit card for jewelry sizing
9. 00g in mm (9.5mm vs 10.0mm)
10. printable piercing gauge wall chart
11. AWG vs body piercing gauge sizes
12. fractional inches to gauge for body jewelry
13. reverse caliper lookup piercing post thickness
14. what gauge is 1.6mm piercing

---

## Meta Title

```
Gauge to mm Converter for Body Jewelry | Poli
```

## Meta Description

```
Interactive piercing gauge chart: 16g=1.2mm, 18g=1.0mm, 20g=0.8mm, 12g=2.0mm. True-scale visual, reverse caliper lookup, printable wall chart.
```

---

## H1 and Content Outline

**H1:** Professional Gauge Converter

**H2:** What is the Professional Gauge Converter?
**H2:** Who Should Use This Tool
**H2:** How to Use the Gauge Converter
- **H3:** Convert Between Gauge, Millimetres, and Inches
- **H3:** Calibrate Your Screen to True Scale
- **H3:** Read the True-Scale Visual Reference
- **H3:** Reverse Caliper Lookup for Unlabelled Pieces
- **H3:** Use the Honest Gauge & Size Reference Table
- **H3:** Print the True-Scale Wall Chart
- **H3:** Embed the Converter on Your Studio Website
**H2:** Worked Examples
**H2:** Frequently Asked Questions (FAQ)
**H2:** Structured Data
**H2:** Related Reading

---

## What is Professional Gauge Converter?

The Professional Gauge Converter is a free browser-based tool that converts body jewellery dimensions between three measurement systems used in piercing: gauge numbers, millimetres, and inches (decimal or fractional). It is built around a single converter panel with three linked inputs, a true-scale visual reference circle, a reverse caliper lookup, and a reference table.

The tool's core logic is grounded in the industry convention derived from American Wire Gauge (AWG) with rounded millimetre values. The gauge dropdown is populated dynamically, and the help text states plainly: "Convention derived from AWG with rounded mm values." The reference table exposes this by listing both the derived AWG value and the industry millimetre value side by side, so you can see where manufacturers round.

Three inputs drive the conversion:

- **Gauge Size** - a select populated from the tool's dictionary, covering standard sizes (e.g., 14G, 16G, 00G) and stretched millimetre values.
- **Millimetres (mm)** - a number field with step 0.1, range 0 to 50.
- **Inches (in)** - a number field with step 0.001, range 0 to 2.

Entering a value in any field updates the others. If a manually typed value matches a standard gauge within tolerance, that gauge is highlighted in the dropdown and table; values outside standard tolerances are labelled "Custom."

The visual reference section renders an SVG circle whose radius is set from the selected diameter. It runs on a 96 DPI fallback by default, and a calibration modal lets you match an on-screen guide box to a standard ISO/IEC 7810 ID-1 card (85.60 mm wide) using a 200 to 500 pixel slider. Saving the calibration stores the pixel density locally and updates the status badge from "96 DPI Fallback" to your calibrated scale. A reset button returns it to 96 DPI.

The reverse caliper lookup takes a measured thickness in millimetres (step 0.01, range 0.1 to 50), finds the closest standard gauge, and reports the variance. The reference table lists gauge, derived AWG, industry mm, approximate inches, nearest common fraction, and typical starting placements, and any row can be clicked to load its values into the converter. A print button produces a one-page wall chart with a 50 mm verification bar.

Everything runs locally in the browser. Calibration and dark mode preferences are stored in localStorage; no measurements are transmitted.

---

## Who Should Use This Tool

- **Professional piercers** selecting initial jewellery thickness or confirming the exact gauge of a replacement post for a downsize appointment.
- **Piercing apprentices** learning standard gauge equivalents, the AWG origin of the numbering, and typical starting placements.
- **Studio front-desk and inventory staff** reconciling physical caliper readings against manufacturer packaging specs.
- **Clients and collectors** checking whether a piece matches their healed piercing channel before buying or inserting it.
- **Studio owners** who want a free, embeddable sizing reference for their own website.

---

## How to Use the Gauge Converter

### Convert Between Gauge, Millimetres, and Inches

1. Go to the **Size Converter** section at the top of the tool.
2. Pick a size from the **Gauge Size** dropdown. The **Millimetres (mm)** and **Inches (in)** fields fill in immediately.
3. Or type a known value into either number field. Entering **Millimetres (mm)** calculates decimal and fractional inches; entering **Inches (in)** calculates the exact millimetres.
4. If your typed value matches a standard gauge within tolerance, that gauge is highlighted in the dropdown and table. Values outside standard tolerances show as **Custom**.
5. If a value falls outside the accepted range, an inline error message appears in the alert region below the inputs.

### Calibrate Your Screen to True Scale

1. Click **Calibrate Screen Scale** next to the visual reference heading to open the calibration modal.
2. Take a standard ISO/IEC 7810 ID-1 card (bank card or ID card, 85.60 mm wide).
3. Hold it flat against your display over the guide box.
4. Drag the **Adjust width in screen pixels** slider (200 to 500 px) until the guide box matches your card exactly. The current pixel value is shown live next to the slider.
5. Click **Save & Apply Calibration**. The status badge changes from **96 DPI Fallback** to your calibrated scale.
6. Click **Reset to Default (96 DPI)** at any time to return to the fallback.

### Read the True-Scale Visual Reference

1. After selecting or typing a measurement, look at the circle in the **True-Scale Visual Reference** panel.
2. Once calibrated, the inner circle represents the actual physical diameter of the selected size.
3. Read the four measurement cards next to the circle: **Gauge:**, **Diameter:** (mm), **Inches:**, and **Fractional:**.
4. If a large stretched size exceeds the preview frame, the graphic scales down proportionally with an explanatory note so the full shape stays visible.

### Reverse Caliper Lookup for Unlabelled Pieces

1. Zero your digital calipers while fully closed.
2. Measure the thickness of the post or wire directly across the shaft, avoiding balls, flares, or threads.
3. Take three gentle readings along the wearable area to confirm uniformity.
4. Scroll to **Measure Your Own Piece (Reverse Lookup)** and enter the value in **Measured Caliper Thickness (mm):** (e.g. 1.25).
5. Click **Find Closest Gauge**. The result card reports the closest standard gauge, whether your piece is larger or smaller than standard, and the variance in millimetres.

### Use the Honest Gauge & Size Reference Table

1. Scroll to the **Honest Gauge & Size Reference Table**.
2. Compare the columns: **Gauge / Size**, **Derived AWG**, **Industry mm**, **Approx. Inches**, **Nearest Common Fraction**, and **Typical Starting Placements**.
3. Note rows with dual millimetre values (such as 10G, 2G, and 00G), which flag real manufacturer discrepancies. The table intro states: "The piece's own specification wins."
4. Click any row to load its dimensions into the converter and update the true-scale circle.

### Print the True-Scale Wall Chart

1. Click **Print 1-Page Wall Chart** below the reference table.
2. In your system print dialog, set scaling to 100% (disable "fit to page" or "shrink to fit").
3. Use standard A4 or US Letter paper.
4. After printing, place a real ruler against the printed **50 mm calibration bar**. If it measures exactly 50 mm, the chart is at true 1:1 scale.

### Embed the Converter on Your Studio Website

1. Click **Free Embed** in the header.
2. Review the responsive iframe snippet in the modal.
3. Click **Copy Code** to copy it, or **Download HTML File** for a standalone offline copy.
4. Paste the iframe into your studio website's CMS. No API key or registration is required.

---

## Worked Examples

**Example 1: Confirming a 16G cartilage post in millimetres**

A client asks what 16 gauge means in metric. Open the **Gauge Size** dropdown and select 16G. The **Millimetres (mm)** field reads 1.2 and **Inches (in)** reads approximately 0.047. The **Fractional** card shows the nearest common fraction (about 3/64 in). The reference table row for 16G lists the derived AWG value of 1.291 mm against the industry value of 1.2 mm, so you can explain the rounding to the client.

**Example 2: Identifying an unlabelled post with calipers**

A drawer of loose posts has no packaging. Zero your digital calipers, measure across the wearable shaft, and get 1.25 mm. Enter **1.25** into **Measured Caliper Thickness (mm):** and click **Find Closest Gauge**. The result card reports the closest standard gauge (16G at 1.2 mm) and the variance (0.05 mm larger than standard), so you know the piece sits just above nominal 16G.

**Example 3: Checking a 00G stretched lobe**

A client is sizing up and asks whether 00G is 9.5 mm or 10 mm. Select 00G in the dropdown. The reference table shows both industry values for 00G, and the **Diameter** card reflects the selected value. Because the table lists both, you can advise the client to check the original packaging, since a 0.5 mm difference matters in a stretched lobe.

---

## Frequently Asked Questions (FAQ)

**What is the difference between gauge and millimetres for body jewellery?**
Gauge is a numbering convention derived from American Wire Gauge (AWG), while millimetres are the metric measurement. The tool's help text notes the convention uses rounded mm values, so 16G is listed as 1.2 mm even though the derived AWG value is 1.291 mm.

**How much is 16 gauge in mm?**
16G is 1.2 mm in the industry convention used by this tool. The reference table also shows the derived AWG value of 1.291 mm so you can see the rounding.

**Does a higher gauge number mean thicker or thinner jewellery?**
A higher gauge number means thinner material. For example, 20G is 0.8 mm while 14G is 1.6 mm. Above 00G (roughly 9.5 mm to 10.0 mm), the industry stops using gauge and specifies pieces in millimetres or inch fractions.

**Why does 00G show both 9.5 mm and 10.0 mm?**
Manufacturers use different standards for 00G. The reference table lists both industry values and states that where manufacturers produce different standard diameters, both are listed, and the piece's own specification wins.

**How do I measure a piercing post with digital calipers?**
Zero your calipers while fully closed, then measure directly across the smooth wearable shaft, avoiding balls, flares, or threads. Take three gentle readings along the wearable area to confirm uniformity, then enter the value into the reverse lookup field.

**How does the reverse caliper lookup work?**
Enter a measured thickness in millimetres (step 0.01, range 0.1 to 50) and click **Find Closest Gauge**. The tool reports the closest standard gauge, whether your piece is larger or smaller than standard, and the variance.

**How does the screen calibration with a card work?**
Monitors have different pixel densities, so 100 pixels are not the same physical distance on every screen. By matching the on-screen guide box to a standard ISO/IEC 7810 ID-1 card (85.60 mm wide) using the 200 to 500 pixel slider, the tool calculates your screen's actual pixel-per-millimetre ratio.

**Can I print the gauge chart at true scale?**
Yes. Click **Print 1-Page Wall Chart**, set your print dialog to 100% scale (no fit-to-page) on A4 or US Letter, then verify the printed 50 mm calibration bar with a ruler. If it measures 50 mm, the chart is at true 1:1 scale.

**Can I embed this converter on my studio website for free?**
Yes. Click **Free Embed** to get a responsive iframe snippet. The modal states it is completely free with no attribution required. You can also download a standalone HTML file for offline use.

**Does the tool store or send my measurements?**
No. All calculations and calibration run locally in your browser. Calibration values and dark mode preference are stored in localStorage, and no measurements are transmitted to any server.

---

## Structured Data

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Professional Gauge Converter",
      "url": "https://poliinternational.com/tools/gauge-converter/",
      "description": "Convert between gauge sizes, millimetres, and fractional inches with calibrated true-scale visual reference and reverse caliper lookup.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "inLanguage": ["en", "fr", "de", "es", "it", "nl", "pt"],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "Poli International",
        "url": "https://poliinternational.com"
      },
      "isAccessibleForFree": true
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much is 16 gauge in mm?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "16G is 1.2 mm in the industry convention used by this tool. The reference table also shows the derived AWG value of 1.291 mm so you can see the rounding."
          }
        },
        {
          "@type": "Question",
          "name": "Does a higher gauge number mean thicker or thinner jewellery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A higher gauge number means thinner material. For example, 20G is 0.8 mm while 14G is 1.6 mm. Above 00G (roughly 9.5 mm to 10.0 mm), the industry stops using gauge and specifies pieces in millimetres or inch fractions."
          }
        },
        {
          "@type": "Question",
          "name": "Why does 00G show both 9.5 mm and 10.0 mm?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Manufacturers use different standards for 00G. The reference table lists both industry values and states that where manufacturers produce different standard diameters, both are listed, and the piece's own specification wins."
          }
        },
        {
          "@type": "Question",
          "name": "How do I measure a piercing post with digital calipers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Zero your calipers while fully closed, then measure directly across the smooth wearable shaft, avoiding balls, flares, or threads. Take three gentle readings along the wearable area to confirm uniformity, then enter the value into the reverse lookup field."
          }
        },
        {
          "@type": "Question",
          "name": "How does the reverse caliper lookup work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter a measured thickness in millimetres (step 0.01, range 0.1 to 50) and click Find Closest Gauge. The tool reports the closest standard gauge, whether your piece is larger or smaller than standard, and the variance."
          }
        },
        {
          "@type": "Question",
          "name": "How does the screen calibration with a card work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Monitors have different pixel densities, so 100 pixels are not the same physical distance on every screen. By matching the on-screen guide box to a standard ISO/IEC 7810 ID-1 card (85.60 mm wide) using the 200 to 500 pixel slider, the tool calculates your screen's actual pixel-per-millimetre ratio."
          }
        },
        {
          "@type": "Question",
          "name": "Can I print the gauge chart at true scale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Click Print 1-Page Wall Chart, set your print dialog to 100% scale (no fit-to-page) on A4 or US Letter, then verify the printed 50 mm calibration bar with a ruler. If it measures 50 mm, the chart is at true 1:1 scale."
          }
        },
        {
          "@type": "Question",
          "name": "Can I embed this converter on my studio website for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Click Free Embed to get a responsive iframe snippet. The modal states it is completely free with no attribution required. You can also download a standalone HTML file for offline use."
          }
        },
        {
          "@type": "Question",
          "name": "Does the tool store or send my measurements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. All calculations and calibration run locally in your browser. Calibration values and dark mode preference are stored in localStorage, and no measurements are transmitted to any server."
          }
        }
      ]
    }
  ]
}
```

---

## Related Reading

Internal linking suggestions for Poli wiki/blog topics that match this tool's subject:

- **Gauge vs Millimetres: Why Body Jewellery Uses Two Systems** - explains the AWG origin and rounding convention the tool's help text references.
- **How to Measure Piercing Jewellery with Digital Calipers** - expands on the three-step measuring guide built into the reverse lookup section.
- **Understanding 00G: The 9.5 mm vs 10.0 mm Manufacturer Split** - a deep dive on the dual-value rows in the reference table.
- **Initial Piercing Gauges by Placement** - supports the "Typical Starting Placements" column of the reference table.
- **Screen Calibration for True-Scale Jewellery Previews** - explains the ISO/IEC 7810 ID-1 card method used in the calibration modal.
- **Printing True-Scale Studio Reference Charts** - covers the 100% scale and 50 mm verification bar workflow.
- **ASTM F-136 and ASTM F-138 in Piercing Jewellery** - background on the material standards referenced in the tool's safety advisory.
- **Embedding Free Poli Tools on Your Studio Website** - walkthrough for the Free Embed iframe snippet.
