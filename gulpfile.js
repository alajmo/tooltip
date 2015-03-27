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
  banner;

/*********** Build ***********/
gulp.task('default', ['clean'], function () {
  gulp.start('app:js', 'app:css', 'app:html', 'protractor');
});

gulp.task('build', ['clean'], function () {
  gulp.start('protractor', 'app:js', 'app:css', 'app:html');
});

/********** Development ******/
gulp.task('dev', function () {
  gulp.start('watch', 'start_server');
});

/********** Watch ************/
gulp.task('watch', function () {

  gulp.watch('src/ng-tooltip.js', ['app:js']);
  gulp.watch('demo/index.html', ['app:html']);
  gulp.watch('src/ng-tooltip.css', ['app:css']);

  gulp.watch(['demo/**/*', 'src/*']);
});

/********** JS ************/
gulp.task('app:js', function () {
  return gulp.src(['src/ng-tooltip.js'])
  .pipe(connect.reload())
  .pipe(header(banner, { pkg : pkg } ))
  .pipe(gulp.dest('dist'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist'));
});

/********** CSS ************/
gulp.task('app:css', function () {
  var processors = [autoprefixer({ browsers: ['last 5 version'] })];
  return gulp.src(['src/*.css'])
  .pipe(postcss(processors))
  .pipe(concat('ng-tooltip.css'))
  .pipe(gulp.dest('dist'))
  .pipe(minifycss())
  .pipe(rename({ suffix: '.min' }))
  .pipe(connect.reload())
  .pipe(gulp.dest('dist/'));
});

/********** Demo Index ************/
gulp.task('app:html', function () {
  return gulp.src('demo/index.html')
  .pipe(connect.reload())
  .pipe(htmlreplace({
    'js':
    [
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js',
    'demo/app.js',
    'src/ng-tooltip.js'
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
  return gulp.src(['src/ng-tooltip.js'])
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

/************* Header *************/
pkg = require('./package.json');
banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version <%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');
