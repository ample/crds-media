module.exports = function (migration) {
  const article = migration.createContentType('article')
    .name('Article')
    .description('Long-form written content, such as a blog post')
    .displayField('title');

  article.createField('title').name('Title').type('Symbol').required(true);
  article.createField('slug').name('Slug').type('Symbol').required(true).validations([{ unique: true }]);
  article.createField('body').name('Body').type('Text');
  article.createField('image').name('Image').type('Link').linkType('Asset');
  article.createField('tags').name('Tags').type('Array').items({ type: 'Symbol' });
  article.createField('published_at').name('Published At').type('Date').required(true);
  article.createField('author').name('Author').type('Link').linkType('Entry').required(true).validations([{ linkContentType: ['author'] }]);
  article.createField('category').name('Category').type('Link').linkType('Entry').required(true).validations([{ linkContentType: ['category'] }]);

  article.changeEditorInterface('slug', 'slugEditor');
};
