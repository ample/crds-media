(function(){

  var initSquenchable = function() {
    $('[data-squenchable-item]').each(function(idx, item) {
      $(item).attr('data-width', Math.ceil($(item).width()) + 20);
    });
    overflowContainer().attr('data-width', Math.ceil(overflowContainer().width()) + 20);
    run();
    $('[data-squenchable-item]').removeClass('invisible');
    overflowContainer().removeClass('invisible');
  }

  var run = function() {

    overflowContainer().addClass('hidden');

    overflowDropzone().html('');

    var availableWidth = squenchableWidth() - overflowWidth();

    $('[data-squenchable-item]').each(function(idx, item) {
      if (availableWidth > $(item).data('width')) {
        availableWidth -= $(item).data('width');
        $(item).removeClass('hidden');
      } else {
        availableWidth = 0;
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
