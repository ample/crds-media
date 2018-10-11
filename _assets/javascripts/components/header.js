$(document).ready(function(){
  $("[data-menu-trigger]").mouseup(function () {
    $(this).toggleClass("active");
    $("[data-menu-modal]").toggleClass("open");
    $("#mobile-navbar").toggleClass("open");
  });

  $("[data-chat-trigger]").click(function () {
    FrontChat('show');
  });

  $('.subscribe').click(function() {
    $('[data-role=alert]').fadeIn();
    setTimeout(function(){
      $('[data-role=alert]').fadeOut();
    }, 3000);
  });

  var $myGroup = $("[data-menu-modal]");
  $myGroup.on('show.bs.collapse','.collapse', function() {
    $myGroup.find('.collapse.in').collapse('hide');
  });

  var loc = window.location.pathname;

  $('.media-header-section').find('a').each(function() {
    $(this).toggleClass('active', $(this).attr('href') == loc);
  });
});