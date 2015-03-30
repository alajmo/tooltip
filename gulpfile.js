'use strict';

var gulp = require('gulp'),
  header = require('gulp-header'),
  htmlreplace = require('gulp-html-replace'),
  uglify = require('gulp-uglify'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer-core'),
  jslint = require('gulp-jslint'),
  ngAnnotate = require('gulp-ng-annotate'),
  del = require('del'),
  connect = require('gulp-connect'),
  protractor      = require('gulp-protractor').protractor,
  webdriver       = require('gulp-protractor').webdriver,
  webdriverUpdate = require('gulp-protractor').webdriver_update,
  pkg,
  banner,
  moduleName = 'tooltip';

/************* Banner ********/
pkg = require('./package.json');
banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version <%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

/*********** Build ***********/
gulp.task('build', ['clean'], function () {
  gulp.start('module:js', 'module:css', 'demo:css', 'demo:html', 'protractor');
});

/********** Development ******/
gulp.task('default', ['clean'], function () {
  gulp.start('watch', 'start_server');
});

/********** Watch ************/
gulp.task('watch', function () {

  gulp.watch('src/*.js', ['module:js']);
  gulp.watch('src/*.css', ['module:css']);

  gulp.watch('demo/*.js', ['demo:js']);
  gulp.watch('demo/postcss/*.css', ['demo:css']);

  gulp.watch('demo/*.html', ['demo:html']);

});

/******** Module JS ************/
gulp.task('module:js', function () {
  return gulp.src(['src/*.js'])
  .pipe(connect.reload())
  .pipe(header(banner, { pkg : pkg } ))
  .pipe(ngAnnotate())
  .pipe(gulp.dest('dist'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

/********** Module CSS *********/
gulp.task('module:css', function () {
  var processors = [autoprefixer()];
  return gulp.src(['src/*.css'])
  .pipe(connect.reload())
  .pipe(postcss(processors))
  .pipe(concat(moduleName + '.css'))
  .pipe(gulp.dest('dist'))
  .pipe(minifycss())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist/'));
});

/********** Demo JS ***********/
gulp.task('demo:js', function () {
  return gulp.src(['demo/*.js'])
  .pipe(connect.reload())
  .pipe(gulp.dest('demo'));
});

/***********Demo CSS *******/
gulp.task('demo:css', function () {
  var processors = [autoprefixer()];
  return gulp.src(['demo/postcss/*.css'])
  .pipe(postcss(processors))
  .pipe(connect.reload())
  .pipe(gulp.dest('demo'));
});

/********** Demo Index ************/
gulp.task('demo:html', function () {
  return gulp.src('demo/index.html')
  .pipe(connect.reload())
  .pipe(htmlreplace({
    'js':
    [
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js',
    'demo/app.js',
    'src/*.js'
    ]
  }));
});

/************** Server *************/
gulp.task('start_server', function () {
  connect.server({
    root: '',
    port: 5000,
    livereload: true
  });
});

gulp.task('end_server', function () {
  connect.serverClose();
});

/**************Protractor **********/
gulp.task('webdriver-update', webdriverUpdate);

gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver-update', 'webdriver', 'start_server'], function() {
  return gulp.src('tests/e2e/*.js')
  .pipe(protractor({
    configFile: "tests/protractor.conf.js",
    args: ['--baseUrl', 'http://localhost:5000']
  }))
  .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

/************** Lint ***************/
gulp.task('lint', function () {
  return gulp.src(['src/*.js'])
  .pipe(jslint({
    global: ['angular'],
    indent: 2,
    devel: true,
    browser: true,
  }))
  .on('error', function (error) {
    console.error(String(error));
  })
});

/************** Clean *************/
gulp.task('clean', function (cb) {
  del(['dist'], cb);
});