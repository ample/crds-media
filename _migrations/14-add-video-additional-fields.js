module.exports = function (migration) {
  const video = migration.editContentType('video')
  video.createField('video_duration').name('Video Duration').type('Symbol');
  video.createField('category').name('Category').type('Link').linkType('Entry').validations([{ linkContentType: ['category'] }]);
  video.createField('transcription').name('Transcription').type('Text');
  video.createField('apple_podcasts_url').name('Apple Podcasts URL').type('Symbol');
  video.createField('google_play_url').name('Google Play URL').type('Symbol');

};