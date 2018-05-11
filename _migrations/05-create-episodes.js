module.exports = function (migration) {
  const episode = migration.createContentType('episode')
    .name('Episode')
    .description('A podcast episode')
    .displayField('title');

  episode.createField('title').name('Title').type('Symbol').required(true);
  episode.createField('subtitle').name('Subtitle').type('Symbol');
  episode.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  episode.createField('description').name('Description').type('Text');
  episode.createField('audio_file').name('Audio File').type('Link').linkType('Asset');
  episode.createField('podcast').name('Podcast').type('Link').linkType('Entry').required(true).validations([{ linkContentType: ['podcast'] }]);
  episode.createField('episode_number').name('Episode Number').type('Integer');
  episode.createField('season_number').name('Season Number').type('Integer');
  episode.createField('published_at').name('Published At').type('Date').required(true);

  episode.changeEditorInterface('slug', 'slugEditor');
};