'use strict';

var source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    es6ify      = require('es6ify'),
    reactify    = require('reactify'),
    buffer      = require('vinyl-buffer'),
    uglify      = require('gulp-uglify'),
    _           = require('underscore');

module.exports = function(gulp, opts) {

  gulp.task('vendors', function () {
    return gulp.src('./bower_components/react/react-with-addons.js')
      .pipe(gulp.dest(opts.dest.vendorDist));
  });

  gulp.task('html', function() {
    return gulp.src(opts.paths.html)
      .pipe(gulp.dest(opts.dest.dist));
  });

  var browserifyOpts = {
    entries: opts.paths.app,
    debug: true,
    fullPaths: true,
    extensions: ['.jsx'],
    transform: [reactify, es6ify.configure(/.jsx/)]
  };

  es6ify.traceurOverrides = {experimental: true};

  var customOpts = _.extend({}, watchify.args, browserifyOpts);

  gulp.task('lint', function(next) {
  });

  gulp.task('js', function(next) {
    var stream = browserify(browserifyOpts);

    opts.vendors.forEach(function(vendor) {
      stream.external(vendor);
    });

    return stream.bundle()
      .pipe(source(opts.dest.app))
      .pipe(gulp.dest(opts.dest.dist));
  });

  gulp.task('js:min', function(next) {
    var stream = browserify(browserifyOpts);

    opts.vendors.forEach(function(vendor) {
      stream.external(vendor);
    });

    return stream.bundle()
      .pipe(source(opts.dest.app))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(opts.dest.dist));
  });
};
