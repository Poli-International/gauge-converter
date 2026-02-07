/**
 * Professional Gauge Converter - JavaScript Logic
 * Poli International
 *
 * Handles conversion logic, user interactions, and dynamic updates
 */

'use strict';

// ============================================
// CONSTANTS & CONVERSION DATA
// ============================================

/**
 * Accurate gauge to millimeter conversion table
 * Based on American Wire Gauge (AWG) standard for body jewelry
 */
const GAUGE_TO_MM = {
  '00G': 10.0,
  '0G': 8.0,
  '1G': 7.0,
  '2G': 6.0,
  '4G': 5.0,
  '6G': 4.0,
  '8G': 3.2,
  '10G': 2.4,
  '12G': 2.0,
  '14G': 1.6,
  '16G': 1.2,
  '18G': 1.0,
  '20G': 0.8,
  '22G': 0.6
};

/**
 * Reverse lookup: MM to Gauge (for finding closest gauge)
 */
const MM_TO_GAUGE = Object.entries(GAUGE_TO_MM).reduce((acc, [gauge, mm]) => {
  acc[mm] = gauge;
  return acc;
}, {});

/**
 * Constants for conversions and display
 */
const MM_PER_INCH = 25.4;
const PIXELS_PER_MM = 3.78; // Standard 96 DPI display (1 inch = 96px, 96/25.4 ≈ 3.78)
const SVG_CENTER_X = 150;
const SVG_CENTER_Y = 150;
const MAX_CIRCLE_RADIUS = 140; // Maximum radius in SVG viewBox
const DEBOUNCE_DELAY = 300; // milliseconds

// ============================================
// CONVERSION FUNCTIONS
// ============================================

/**
 * Convert gauge size to millimeters
 * @param {string} gauge - Gauge size (e.g., "14G", "16G")
 * @returns {number|null} - Diameter in millimeters or null if invalid
 */
function gaugeToMM(gauge) {
  if (!gauge || gauge === '') return null;
  return GAUGE_TO_MM[gauge] || null;
}

/**
 * Convert millimeters to inches
 * @param {number} mm - Millimeters
 * @returns {number|null} - Inches (3 decimal places) or null if invalid
 */
function mmToInches(mm) {
  if (mm === null || mm === undefined || mm === '') return null;
  const mmNum = parseFloat(mm);
  if (isNaN(mmNum) || mmNum < 0) return null;
  return parseFloat((mmNum / MM_PER_INCH).toFixed(3));
}

/**
 * Convert inches to millimeters
 * @param {number} inches - Inches
 * @returns {number|null} - Millimeters (1 decimal place) or null if invalid
 */
function inchesToMM(inches) {
  if (inches === null || inches === undefined || inches === '') return null;
  const inchNum = parseFloat(inches);
  if (isNaN(inchNum) || inchNum < 0) return null;
  return parseFloat((inchNum * MM_PER_INCH).toFixed(1));
}

/**
 * Find the closest gauge size for a given millimeter measurement
 * @param {number} mm - Millimeters
 * @returns {string|null} - Closest gauge size or null if out of range
 */
function mmToClosestGauge(mm) {
  if (mm === null || mm === undefined || mm === '') return null;
  const mmNum = parseFloat(mm);
  if (isNaN(mmNum) || mmNum < 0) return null;

  // Direct match
  if (MM_TO_GAUGE[mmNum]) {
    return MM_TO_GAUGE[mmNum];
  }

  // Find closest match
  const gauges = Object.keys(GAUGE_TO_MM);
  let closestGauge = null;
  let smallestDiff = Infinity;

  gauges.forEach(gauge => {
    const gaugeMM = GAUGE_TO_MM[gauge];
    const diff = Math.abs(gaugeMM - mmNum);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestGauge = gauge;
    }
  });

  return closestGauge;
}

/**
 * Find the closest gauge size for a given inch measurement
 * @param {number} inches - Inches
 * @returns {string|null} - Closest gauge size or null if out of range
 */
function inchesToClosestGauge(inches) {
  const mm = inchesToMM(inches);
  return mmToClosestGauge(mm);
}

// ============================================
// DOM MANIPULATION FUNCTIONS
// ============================================

/**
 * Update the visual SVG circle radius based on millimeter size
 * @param {number} mm - Diameter in millimeters
 */
function updateCircleDisplay(mm) {
  const circle = document.getElementById('gauge-circle');
  if (!circle) return;

  if (mm === null || mm === undefined || mm === '') {
    // Reset circle to invisible
    circle.setAttribute('r', '0');
    return;
  }

  const mmNum = parseFloat(mm);
  if (isNaN(mmNum) || mmNum <= 0) {
    circle.setAttribute('r', '0');
    return;
  }

  // Calculate radius in pixels (diameter / 2 * pixels per mm)
  // Scale to fit within SVG viewBox if necessary
  let radiusPixels = (mmNum / 2) * PIXELS_PER_MM;

  // Cap at maximum viewable radius
  if (radiusPixels > MAX_CIRCLE_RADIUS) {
    radiusPixels = MAX_CIRCLE_RADIUS;
  }

  // Animate the circle size change
  circle.setAttribute('r', radiusPixels.toFixed(2));
}

/**
 * Update the measurement display panel
 * @param {object} values - Object containing gauge, mm, and inches values
 */
function updateMeasurementDisplay(values) {
  const { gauge, mm, inches } = values;

  // Update gauge display
  const gaugeDisplay = document.querySelector('#display-gauge .gauge-converter__measurement-number');
  if (gaugeDisplay) {
    gaugeDisplay.textContent = gauge || '--';
  }

  // Update mm display
  const mmDisplay = document.querySelector('#display-mm .gauge-converter__measurement-number');
  if (mmDisplay) {
    mmDisplay.textContent = mm !== null ? `${mm} mm` : '-- mm';
  }

  // Update inches display
  const inchesDisplay = document.querySelector('#display-inches .gauge-converter__measurement-number');
  if (inchesDisplay) {
    inchesDisplay.textContent = inches !== null ? `${inches} in` : '-- in';
  }
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (!errorElement) return;

  errorElement.textContent = message;
  errorElement.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideError();
  }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
  const errorElement = document.getElementById('error-message');
  if (!errorElement) return;

  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

/**
 * Clear all inputs
 */
function clearAllInputs() {
  const gaugeInput = document.getElementById('gauge-input');
  const mmInput = document.getElementById('mm-input');
  const inchInput = document.getElementById('inch-input');

  if (gaugeInput) gaugeInput.value = '';
  if (mmInput) mmInput.value = '';
  if (inchInput) inchInput.value = '';

  updateCircleDisplay(null);
  updateMeasurementDisplay({ gauge: null, mm: null, inches: null });
  hideError();
}

// ============================================
// INPUT VALIDATION
// ============================================

/**
 * Validate numeric input
 * @param {string} value - Input value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean} - True if valid, false otherwise
 */
function validateNumericInput(value, min = 0, max = Infinity) {
  if (value === '' || value === null || value === undefined) return true; // Empty is valid (for clearing)

  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (num < min || num > max) return false;

  return true;
}

// ============================================
// EVENT HANDLERS
// ============================================

let debounceTimer = null;

/**
 * Handle gauge input change
 */
function handleGaugeChange() {
  hideError();

  const gaugeInput = document.getElementById('gauge-input');
  const gauge = gaugeInput.value;

  if (!gauge || gauge === '') {
    clearAllInputs();
    return;
  }

  // Get MM value from gauge
  const mm = gaugeToMM(gauge);
  if (mm === null) {
    showError('Invalid gauge selection');
    return;
  }

  // Convert to inches
  const inches = mmToInches(mm);

  // Update other inputs
  const mmInput = document.getElementById('mm-input');
  const inchInput = document.getElementById('inch-input');

  if (mmInput) mmInput.value = mm.toFixed(1);
  if (inchInput) inchInput.value = inches.toFixed(3);

  // Update displays
  updateCircleDisplay(mm);
  updateMeasurementDisplay({ gauge, mm: mm.toFixed(1), inches: inches.toFixed(3) });
}

/**
 * Handle MM input change (with debouncing)
 */
function handleMMChange() {
  hideError();

  // Clear previous timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Debounce for performance
  debounceTimer = setTimeout(() => {
    const mmInput = document.getElementById('mm-input');
    const mmValue = mmInput.value;

    if (!mmValue || mmValue === '') {
      clearAllInputs();
      return;
    }

    // Validate input
    if (!validateNumericInput(mmValue, 0, 20)) {
      showError('Please enter a valid measurement between 0 and 20 mm');
      return;
    }

    const mm = parseFloat(mmValue);

    // Find closest gauge
    const gauge = mmToClosestGauge(mm);

    // Convert to inches
    const inches = mmToInches(mm);

    // Update other inputs
    const gaugeInput = document.getElementById('gauge-input');
    const inchInput = document.getElementById('inch-input');

    if (gaugeInput) gaugeInput.value = gauge || '';
    if (inchInput) inchInput.value = inches !== null ? inches.toFixed(3) : '';

    // Update displays
    updateCircleDisplay(mm);
    updateMeasurementDisplay({
      gauge,
      mm: mm.toFixed(1),
      inches: inches !== null ? inches.toFixed(3) : null
    });
  }, DEBOUNCE_DELAY);
}

/**
 * Handle inches input change (with debouncing)
 */
function handleInchesChange() {
  hideError();

  // Clear previous timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Debounce for performance
  debounceTimer = setTimeout(() => {
    const inchInput = document.getElementById('inch-input');
    const inchValue = inchInput.value;

    if (!inchValue || inchValue === '') {
      clearAllInputs();
      return;
    }

    // Validate input
    if (!validateNumericInput(inchValue, 0, 1)) {
      showError('Please enter a valid measurement between 0 and 1 inch');
      return;
    }

    const inches = parseFloat(inchValue);

    // Convert to mm
    const mm = inchesToMM(inches);

    // Find closest gauge
    const gauge = inchesToClosestGauge(inches);

    // Update other inputs
    const gaugeInput = document.getElementById('gauge-input');
    const mmInput = document.getElementById('mm-input');

    if (gaugeInput) gaugeInput.value = gauge || '';
    if (mmInput) mmInput.value = mm !== null ? mm.toFixed(1) : '';

    // Update displays
    updateCircleDisplay(mm);
    updateMeasurementDisplay({
      gauge,
      mm: mm !== null ? mm.toFixed(1) : null,
      inches: inches.toFixed(3)
    });
  }, DEBOUNCE_DELAY);
}

/**
 * Handle table row click (auto-fill from reference table)
 * @param {Event} event - Click or keyboard event
 */
function handleTableRowClick(event) {
  const row = event.currentTarget;

  // Get data attributes
  const gauge = row.getAttribute('data-gauge');
  const mm = row.getAttribute('data-mm');
  const inches = row.getAttribute('data-inches');

  if (!gauge || !mm || !inches) return;

  // Update inputs
  const gaugeInput = document.getElementById('gauge-input');
  const mmInput = document.getElementById('mm-input');
  const inchInput = document.getElementById('inch-input');

  if (gaugeInput) gaugeInput.value = gauge;
  if (mmInput) mmInput.value = mm;
  if (inchInput) inchInput.value = inches;

  // Update displays
  updateCircleDisplay(parseFloat(mm));
  updateMeasurementDisplay({ gauge, mm, inches });

  hideError();

  // Scroll to top to see the updated values (helpful on mobile)
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handle keyboard events on table rows (Enter or Space to activate)
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleTableRowKeyPress(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleTableRowClick(event);
  }
}

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

/**
 * Initialize dark mode from localStorage
 */
function initDarkMode() {
  // Check localStorage for saved preference
  const savedMode = localStorage.getItem('gauge-converter-theme');

  // If no saved preference, default to dark mode (no class)
  if (savedMode === 'light') {
    document.body.classList.add('light-mode');
  }
  // Default is dark mode (no class needed, :root styles apply)
}

/**
 * Toggle between dark and light mode
 */
function toggleDarkMode() {
  const body = document.body;

  // Toggle the light-mode class
  body.classList.toggle('light-mode');

  // Save preference to localStorage
  if (body.classList.contains('light-mode')) {
    localStorage.setItem('gauge-converter-theme', 'light');
  } else {
    localStorage.setItem('gauge-converter-theme', 'dark');
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the converter when DOM is ready
 */
function initConverter() {
  // Initialize dark mode
  initDarkMode();
  // Get input elements
  const gaugeInput = document.getElementById('gauge-input');
  const mmInput = document.getElementById('mm-input');
  const inchInput = document.getElementById('inch-input');

  // Attach event listeners to inputs
  if (gaugeInput) {
    gaugeInput.addEventListener('change', handleGaugeChange);
  }

  if (mmInput) {
    mmInput.addEventListener('input', handleMMChange);
    mmInput.addEventListener('keyup', handleMMChange);
  }

  if (inchInput) {
    inchInput.addEventListener('input', handleInchesChange);
    inchInput.addEventListener('keyup', handleInchesChange);
  }

  // Attach event listeners to table rows
  const tableRows = document.querySelectorAll('.gauge-converter__table-row');
  tableRows.forEach(row => {
    row.addEventListener('click', handleTableRowClick);
    row.addEventListener('keypress', handleTableRowKeyPress);
  });

  // Attach dark mode toggle button
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  // Attach embed modal functionality
  initEmbedModal();

  // Attach email capture functionality
  initEmailCapture();

  // Initialize with empty state
  updateCircleDisplay(null);
  updateMeasurementDisplay({ gauge: null, mm: null, inches: null });

  console.log('Gauge Converter initialized successfully');
}

// ============================================
// EMBED MODAL FUNCTIONALITY
// ============================================

/**
 * Initialize embed modal
 */
function initEmbedModal() {
  const embedButton = document.getElementById('embed-button');
  const modal = document.getElementById('embed-modal');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const copyButton = document.getElementById('copy-embed-code');
  const embedCode = document.getElementById('embed-code');
  const successMessage = document.getElementById('copy-success');

  // Open modal
  if (embedButton && modal) {
    embedButton.addEventListener('click', function() {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  // Close modal function
  function closeModal() {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
      // Hide success message when closing
      if (successMessage) {
        successMessage.style.display = 'none';
      }
    }
  }

  // Close on X button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      closeModal();
    }
  });

  // Copy embed code to clipboard
  if (copyButton && embedCode) {
    copyButton.addEventListener('click', function() {
      const code = embedCode.textContent;

      // Use modern clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function() {
          showSuccess();
        }).catch(function(err) {
          console.error('Failed to copy:', err);
          fallbackCopy(code);
        });
      } else {
        // Fallback for older browsers
        fallbackCopy(code);
      }
    });
  }

  // Fallback copy method for older browsers
  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showSuccess();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textarea);
  }

  // Show success message
  function showSuccess() {
    if (successMessage) {
      successMessage.style.display = 'block';
      // Hide after 3 seconds
      setTimeout(function() {
        successMessage.style.display = 'none';
      }, 3000);
    }
  }
}

// ============================================
// EMAIL CAPTURE FUNCTIONALITY
// ============================================

/**
 * Initialize email capture forms
 */
function initEmailCapture() {
  const footerForm = document.getElementById('footer-email-form');
  const modalForm = document.getElementById('modal-email-form');

  if (footerForm) {
    footerForm.addEventListener('submit', handleEmailSubmit);
  }

  if (modalForm) {
    modalForm.addEventListener('submit', handleEmailSubmit);
  }
}

/**
 * Handle email form submission
 * @param {Event} e - Form submit event
 */
function handleEmailSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const location = form.getAttribute('data-location');
  const emailInput = form.querySelector('.gauge-converter__email-input');
  const successMsg = form.querySelector('.gauge-converter__email-success');
  const errorMsg = form.querySelector('.gauge-converter__email-error');
  const submitButton = form.querySelector('.gauge-converter__email-submit');

  const email = emailInput.value.trim();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage(errorMsg, successMsg);
    return;
  }

  // Hide any existing messages
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  // Disable button while processing
  submitButton.disabled = true;
  submitButton.textContent = location === 'footer' ? 'Sending...' : 'Subscribing...';

  // =============================================
  // TODO: INTEGRATE WITH EMAIL SERVICE
  // =============================================
  // Replace this section with your email service integration:
  // - Mailchimp API
  // - ConvertKit API
  // - Mailerlite API
  // - Or WordPress plugin integration
  //
  // Example structure:
  // fetch('YOUR_EMAIL_SERVICE_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email: email, source: location })
  // })
  // .then(response => response.json())
  // .then(data => {
  //   showMessage(successMsg, errorMsg);
  //   emailInput.value = '';
  // })
  // .catch(error => {
  //   showMessage(errorMsg, successMsg);
  // });

  // TEMPORARY: Simulate successful submission
  // Remove this and replace with actual API call above
  setTimeout(function() {
    // Show success message
    showMessage(successMsg, errorMsg);

    // Clear input
    emailInput.value = '';

    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = location === 'footer' ? 'Notify Me' : 'Subscribe';

    // Log to console (for testing)
    console.log('Email captured:', email, 'from:', location);

    // Hide success message after 5 seconds
    setTimeout(function() {
      successMsg.style.display = 'none';
    }, 5000);
  }, 1000);
}

/**
 * Show message helper
 */
function showMessage(showElement, hideElement) {
  hideElement.style.display = 'none';
  showElement.style.display = 'block';
}

// ============================================
// START APPLICATION
// ============================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConverter);
} else {
  // DOM already loaded
  initConverter();
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    gaugeToMM,
    mmToInches,
    inchesToMM,
    mmToClosestGauge,
    inchesToClosestGauge,
    GAUGE_TO_MM,
    MM_PER_INCH
  };
}
