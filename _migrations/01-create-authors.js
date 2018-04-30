module.exports = function (migration) {
  const author = migration.createContentType('author')
    .name('Author')
    .description('Person associated with one or more pieces of content');

  author.createField('full_name').name('Full Name').type('Symbol').required(true);
  author.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  author.createField('summary').name('Summary').type('Text').required(true);
  author.createField('body').name('Bio').type('Text');
  author.createField('image').name('Image').type('Link').linkType('Asset').required(true);

  author.changeEditorInterface('slug', 'slugEditor');
};