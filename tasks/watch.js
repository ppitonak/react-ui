'use strict';

var livereload  = require('gulp-livereload'),
    gutil       = require('gulp-util'),
    source      = require('vinyl-source-stream'),
    connect     = require('connect'),
    del         = require('del'),
    serveStatic = require('serve-static'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    es6ify      = require('es6ify'),
    reactify    = require('reactify'),
    browserSync = require('browser-sync'),
    _           = require('underscore');

module.exports = function(gulp, opts) {
  gulp.task('server', function () {
    browserSync({
      server: {
        baseDir: opts.dest.dist
      }
    });
  });

  gulp.task('vendor', function () {
    return gulp.src(opts.vendorFiles).
        pipe(gulp.dest(opts.paths.vendorBuild));
  });

  var browserifyOpts = {
    entries: opts.entryFile,
    debug: true,
    fullPaths: true,
    transform: [reactify, es6ify.configure(/.jsx/)]
  };

  var customOpts = _.extend({}, watchify.args, browserifyOpts);

  var browserifyBundle = browserify(customOpts);

  es6ify.traceurOverrides = {experimental: true};

  browserifyBundle.on('update', bundle);
  browserifyBundle.on('log', gutil.log);

  gulp.task('bundle', function() {
    bundle(false);
  });

  gulp.task('serve', function (next) {
    var app = connect();
    app.use(serveStatic(opts.paths.build));
    app.listen(opts.port, next);
  });

  gulp.task('main', ['vendor', 'serve'], function () {
    var lrServer = livereload(opts.lrPort);
    var reloadPage = function (evt) {
      lrServer.changed(evt.path);
    };

    function initWatch(files, task) {
      gulp.start(task);
      gulp.watch(files, [task]);
    }

    bundle(true);

    initWatch(opts.htmlFiles, 'html');

    gulp.watch([opts.paths.build + '/**/*'], reloadPage);
  });

  function bundle(watch) {
    var bundler = watch ? watchify(browserifyBundle) : browserifyBundle;
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(opts.paths.build + '/js'));
  }
};
