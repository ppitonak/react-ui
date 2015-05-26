'use strict';

var source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    es6ify      = require('es6ify'),
    babelify    = require('babelify'),
    buffer      = require('vinyl-buffer'),
    uglify      = require('gulp-uglify'),
    util        = require('gulp-util');

module.exports = function(gulp, opts) {

  gulp.task('vendors', ['clean'], function () {
    gulp.src('./bower_components/react/react.js')
      .pipe(gulp.dest(opts.dest.vendorDist));

    gulp.src('./bower_components/patternfly/dist/css/patternfly.css')
      .pipe(gulp.dest(opts.dest.dist + '/css'))
  });

  gulp.task('html', ['clean'], function() {
    return gulp.src(opts.paths.html)
      .pipe(gulp.dest(opts.dest.dist));
  });

  var browserifyOpts = {
    entries: opts.paths.app,
    debug: true,
    fullPaths: true,
    extensions: ['.jsx']
  };

  gulp.task('lint', function(next) {
  });

  gulp.task('js', ['vendors'], function(next) {
    es6ify.traceurOverrides = {experimental: true};

    var stream = browserify(browserifyOpts);

    stream.add(es6ify.runtime);

    opts.vendors.forEach(function(vendor) {
      stream.external(vendor);
    });

    stream.transform(babelify);
    stream.transform(es6ify.configure(/.jsx/));

    return stream.bundle()
      .on('error', util.log)
      .pipe(source(opts.dest.app))
      .pipe(gulp.dest(opts.dest.dist));
  });

  gulp.task('js:min', ['vendors'], function(next) {
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
