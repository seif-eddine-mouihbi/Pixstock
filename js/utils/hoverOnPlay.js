/**
 * @copyright Seif Eddine Mouihbi 2024
 * @author Seif <mouihbiseif@gmail.com>
 */

"use strict";

export const hoverOnPlay = ($card) => {
  const /** {NodeElement} */ $cardVideo = $card.querySelector("[data-video]");
  const /** {Nodeelement} */ $cardBadge =
      $card.querySelector("[data-card-badge]");

  let /** {Boolean} */ isPlaying = false;
  let /** {Function} */ PlayTimeout;

  $card.addEventListener("pointerover", function () {
    PlayTimeout = setTimeout(() => {
      $cardBadge.style.display = "none";
      $cardVideo
        .play()
        .then((res) => {
          isPlaying = true;
        })
        .catch((err) => {
          isPlaying = false;
        });
    }, 500);
  });

  $card.addEventListener("pointerout", function () {
    PlayTimeout && clearTimeout(PlayTimeout);

    $cardBadge.style.display = "grid";
    if (isPlaying) $cardVideo.pause();
  });
};
