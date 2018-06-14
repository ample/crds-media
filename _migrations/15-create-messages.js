module.exports = function (migration) {
  const message = migration.createContentType('message')
    .name('Message')
    .description('An individual message from a series')
    .displayField('title');

  message.createField('title').name('Title').type('Symbol').required(true);
  message.createField('subtitle').name('Subtitle').type('Symbol');
  message.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  message.createField('description').name('Description').type('Text');
  message.createField('author').name('Author').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'author' ] }]
  });
  message.createField('image').name('Image').type('Link').linkType('Asset').required(true);
  message.createField('source_link').name('Source URL').type('Symbol');
  message.createField('published_at').name('Published At').type('Date').required(true);
  message.createField('program').name('PDF Program').type('Link').linkType('Asset');
  message.createField('video_duration').name('Message Duration').type('Symbol');
  message.createField('category').name('Category').type('Link').linkType('Entry').validations([{ linkContentType: ['category'] }]);
  message.createField('tags').name('Tags').type('Array').items({ type: 'Symbol' });
  message.createField('transcription').name('Transcription').type('Text');
  message.createField('apple_podcasts_url').name('Apple Podcasts URL').type('Symbol');
  message.createField('google_play_url').name('Google Play URL').type('Symbol');

  message.changeEditorInterface('slug', 'slugEditor');
};
