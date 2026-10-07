/**
 * Formats an amount into standard Indian Rupee notation (e.g. ₹1,499)
 * @param {number|string} amount
 * @returns {string}
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0';
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
  if (isNaN(num)) return '₹0';
  return `₹${num.toLocaleString('en-IN')}`;
}
