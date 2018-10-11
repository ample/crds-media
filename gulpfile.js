'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var tildeImporter = require('node-sass-tilde-importer');

gulp.task('sass', function () {
  return gulp.src('./_assets/stylesheets/application.scss')
    .pipe(sass({
      importer: tildeImporter
    }).on('error', sass.logError))
    .pipe(gulp.dest('./_site/assets'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
