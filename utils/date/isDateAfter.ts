import compareDates from "./compareDates";

/**
 * Checks if a date comes after another date.
 * @param {string} dateStr1 - The first date to compare.
 * @param {string} dateStr2 - The second date to compare.
 * @returns {boolean} - Returns true if dateStr1 comes after dateStr2, otherwise false.
 */
const isDateAfter = (dateStr1: string, dateStr2: string): boolean => {
  return compareDates(dateStr1, dateStr2) === 1;
};

export default isDateAfter;
