window.CRDS = window.CRDS || {};

$(document).ready(function() {

  CRDS.imgixIntervalCheck = function() {
    // Don't start processing images if the shared header isn't down (or almost done).
    if ($('[data-mobile-menu]').length == 0) { return }
    window.clearInterval(CRDS.imgixInterval);

    // Loop through all the images with "data-optimize-img" attributes on the
    // page and initialize imgix with the full-sized image.
    for (let img of $('img[data-optimize-img]')) {
      let src = $(img).attr('src').split('?')[0];
      $(img).addClass('img-responsive');
      $(img).attr('ix-src', src);
    }

    imgix.init();
  }

  CRDS.imgixInterval = window.setInterval(CRDS.imgixIntervalCheck, 100);

});
