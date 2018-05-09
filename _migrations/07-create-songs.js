module.exports = function (migration) {
  const article = migration.createContentType('song')
    .name('Song')
    .description('An individual song')
    .displayField('title');

  article.createField('title').name('Title').type('Symbol').required(true);
  article.createField('subtitle').name('Subtitle').type('Symbol');
  article.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  article.createField('description').name('Description').type('Text');
  article.createField('author').name('Author').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'author' ] }]
  });
  article.createField('audio_file').name('Audio File').type('Link').linkType('Asset');
  article.createField('album').name('Album').type('Link').linkType('Entry').validations([{ linkContentType: ['album'] }]);
  article.createField('image').name('Image').type('Link').linkType('Asset');
  article.createField('bg_image').name('Background Image').type('Link').linkType('Asset');
  article.createField('spotify').name('Spotify URL').type('Symbol');
  article.createField('apple_music').name('Apple Music URL').type('Symbol');
  article.createField('google_play').name('Google Play URL').type('Symbol');
  article.createField('youtube').name('YouTube URL').type('Symbol');
  article.createField('published_at').name('Published At').type('Date').required(true);

  article.changeEditorInterface('slug', 'slugEditor');
};
