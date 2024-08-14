/**
 * Compares two dates and returns -1, 0, or 1 indicating whether the
 * first date is earlier, the same, or later than the second date.
 *
 * @param {string} dateStr1 - The first date to compare.
 * @param {string} dateStr2 - The second date to compare.
 * @returns {number} - Returns -1 if dateStr1 is earlier that dateStr2,
 *                     0 if they are the same date, or 1 if dateStr1
 *                     is later than dateStr2
 */

const compareDates = (dateStr1: string, dateStr2: string): number => {
  const date1 = new Date(dateStr1).getTime(),
    date2 = new Date(dateStr2).getTime();

  if (date1 < date2) {
    return -1;
  } else if (date1 > date2) {
    return 1;
  } else {
    return 0;
  }
};

export default compareDates;
