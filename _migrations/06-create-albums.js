module.exports = function up (migration) {
  const article = migration.createContentType('album')
    .name('Album')
    .description('A Crossroads Music album')
    .displayField('title');

  article.createField('title').name('Title').type('Symbol').required(true);
  article.createField('subtitle').name('Subtitle').type('Symbol');
  article.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  article.createField('description').name('Description').type('Text');
  article.createField('image').name('Album Art').type('Link').linkType('Asset');
  article.createField('bg_image').name('Background Image').type('Link').linkType('Asset');
  article.createField('author').name('Author').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'author' ] }]
  });
  article.createField('spotify').name('Spotify URL').type('Symbol');
  article.createField('apple_music').name('Apple Music URL').type('Symbol');
  article.createField('google_play').name('Google Play URL').type('Symbol');
  article.createField('published_at').name('Published At').type('Date').required(true);

  article.changeEditorInterface('slug', 'slugEditor');
};
