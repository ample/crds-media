module.exports = function (migration) {
  const category = migration.createContentType('category')
    .name('Category')
    .description('Content is organized by categories');

  category.createField('title').name('Title').type('Symbol').required(true);
  category.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  category.createField('body').name('Body').type('Text');
  category.createField('image').name('Image').type('Link').linkType('Asset').required(true);

  category.changeEditorInterface('slug', 'slugEditor');
};