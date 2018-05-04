//= require ./vendor/jquery-3.3.1.min
//= require ./vendor/bootstrap.min
//= require ./vendor/imgix.min
//= require ./vendor/crds-shared-header-v0.7.1.min
//= require ./vendor/clipboard.min

$(document).ready(function(){
  var options = {
    cmsEndpoint: CRDS.media.cms,
    appEndpoint: CRDS.media.app,
    imgEndpoint: CRDS.media.img,
    crdsCookiePrefix: CRDS.media.prefix
  };
  var header = new CRDS.SharedHeader(options);
      header.render();
  var foot = new CRDS.SharedFooter(options);
});

$(document).ready(function(){
  var btn = $('.clipboard');
  var success = $('[data-role=copy-success]');

  if ( btn.length > 0 ){
    var clipboard = new ClipboardJS(btn[0]);

        clipboard.on('success', function(e) {
          success.removeClass('hide');
          setTimeout(function(){
            success.addClass('hide');
          }, 3000);
        });

        clipboard.on('error', function(e) {
          console.log(e);
        });
  }
})
