module.exports = function (migration) {

  const article = migration.editContentType('article');
    article.editField('body').required(true);
    article.editField('image').required(true);
};
