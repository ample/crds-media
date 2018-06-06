module.exports = function (migration) {
  const video = migration.editContentType('video')
  video.createField('video_duration').name('Video Duration').type('Symbol');
  video.createField('category').name('Category').type('Link').linkType('Entry').validations([{ linkContentType: ['category'] }]);
  video.createField('transcription').name('Transcription').type('Text');
  video.createField('apple_podcasts_url').name('Apple Podcasts URL').type('Symbol');
  video.createField('google_play_url').name('Google Play URL').type('Symbol');

};

// DELETE BELOW
// Already created:
video.createField('title').name('Title').type('Symbol').required(true);
video.createField('subtitle').name('Subtitle').type('Symbol');
video.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
video.createField('description').name('Description').type('Text');
video.createField('author').name('Author').type('Array').items({
  type: 'Link',
  linkType: 'Entry',
  validations: [{ linkContentType: [ 'author' ] }]
});
video.createField('image').name('Image').type('Link').linkType('Asset');
video.createField('source_link').name('Source URL').type('Symbol');
video.createField('published_at').name('Published At').type('Date').required(true);

video.changeEditorInterface('slug', 'slugEditor');