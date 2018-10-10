(function(){

  var initSquenchable = function() {
    $('[data-squenchable-item]').each(function(idx, item) {
      $(item).attr('data-width', Math.ceil($(item).outerWidth()) + 2);
    });
    overflowContainer().attr('data-width', Math.ceil(overflowContainer().outerWidth()) + 10);
    run();
  }

  var run = function() {
    console.log('--- RUN ---');
    // TODO: This could be moved inside the loop and the itemsWidth() function
    // can be removed.
    // console.log('>>>', squenchableWidth(), itemsWidth(), '<<<');
    // if (squenchableWidth() > itemsWidth()) {
    //   overflowContainer().addClass('hidden');
    // } else {
      //   overflowContainer().removeClass('hidden');
      // }

    overflowContainer().addClass('hidden');

    overflowDropzone().html('');

    var availableWidth = squenchableWidth() - overflowWidth();

    $('[data-squenchable-item]').each(function(idx, item) {
      if (availableWidth > $(item).data('width')) {
        console.log(availableWidth, $(item).data('width'), $(item).text().trim());
        availableWidth -= $(item).data('width');
        $(item).removeClass('hidden');
      } else {
        availableWidth = 0;
        console.log('MOVE: ', $(item).text().trim());
        overflowContainer().removeClass('hidden');
        var clone = $(item).clone().appendTo(overflowDropzone());
        clone.removeClass('hidden');
        $(item).addClass('hidden');
      }
    });
  }

  var squenchableWidth = function() {
    return Math.floor($('[data-squenchable-container]').width());
  }

  // var itemsWidth = function() {
  //   if ($('[data-squenchable-item]').length == 0) { return 0 }
  //   return $('[data-squenchable-item]')
  //     .map(function() { return $(this).data('width') }).toArray()
  //     .reduce(function(total, value) { return total + value });
  // }

  var overflowContainer = function() {
    return $('[data-squenchable-overflow]').first();
  }

  var overflowWidth = function() {
    return overflowContainer().data('width');
  }

  var overflowDropzone = function() {
    return $(overflowContainer().data('squenchable-overflow')).first();
  }

  $(document).ready(initSquenchable);
  $(window).on('resize', run);
})();
