module.exports = function (migration) {

  const video = migration.editContentType('video');
        video.createField('tags').name('Tags').type('Array').items({ type: 'Symbol' });

};
