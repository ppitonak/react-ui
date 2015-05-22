'use strict';

var livereload  = require('gulp-livereload'),
    gutil       = require('gulp-util'),
    source      = require('vinyl-source-stream'),
    connect     = require('connect'),
    serveStatic = require('serve-static'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    es6ify      = require('es6ify'),
    reactify    = require('reactify'),
    _           = require('underscore');

module.exports = function(gulp, opts) {
  gulp.task('vendor', function () {
    return gulp.src(opts.vendorFiles).
        pipe(gulp.dest(opts.paths.vendorBuild));
  });


  gulp.task('html', function () {
    return gulp.src(opts.htmlFiles).
        pipe(gulp.dest(opts.paths.htmlBuild));
  });

  var browserifyOpts = {
    entries: opts.entryFile,
    debug: true,
    transform: [reactify, es6ify.configure(/.jsx/)]
  };

  var opts = _.extend({}, watchify.args, browserifyOpts);

  var bundler = watchify(browserify(opts));

  var dist = opts.paths.build;

  es6ify.traceurOverrides = {experimental: true};

//  bundler.require(opts.requireFiles);

  bundler.on('update', bundle);
  bundler.on('log', gutil.log);

  gulp.task('bundle', bundle(bundler, opts));

  gulp.task('serve', function (next) {
      var app = connect();
      app.use(serveStatic(dist));
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

    bundle();

    initWatch(opts.htmlFiles, 'html');

    gulp.watch([opts.paths.dist + '/**/*'], reloadPage);
  });

  function bundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(opts.paths.dist + '/js'));
  }
};
