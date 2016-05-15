var gulp       = require('gulp');
var sass       = require('gulp-ruby-sass');
var connect    = require('gulp-connect');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer');

/**
 * local server
 */
gulp.task('connect', function () {
  connect.server({
    root: 'public',
    port: 4000
  });
});

/**
 * browserify
 */
gulp.task('browserify', function () {
  /*
   * 1. get files
   * 2. bundle files
   * 3. name bundled files main.js
   * 4. save main.js under ./public/js/ directory
   */
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

/**
 * sass
 */
gulp.task('sass', function () {
  return sass('./sass/style.sass')
    .pipe(gulp.dest('public/css'));
 });

/**
 * watch
 */
// TODO: watch sass as well
gulp.task('watch', function () {
  gulp.watch('./app/**/*.js', ['browserify']);
  gulp.watch('./sass/**/*.sass', ['sass']);
});

/**
 * run 'gulp' to file default task
 */
gulp.task('default', ['connect', 'watch']);
