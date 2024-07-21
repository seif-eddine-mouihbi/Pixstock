/**
 * @copyright Seif Eddine Mouihbi 2024
 * @author Seif <mouihbiseif@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { urlEncode } from "./utils/urlEncode.js";

// ! [Do not share API_KEY in public]
const /** {String} */ API_KEY =
    "XEX0gjdDIjQgFDdgxrMhbbZGdBkK3fSs0m1Rdehtj5eBxFyVeDsoQAGA";

const /** {Function} */ headers = new Headers();
headers.append("Authorization", API_KEY);

const /** {Object} */ requestOptions = { headers };

/**
 * Fetch data from server
 * @param {string} url Fetch URL
 * @param {Function} successCallback Success callback function
 */

const fetchData = async function (url, successCallback) {
  const /** {Object} */ response = await fetch(url, requestOptions);

  if (response.ok) {
    const /** {Object} */ data = await response.json();
    successCallback(data);
  }
};

let /** {String} */ requestUrl = "";

const /** {Object} */ root = {
    default: "https://api.pexels.com/v1/",
    videos: "https://api.pexels.com/videos/",
  };

export const /** {Object} */ client = {
    photos: {
      /**
       * search photos
       * @param {Object} parameters URL Object
       * @param {Function} callback Callback function
       */
      search(parameters, callback) {
        requestUrl = `${root.default}search?${urlEncode(parameters)}`;
        fetchData(requestUrl, callback);
      },

      /**
       * Curated photos
       * @param {Object} parameters URL Object
       * @param {Function} callback Callback function
       */

      curated(parameters, callback) {
        fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
      },

      /**
       * Get single photo detail
       * @param {String} id photo ID
       * @param {Function} callback Callback function
       */

      detail(id, callback) {
        fetchData(`${root.default}photos/${id}`, callback);
      },
    },

    videos: {
      /**
       * search videos
       * @param {Object} parameters URL Object
       * @param {Function} callback Callback function
       */
      search(parameters, callback) {
        requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
        fetchData(requestUrl, callback);
      },

      /**
       *  Get Popular videos
       * @param {Object} parameters URL Object
       * @param {Function} callback Callback function
       */

      popular(parameters, callback) {
        fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
      },

      /**
       * Get single video detail
       * @param {String} id video ID
       * @param {Function} callback Callback function
       */

      detail(id, callback) {
        fetchData(`${root.videos}videos/${id}`, callback);
      },
    },

    collections: {
      /**
       *  Get featured Collections
       * @param {Object} parameters URL Object
       * @param {Function} callback Callback function
       */

      featured(parameters, callback) {
        requestUrl = `${root.default}collections/featured?${urlEncode(
          parameters
        )}`;
        fetchData(`${requestUrl}`, callback);
      },

      /**
       * Get a collection medias
       * @param {String} id Collection ID
       * @param {Object} parameters URL Object
       * @param {Function} callback Callback function
       */

      detail(id, parameters, callback) {
        requestUrl = `${root.default}/collections/${id}?${urlEncode(
          parameters
        )}`;
        fetchData(requestUrl, callback);
      },
    },
  };
