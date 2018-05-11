module.exports = function (migration) {
  const episode = migration.editContentType('episode')

  episode.createField('category').name('Category').type('Link').linkType('Entry').validations([{ linkContentType: ['category'] }]);
  episode.createField('tags').name('Tags').type('Array').items({ type: 'Symbol' });
  episode.createField('show_notes').name('Show Notes').type('Text');
  episode.createField('transcription').name('Transcription').type('Text');
  episode.createField('audio_duration').name('Audio Duration (mins)').type('Integer');
  episode.createField('audio_embed_code').name('Audio Embed Code').type('Text');

  episode.deleteField('audio_file');
};
