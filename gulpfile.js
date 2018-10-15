// 'use strict';

const gulp = require('gulp');

const exec = require('child_process').exec;
const sass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');

const assetDir = './_site/assets'

function assetPath(path) {
  return `${assetDir}/${path}`;
}

const cssFilePath = assetPath('application.css');

gulp.task('sass', function() {
  return gulp.src('_assets/stylesheets/application.scss')
    .pipe(sass({
      importer: tildeImporter,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(assetDir));
});

gulp.task('purgecss', ['sass'], function() {
  exec(`purgecss --config ./purgecss.config.json --out ${assetDir}`, function(err) {
    if (err) return console.error(err);
    return;
  });
});

gulp.task('css', ['purgecss'], function() { return });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
