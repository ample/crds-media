// 'use strict';

const gulp = require('gulp');

const cleanCss = require('gulp-clean-css');
const run = require('gulp-run-command').default;
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
      importer: tildeImporter
    }))
    .pipe(gulp.dest(assetDir));
});

gulp.task('purgecss', run(`purgecss --config ./purgecss.config.json --out ${assetDir}`));

gulp.task('minify-css', function() {
  return gulp.src(cssFilePath)
    .pipe(cleanCss({
      compatibility: '*'
    }))
    .pipe(gulp.dest(assetDir));
});


// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
