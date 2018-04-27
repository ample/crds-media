$(document).ready(function() {

  for (let img of $('img')) {
    let src = $(img).attr('src').split('?')[0];
    $(img).addClass('img-responsive');
    $(img).attr('ix-src', src);
  }

  imgix.init();

});
