/**
 * @copyright Seif Eddine Mouihbi 2024
 * @author Seif <mouihbiseif@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { client } from "../../js/api_configure.js";
import { collectionCard } from "../../js/collection_card.js";

/**
 * Render featured collection
 */

const /** {NodeElement} */ $collectionGrid = document.querySelector(
    "[data-collection-grid]"
  );
const /** {Number} */ perPage = 36;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;

/**
 * @param {Number} page Page number
 */
const loadCollections = function (page) {
  client.collections.featured({ per_page: perPage, page: page }, (data) => {
    totalPage = Math.ceil(data.total_results / perPage);
    data.collections.forEach((collection) => {
      const /** {NodeElement} */ $collectionCard = collectionCard(collection);
      $collectionGrid.appendChild($collectionCard);
    });

    isloaded = true;
    currentPage >= totalPage && ($loader.style.display = "none");
  });
};
loadCollections(currentPage);

/**
 * Load more colection
 */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");
let /** {Boolean} */ isloaded = false;

const loadMore = function () {
  if (
    $loader.getBoundingClientRect().top < window.innerHeight * 2 &&
    currentPage <= totalPage &&
    isloaded
  ) {
    currentPage++;
    loadCollections(currentPage);
    isloaded = false;
  }
};

window.addEventListener("scroll", loadMore);
