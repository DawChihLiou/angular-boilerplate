var gulp       = require('gulp');
var sass       = require('gulp-ruby-sass');
var connect    = require('gulp-connect');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer');
var rename     = require('gulp-rename');
var bower      = require('gulp-bower');

// file directories
var config     = {
  sassDir : './sass',
  appDir  : './app',
  bowerDir: './.bower_components',
  destDir : './public'
}

/**
 * local server
 */
gulp.task('connect', function () {
  connect.server({
    root: config.destDir,
    port: 4000
  });
});

/**
 * browserify bundle + uglify
 */
gulp.task('browserify', function () {
  /*
   * 1. get files
   * 2. bundle files
   * 3. name bundled files main.js
   * 4. save main.js under ./public/js/ directory
   */
  return browserify(config.appDir + '/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.destDir + '/js'));
});

/**
 * sass
 */
gulp.task('sass', function () {
  return sass(config.sassDir + '/style.scss', {
    style   : 'compressed',
     loadPath: [
      config.sassDir,
       config.bowerDir + '/bootstrap-sass/assets/stylesheets',
       config.bowerDir + '/font-awesome/scss',
     ]}) 
    .pipe(gulp.dest('public/css'));
 });

/**
 * bower
 */
gulp.task('bower', function () {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});

/**
 * fontawesome
 */
gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest(config.destDir + '/fonts'))
});

/**
 * watch
 */
gulp.task('watch', function () {
  gulp.watch(config.appDir + '/**/*.js', ['browserify']);
  gulp.watch(config.sassDir + '/**/*.scss', ['sass']);
});

/**
 * run 'gulp' to file default task
 */
gulp.task('default', ['connect', 'watch', 'bower', 'icons']);
