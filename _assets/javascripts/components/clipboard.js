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