/**
 * Validators Utility
 * 
 * Provides validation functions for WebGL support, data validation, etc.
 */

/**
 * Check if browser supports WebGL
 */
export function hasWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

/**
 * Validate if a value is not empty
 */
export function isNotEmpty(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

/**
 * Validate URL format
 */
export function isValidUrl(url) {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Validate if value is a number
 */
export function isNumber(value) {
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'string') {
    const num = parseFloat(value.replace(/,/g, ''));
    return !isNaN(num);
  }
  return false;
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

export default {
  hasWebGLSupport,
  isNotEmpty,
  isValidUrl,
  isNumber,
  sanitizeHtml
};


