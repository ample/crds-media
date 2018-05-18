module.exports = function (migration) {
  migration.editContentType('song').editField('bg_image').required(true);
};