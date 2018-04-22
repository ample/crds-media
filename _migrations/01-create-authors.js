module.exports = function (migration) {
  const article = migration.createContentType('author')
    .name('Author')
    .description('Person associated with one or more pieces of content');

  article.createField('full_name').name('Full Name').type('Symbol').required(true);
  article.createField('slug').name('Slug').type('Symbol').required(true);
  article.createField('summary').name('Summary').type('Text').required(true);
  article.createField('body').name('Bio').type('Text');
  article.createField('image').name('Image').type('Link').linkType('Asset').required(true);
};