/**
 * Format a date-like value into "DD Month YYYY".
 *
 * @param {string|number|Date} updatedValue - Raw updated value from the API.
 * @returns {string} Formatted date, or "—" if missing/invalid.
 */
export function dateFormat(updatedValue) {
  if (!updatedValue) return "—";

  const dt = new Date(updatedValue);
  if (isNaN(dt)) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dt);
}
