module.exports = function (migration) {

  const author = migration.editContentType('author');
        author.deleteField('body');
};