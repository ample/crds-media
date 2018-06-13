module.exports = function (migration) {
  const series = migration.createContentType('series')
    .name('Series')
    .description('Series')
    .displayField('title');

  series.createField('title').name('Title').type('Symbol').required(true);
  series.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  series.createField('image').name('Image').type('Link').linkType('Asset').required(true);
  series.createField('background_image').name('Background Image').type('Link').linkType('Asset');
  series.createField('description').name('Description').type('Text').required(true);
  series.createField('starts_at').name('Starts').type('Date');
  series.createField('ends_at').name('Ends').type('Date');
  series.createField('youtube_url').name('YouTube URL').type('Symbol');
  series.createField('apple_podcasts_url').name('Apple Podcasts URL').type('Symbol');
  series.createField('google_play_url').name('Google Play URL').type('Symbol');
  series.createField('videos').name('Videos').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'video', 'messages' ] }]
  });
  series.createField('published_at').name('Published At').type('Date').required(true);

  series.changeEditorInterface('slug', 'slugEditor');
};