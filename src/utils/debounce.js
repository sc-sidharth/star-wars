/**
 * Debounce Utility
 * 
 * Creates a debounced function that delays invoking func until after
 * wait milliseconds have elapsed since the last time the debounced
 * function was invoked.
 */

export function debounce(func, wait = 500) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default debounce;


