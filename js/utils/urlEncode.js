/**
 * @copyright Seif Eddine Mouihbi 2024
 * @author Seif <mouihbiseif@gmail.com>
 */

"use strict";

/**
 * Convert Object to Url
 * @param {Object} urlObj url object
 * @returns String
 */

export const urlEncode = (urlObj) => {
  return Object.entries(urlObj)
    .join("&")
    .replace(/,/g, "=")
    .replace(/#/g, "%23");
};
