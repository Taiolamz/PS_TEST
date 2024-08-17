/**
 * Formats an array of objects into a comma-separated string of names.
 *
 * @param {Object[]} items - The array of objects to format.
 * @param {string} [nameKey="name"] - The key used to identify the name field in the objects (optional).
 * @returns {string} - A string of names separated by commas without a trailing comma.
 *
 * @example
 * // Default key:
 * const staff = [{ id: "1", name: "John" }, { id: "2", name: "Jane" }];
 * console.log(formatNames(staff)); // Output: "John, Jane"
 *
 * @example
 * // Custom key:
 * const tasks = [{ staff_id: "1", title: "Task 1" }, { staff_id: "2", title: "Task 2" }];
 * console.log(formatNames(tasks, "title")); // Output: "Task 1, Task 2"
 */
export const formatNamesWithCommas = (
  items: { [key: string]: string }[],
  nameKey: string = "name"
): string => {
  return items
    .map((item) => item[nameKey])
    .filter((name) => name !== undefined && name !== "")
    .join(", ");
};
