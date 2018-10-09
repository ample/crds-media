(function(){

  var run = function() {
    // TODO: This could be moved inside the loop and the itemsWidth() function
    // can be removed.
    if (remainingWidth() > itemsWidth()) {
      overflowContainer().addClass('hidden');
    } else {
      overflowContainer().removeClass('hidden');
    }

    overflowDropzone().html('');

    var availableWidth = remainingWidth() - overflowWidth();

    $('[data-squenchable-item]').each(function(idx, item) {
      if (availableWidth > 0) {
        availableWidth -= $(item).outerWidth();
        $(item).removeClass('hidden');
      } else {
        $(item).clone().appendTo(overflowDropzone());
        $(item).addClass('hidden');
      }
    });
  }

  var remainingWidth = function() {
    return $('[data-squenchable-container]').width();
  }

  var itemsWidth = function() {
    if ($('[data-squenchable-item]').length == 0) { return 0 }
    return $('[data-squenchable-item]')
      .map(function() { return $(this).outerWidth() }).toArray()
      .reduce(function(total, value) { return total + value });
  }

  var overflowContainer = function() {
    return $('[data-squenchable-overflow]').first();
  }

  var overflowWidth = function() {
    return overflowContainer().outerWidth();
  }

  var overflowDropzone = function() {
    return $(overflowContainer().data('squenchable-overflow')).first();
  }

  $(document).ready(run);
  $(window).resize(run);
})();
