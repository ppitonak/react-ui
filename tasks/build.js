'use strict';

var source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    es6ify      = require('es6ify'),
    reactify    = require('reactify'),
    buffer      = require('vinyl-buffer'),
    uglify      = require('gulp-uglify');

module.exports = function(gulp, opts) {
  gulp.task('lint', function(next) {
  });

  gulp.task('js', function(next) {
    return browserify(opts.paths.app)
      .transform(reactify)
      .bundle()
      .pipe(source(opts.dest.app))
      .pipe(gulp.dest(opts.dest.dist));
  });

  gulp.task('js:min', function(next) {
    return browserify(opts.paths.app)
      .transform(reactify)
      .bundle()
      .pipe(source(opts.dest.app))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(opts.dest.dist));
  });
};
