/**
 * @copyright Seif Eddine Mouihbi 2024
 * @author Seif <mouihbiseif@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { urlDecode } from "./utils/urlDecode.js";

/**
 * Header on-scroll state
 */

const /** {NodeElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

/**
 * Add ripple effect
 */

const /** {NodeElement} */ $rippleElems =
    document.querySelectorAll("[data-ripple]");

$rippleElems.forEach(($rippleElem) => ripple($rippleElem));

/**
 * Navbar toggle for mobile screen
 */

const /** {NodeList} */ $navTogglers =
    document.querySelectorAll("[data-nav-toggler]");
const /** {NodeElement} */ $navbar =
    document.querySelector("[data-navigation]");
const /** {NodeElement} */ $overlay = document.querySelector("[data-overlay]");

addEventOnElements($navTogglers, "click", function () {
  $navbar.classList.toggle("show");
  $overlay.classList.toggle("active");
});

/**
 * Filter functionality
 */

window.filterObj = {};

/**
 * Show all filtered options after reload
 */

if (window.location.search.slice(1)) {
  const /** {Object} */ search = urlDecode(window.location.search.slice(1));

  Object.entries(search).forEach((item) => {
    const /** {String} */ filterKey = item[0];
    const /** {String} */ filterValue = item[1];
    window.filterObj[filterKey] = filterValue;

    if (filterKey !== "query") {
      const /** {NodeElement} */ $filterItem = document.querySelector(
          `[data-filter="${filterKey}"]`
        );
      $filterItem
        ?.querySelector("[data-filter-chip]")
        .classList.add("selected");

      if ($filterItem)
        $filterItem.querySelector("[data-filter-value]").innerText =
          filterValue;
    }
  });
}

/**
 * Initial favorite object in local storage
 */

if (!window.localStorage.getItem("favorite")) {
  const /** Object */ favoriteObj = {
      photos: {},
      videos: {},
    };

  window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}

/**
 * Page Transition
 */

window.addEventListener("loadstart", function () {
  document.body.style.opacity = "0";
});
window.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "1";
});
