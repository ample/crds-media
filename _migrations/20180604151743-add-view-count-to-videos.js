module.exports = function (migration) {
  const video = migration.editContentType('video');
  video.createField('view_count').name('View Count').type('Number').disabled(true);
}