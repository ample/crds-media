module.exports = function (migration) {

  const podcast = migration.editContentType('podcast');
        podcast.editField('image').required(true);
        podcast.editField('bg_image').required(true);

  const album = migration.editContentType('album');
        album.editField('image').required(true);
        album.editField('bg_image').required(true);

  const song = migration.editContentType('song');
        song.editField('image').required(true);
        song.editField('bg_image').required(true);

};