var gulp       = require('gulp');
var sass       = require('gulp-ruby-sass');
var connect    = require('gulp-connect');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');

// local server
gulp.task('connect', function () {
  connect.server({
    root: 'public',
    port: 4000
  });
});

// Browserify
gulp.task('browserify', function () {
  /*
   * 1. get files
   * 2. bundle files
   * 3. name bundled files main.js
   * 4. save main.js under ./public/js/ directory
   */
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js/'));
});
