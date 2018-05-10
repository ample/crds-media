module.exports = function (migration) {
  const podcast = migration.createContentType('podcast')
    .name('Podcast')
    .description('Podcast, or a grouping of audio episodes')
    .displayField('title');

  podcast.createField('title').name('Title').type('Symbol').required(true);
  podcast.createField('subtitle').name('Subtitle').type('Symbol');
  podcast.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  podcast.createField('description').name('Description').type('Text');
  podcast.createField('image').name('Image').type('Link').linkType('Asset');
  podcast.createField('bg_image').name('Background Image').type('Link').linkType('Asset');
  podcast.createField('author').name('Author').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'author' ] }]
  });
  podcast.createField('apple_podcasts_url').name('Apple Podcasts URL').type('Symbol');
  podcast.createField('google_play_url').name('Google Play URL').type('Symbol');
  podcast.createField('stitcher_url').name('Stitcher URL').type('Symbol');

  podcast.changeEditorInterface('slug', 'slugEditor');
};