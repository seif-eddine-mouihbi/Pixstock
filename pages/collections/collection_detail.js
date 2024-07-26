/**
 * @copyright Seif Eddine Mouihbi 2024
 * @author Seif <mouihbiseif@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";
import { urlDecode } from "../../js/utils/urlDecode.js";

/**
 * Render collection media
 */

const /** {NodeElement} */ $collectionGrid = document.querySelector(
    "[data-collection-grid]"
  );
const /** {NodeElement} */ $title = document.querySelector("[data-title]");
const /** {Object} */ collectionGrid = gridInit($collectionGrid);
const /** {Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /** {Object} */ collectionObj = urlDecode(
    window.location.search.slice(1)
  );

$title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;

/**
 * @param {Number} page Current page
 */
const loadCollection = function (page) {
  client.collections.detail(
    collectionObj.collectionId,
    { per_page: perPage, page: page },
    (data) => {
      console.log(data);
      totalPage = Math.ceil(data.total_results / perPage);
      data.media.forEach((item) => {
        let /** {NodeElement} */ $card;
        switch (item.type.toLowerCase()) {
          case "photo":
            $card = photoCard(item);
            break;
          case "video":
            $card = videoCard(item);
            break;
        }

        updateGrid(
          $card,
          collectionGrid.columnsHeight,
          collectionGrid.$columns
        );

        // When is loaded

        isloaded = true;
        page >= totalPage && ($loader.style.display = "none");
      });
    }
  );
};
loadCollection(currentPage);

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
    loadCollection(currentPage);
    isloaded = false;
  }
};

window.addEventListener("scroll", loadMore);
