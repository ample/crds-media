(function() {
  // Don't start processing images if the shared header isn't down (or almost
  // done).
  function imgixIntervalCheck() {
    if ($('[data-mobile-menu]').length == 0) {
      return
    }
    processImages();
    processBgImages();
    window.clearInterval(imgixInterval);
    imgix.init();
  }

  // Loop through all the images with "data-optimize-img" attributes on the page
  // and initialize imgix with the full-sized image.
  function processImages() {
    for (var img of $('img[data-optimize-img]')) {
      var src = $(img).attr('src').split('?')[0];
      var ix_params = $(img).attr('ix-params') || $(img).attr('src').split('?')[1];
      $(img).addClass('img-responsive');
      $(img).attr('ix-src', src + '?' + ix_params);
    }
  }

  function processBgImages() {
    for (var bgEl of $('[data-optimize-bg-img]')) {
      var origUrl = $(bgEl).css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
      newUrl = new URL(origUrl);
      if (newUrl.searchParams.get('w')) {
        newUrl.searchParams.set('w', $(bgEl).outerWidth());
      }
      if (newUrl.searchParams.get('h')) {
        newUrl.searchParams.set('h', $(bgEl).outerHeight());
      }
      if (newUrl.href != origUrl) {
        $(bgEl).css('background-image', 'url("' + newUrl.href + '")');
      }
    }
  }

  var imgixInterval = setInterval(imgixIntervalCheck, 100);
  $(window).on('resizeEnd', processBgImages);

  $(window).resize(function() {
    if (this.resizeTo) clearTimeout(this.resizeTo);
    this.resizeTo = setTimeout(function() {
      $(this).trigger('resizeEnd');
    }, 500);
  });
})();
