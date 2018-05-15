window.CRDS = window.CRDS || {};

$(document).ready(function() {

  CRDS.imgixIntervalCheck = function() {
    // Don't start processing images if the shared header isn't down (or almost done).
    if ($('[data-mobile-menu]').length == 0) { return }
    window.clearInterval(CRDS.imgixInterval);

    // Loop through all the images with "data-optimize-img" attributes on the
    // page and initialize imgix with the full-sized image.
    for (var img of $('img[data-optimize-img]')) {
      var src = $(img).attr('src').split('?')[0];
      var ix_params = $(img).attr('ix-params') || $(img).attr('src').split('?')[1];
      $(img).addClass('img-responsive');
      $(img).attr('ix-src', src + '?' + ix_params);
    }

    imgix.init();
  }

  CRDS.imgixInterval = window.setInterval(CRDS.imgixIntervalCheck, 100);

});
