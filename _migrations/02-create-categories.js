module.exports = function (migration) {
  const article = migration.createContentType('category')
    .name('Category')
    .description('Content is organized by categories');

  article.createField('title').name('Title').type('Symbol').required(true);
  article.createField('slug').name('Slug').type('Symbol').required(true);
  article.createField('body').name('Body').type('Text');
  article.createField('image').name('Image').type('Link').linkType('Asset').required(true);
};