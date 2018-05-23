module.exports = function (migration) {

  const video = migration.editContentType('video');
    video.editField('image').required(true);
};
