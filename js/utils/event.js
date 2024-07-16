/**
 * @copyright Seif Eddine Mouihbi 2024
 * @author Seif <mouihbiseif@gmail.com>
 */

"use strict";

/**
 * Add event on multiple elements
 * @param {NodeList} $elements NodeList
 * @param {string} eventType Event type eg. 'click' 
 * @param {Function} callback Callback function
*/

export const addEventOnElements = function ($elements, eventType, callback) {
  $elements.forEach(($element) => {
    $element.addEventListener(eventType, callback);
  });
};
