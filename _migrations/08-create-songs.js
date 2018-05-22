module.exports = function (migration) {
  const song = migration.createContentType('song')
    .name('Song')
    .description('An individual song')
    .displayField('title');

  song.createField('title').name('Title').type('Symbol').required(true);
  song.createField('subtitle').name('Subtitle').type('Symbol');
  song.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  song.createField('description').name('Description').type('Text');
  song.createField('details').name('Details').type('Text');
  song.createField('lyrics').name('Lyrics').type('Text');
  song.createField('tags').name('Tags').type('Array').items({ type: 'Symbol' });
  song.createField('category').name('Category').type('Link').linkType('Entry').validations([{ linkContentType: ['category'] }]);
  song.createField('author').name('Author').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'author' ] }]
  });
  song.createField('audio_file').name('Audio File').type('Link').linkType('Asset');
  song.createField('audio_duration').name('Audio Duration').type('Text');
  song.createField('album').name('Album').type('Link').linkType('Entry').validations([{ linkContentType: ['album'] }]);
  song.createField('image').name('Image').type('Link').linkType('Asset');
  song.createField('bg_image').name('Background Image').type('Link').linkType('Asset');
  song.createField('spotify_url').name('Spotify URL').type('Symbol');
  song.createField('apple_music_url').name('Apple Music URL').type('Symbol');
  song.createField('google_play_url').name('Google Play URL').type('Symbol');
  song.createField('youtube_url').name('YouTube URL').type('Symbol');
  song.createField('related_videos').name('Related Videos').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'video' ] }]
  });
  song.createField('published_at').name('Published At').type('Date').required(true);

  song.changeEditorInterface('slug', 'slugEditor');
};
