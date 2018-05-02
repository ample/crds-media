//= require ./vendor/jquery-3.3.1.min
//= require ./vendor/bootstrap.min
//= require ./vendor/imgix.min
//= require ./vendor/crds-shared-header-v0.7.1.min

$(document).ready(function(){
  var options = {
    cmsEndpoint: CRDS.media.cms,
    appEndpoint: CRDS.media.app,
    imgEndpoint: CRDS.media.img,
    crdsCookiePrefix: CRDS.media.prefix
  };
  var header = new CRDS.SharedHeader(options);
      header.render();
});
