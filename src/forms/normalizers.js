/**
 * A collection of value formatters
 * @module normalizers
 */

/**
 * Split a comma separated list of values into an array
 * @param {string} value
 * @return {string[]}
 */
export const stringToList = value => (value ? value.replace(/,\s/g, ',').split(/,\s?/) : []);
/**
 * Concatenate a list of values separating them with a comma and a space
 * @param {*[]} value
 * @param {string} value
 */
export const listToString = value => (value ? value.join(', ') : '');
