module.exports = function (migration) {
  const article = migration.createContentType('episode')
    .name('Episode')
    .description('A podcast episode')
    .displayField('title');

  article.createField('title').name('Title').type('Symbol').required(true);
  article.createField('subtitle').name('Subtitle').type('Symbol');
  article.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  article.createField('description').name('Description').type('Text');
  article.createField('audio_file').name('Audio File').type('Link').linkType('Asset');
  article.createField('podcast').name('Podcast').type('Link').linkType('Entry').required(true).validations([{ linkContentType: ['podcast'] }]);
  article.createField('episode_number').name('Episode Number').type('Integer');
  article.createField('season_number').name('Season Number').type('Integer');
  article.createField('published_at').name('Published At').type('Date').required(true);

  article.changeEditorInterface('slug', 'slugEditor');
};