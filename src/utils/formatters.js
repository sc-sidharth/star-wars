/**
 * Formatters Utility
 * 
 * Provides formatting functions for dates, numbers, and lists
 */

/**
 * Format a date string
 */
export function formatDate(dateString) {
  if (!dateString) return 'Unknown';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Format a number with commas
 */
export function formatNumber(num) {
  if (!num || num === 'unknown' || num === 'n/a') return 'Unknown';
  
  const number = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
  if (isNaN(number)) return num;
  
  return number.toLocaleString('en-US');
}

/**
 * Format a list of items
 */
export function formatList(items, separator = ', ') {
  if (!items || items.length === 0) return 'None';
  if (Array.isArray(items)) return items.join(separator);
  return String(items);
}

/**
 * Format height (convert cm to feet/inches)
 */
export function formatHeight(cm) {
  if (!cm || cm === 'unknown') return 'Unknown';
  
  const cmNum = parseFloat(cm);
  if (isNaN(cmNum)) return cm;
  
  const totalInches = cmNum / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  
  return `${cm} cm (${feet}'${inches}")`;
}

/**
 * Format mass (kg to lbs)
 */
export function formatMass(kg) {
  if (!kg || kg === 'unknown') return 'Unknown';
  
  const kgNum = parseFloat(kg.replace(/,/g, ''));
  if (isNaN(kgNum)) return kg;
  
  const lbs = Math.round(kgNum * 2.20462);
  
  return `${formatNumber(kg)} kg (${formatNumber(lbs)} lbs)`;
}

/**
 * Capitalize first letter of each word
 */
export function capitalize(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export default {
  formatDate,
  formatNumber,
  formatList,
  formatHeight,
  formatMass,
  capitalize,
  truncate
};


