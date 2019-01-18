class AudioVideoTrigger {

  constructor() {
    this.initEls();
    this.initVisibility();
    this.listen();
  }

  initEls() {
    this.playerContainer = $('[data-audio-video-control]').first();
    this.audioTrigger = $('[data-audio-trigger]').first();
    this.audioPlayer = $('[data-audio-player]').first();
    if (this.audioPlayer.length > 0) this.audioHTML = this.audioPlayer[0].outerHTML;
    this.videoTrigger = $('[data-video-trigger]').first();
    this.videoPlayer = $('[data-video-player]').first();
    if (this.videoPlayer.length > 0) this.videoHTML = this.videoPlayer[0].outerHTML;
  }

  initVisibility() {
    this.playerContainer.html('');
    this.playerContainer.removeClass('hide');
    if (this.videoPlayer.length > 0) {
      this.playerContainer.html(this.videoHTML);
      this.audioTrigger.removeClass('hide');
      this.videoTrigger.addClass('hide');
    } else {
      this.playerContainer.html(this.audioHTML);
      this.audioTrigger.remove();
    }
  }

  listen() {
    this.audioTrigger.on('click', (event) => this.activateAudio());
    this.videoTrigger.on('click', (event) => this.activateVideo());
  }

  activateAudio() {
    this.playerContainer.html(this.audioHTML);
    this.audioTrigger.addClass('hide');
    this.videoTrigger.removeClass('hide');
  }

  activateVideo() {
    this.playerContainer.html(this.videoHTML);
    this.audioTrigger.removeClass('hide');
    this.videoTrigger.addClass('hide');
  }
}

$(document).ready(function() {
  if ($('[data-audio-trigger]').length > 0) new AudioVideoTrigger;
});
