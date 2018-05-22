module.exports = function (migration) {
  const video = migration.createContentType('video')
    .name('Video')
    .description('An individual video')
    .displayField('title');

  video.createField('title').name('Title').type('Symbol').required(true);
  video.createField('subtitle').name('Subtitle').type('Symbol');
  video.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  video.createField('description').name('Description').type('Text');
  video.createField('author').name('Author').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: [ 'author' ] }]
  });
  video.createField('image').name('Image').type('Link').linkType('Asset');
  video.createField('source_link').name('Source URL').type('Symbol');
  video.createField('published_at').name('Published At').type('Date').required(true);

  video.changeEditorInterface('slug', 'slugEditor');
};
