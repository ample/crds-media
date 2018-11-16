const { series, parallel, src, dest } = require('gulp');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const del = require('del');
const exec = require('child_process').exec;
const fs = require('fs');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');
const uglify = require('gulp-uglify');

const jsConfig = require('./_assets/javascripts/config');

const assetDir = './_site/assets'
const hash = process.env.ASSET_HASH;
const tokenFile = `tmp/_token`;

function filename(basename, ext) {
  if (hash) basename += `-${hash}`;
  return `${basename}.${ext}`;
}

function compileSass(done) {
  return src('_assets/stylesheets/application.scss')
    .pipe(plumber())
    .pipe(sass({
      importer: tildeImporter,
      outputStyle: 'compressed'
    }))
    .pipe(rename(filename('application', 'css')))
    .pipe(dest(assetDir));
}

function purgeCss(done) {
  return exec(`purgecss --config ./purgecss.config.json --out ${assetDir}`, function(err) {
    if (err) return console.error(err);
    return;
  });
}


function jsDeps(done) {
  const tasks = jsConfig.map((config) => {
    return (done) => {
      const deps = (config.deps || []).map(f => `_assets/javascripts/${f}.js`);
      if (deps.length == 0) {
        done();
        return;
      }
      return src(deps)
        .pipe(concat(`${config.name}.deps.js`))
        .pipe(dest(assetDir));
    }
  });

  return series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })();
}

function jsBuild(done) {
  const tasks = jsConfig.map((config) => {
    return (done) => {
      const files = config.files.map(f => `_assets/javascripts/${f}.js`);
      if (files.length == 0) {
        done();
        return;
      }
      return src(files)
        .pipe(plumber())
        .pipe(concat(`${config.name}.files.js`))
        .pipe(babel({
          presets: [
            ['@babel/env', {
              modules: false
            }]
          ]
        }))
        .pipe(uglify())
        .pipe(dest(assetDir))
    }
  })

  return series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })();
}

function jsConcat(done) {
  const tasks = jsConfig.map((config) => {
    return (done) => {
      const files = [`${assetDir}/${config.name}.deps.js`, `${assetDir}/${config.name}.files.js`];
      return src(files, { allowEmpty: true })
        .pipe(plumber())
        .pipe(concat(filename(config.name, 'js')))
        .pipe(dest(assetDir))
    }
  })

  return series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })();
}

function jsClean(done) {
  const tasks = jsConfig.map((config) => {
    return (done) => {
      const files = [`${assetDir}/${config.name}.deps.js`, `${assetDir}/${config.name}.files.js`];
      return del(files);
    }
  })
  return series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })();
}

exports.default = parallel(
  series(compileSass, purgeCss),
  series(jsDeps, jsBuild, jsConcat, jsClean),
);
