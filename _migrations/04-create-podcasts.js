module.exports = function (migration) {
  const article = migration.createContentType('podcast')
    .name('Podcast')
    .description('Podcast, or a grouping of audio episodes')
    .displayField('title');

  article.createField('title').name('Title').type('Symbol').required(true);
  article.createField('subtitle').name('Subtitle').type('Symbol');
  article.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  article.createField('description').name('Description').type('Text');
  article.createField('image').name('Image').type('Link').linkType('Asset');
  article.createField('bg_image').name('Background Image').type('Link').linkType('Asset');
  article.createField('author').name('Author').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'author' ] }]
  });
  article.createField('apple_podcasts_url').name('Apple Podcasts URL').type('Symbol');
  article.createField('google_play_url').name('Google Play URL').type('Symbol');
  article.createField('stitcher_url').name('Stitcher URL').type('Symbol');

  article.changeEditorInterface('slug', 'slugEditor');
};