module.exports = function (migration) {
  const album = migration.createContentType('album')
    .name('Album')
    .description('A Crossroads Music album')
    .displayField('title');

  album.createField('title').name('Title').type('Symbol').required(true);
  album.createField('subtitle').name('Subtitle').type('Symbol');
  album.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  album.createField('description').name('Description').type('Text');
  album.createField('image').name('Album Art').type('Link').linkType('Asset');
  album.createField('bg_image').name('Background Image').type('Link').linkType('Asset');
  album.createField('author').name('Author').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'author' ] }]
  });
  album.createField('spotify_url').name('Spotify URL').type('Symbol');
  album.createField('apple_music_url').name('Apple Music URL').type('Symbol');
  album.createField('google_play_url').name('Google Play URL').type('Symbol');
  album.createField('published_at').name('Published At').type('Date').required(true);

  album.changeEditorInterface('slug', 'slugEditor');
};
