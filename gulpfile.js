'use strict';

const gulp = require('gulp');
const run = require('gulp-run-command');
const sass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');

gulp.task('sass', function() {
  return gulp.src('./_assets/stylesheets/application.scss')
    .pipe(sass({
      importer: tildeImporter
    }).on('error', sass.logError))
    .pipe(gulp.dest('./_site/assets'));
});

gulp.task('purgecss', run('purgecss --config ./purgecss.config.json'))


// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
