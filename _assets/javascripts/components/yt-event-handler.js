(function() {
  var crdsYTEventHandler = function() {
    var tag = document.createElement('script');
    tag.id = 'yt-event-handler';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    window.onYouTubeIframeAPIReady = function() {
      this.player = new YT.Player('js-media-video', {
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    }

    function videoStopped(event) {
      var reasonForEnding;
      if (event.data == YT.PlayerState.ENDED) {
        reasonForEnding = 'Ended';
      } else if (event.data == YT.PlayerState.PAUSED) {
        reasonForEnding = 'Paused';
      } else {
        reasonForEnding = null;
      }
      return reasonForEnding;
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED) {
        if (typeof analytics !== 'undefined') {
          analytics.track('VideoEnded', {
            Title: this.player.getVideoData().title,
            VideoId: this.player.getVideoData().video_id,
            Source: 'CrossroadsNet',
            VideoTotalDuration: this.player.getDuration(),
            CurrentTime: this.player.getCurrentTime(),
            ReasonForEnding: videoStopped(event)
          });
        }
      } else {
        if (typeof analytics !== 'undefined') {
          analytics.track('VideoStarted', {
            Title: this.player.getVideoData().title,
            VideoId: this.player.getVideoData().video_id,
            Source: 'CrossroadsNet',
            VideoTotalDuration: this.player.getDuration()
          });
        }
      }
    }
  }

  $(document).ready(function() {
    $('#js-media-video').each(crdsYTEventHandler);
  });
})();