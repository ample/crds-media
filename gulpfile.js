const gulp = require('gulp');

const babel = require('gulp-babel');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
const exec = require('child_process').exec;
const sass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');
const uglify = require('gulp-uglify');

const jsConfig = require('./_assets/javascripts/config');

const assetDir = './_site/assets'

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

gulp.task('css', ['purgecss'], function() {
  return;
});

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

//

let jsTasks = [];

for (config of jsConfig) {
  const taskName = `${config.name}-js`;
  jsTasks.push(taskName);

  gulp.task(taskName, ['coffee'], function() {
    const files = config.files.map(f => `_assets/javascripts/${f}`);
    return gulp.src(files)
      .pipe(concat(`${config.name}.js`))
      .pipe(babel({
        presets: [
          ['@babel/env', {
            modules: false
          }]
        ]
      }))
      .pipe(uglify())
      .pipe(gulp.dest(assetDir))
  });
}

gulp.task('js', jsTasks, function() {
  return
});

// gulp.task('babel', ['coffee'], function() {
//   return gulp.src([
//       '_assets/javascripts/components/*.js',
//     ])
//     .pipe(concat('manifest.js'))
//     .pipe(babel({
//       presets: ['@babel/env']
//     }))
//     .pipe(gulp.dest('_assets/javascripts/tmp'))
// });

// gulp.task('babel', ['coffee'], function() {
//   return gulp.src([
//       '_assets/javascripts/**/*.js',
//       '!_assets/javascripts/tmp/**/*',
//       '!_assets/javascripts/application*.js',
//       '!_assets/javascripts/preview*.js'
//     ])
//     .pipe(babel({
//       presets: [
//         ['@babel/env', {
//           modules: false
//         }]
//       ]
//     }))
//     .pipe(gulp.dest('_assets/javascripts/tmp'))
// });

gulp.task('coffee', function() {
  return gulp.src([
      '_assets/javascripts/**/*.coffee',
      '!_assets/javascripts/**/*.js'
    ])
    .pipe(coffee({
      bare: true
    }))
    .pipe(gulp.dest('_assets/javascripts'))
});
