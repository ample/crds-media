module.exports = function (migration) {
  const song = migration.editContentType('song')
    song.createField('chords').name('Chord Chart').type('Text');
    song.createField('stems').name('Stem File').type('Text');

    song.deleteField('subtitle');
    song.deleteField('audio_file');

  const album = migration.editContentType('album')
    album.deleteField('subtitle');
};