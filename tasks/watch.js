'use strict';

var livereload = require('gulp-livereload'),
    gutil      = require('gulp-util'),
    rename     = require('gulp-rename'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    es6ify     = require('es6ify');

module.exports = function(gulp, opts) {
  gulp.task('vendor', function () {
    return gulp.src(opts.vendorFiles).
        pipe(gulp.dest(opts.paths.vendorBuild));
  });


  gulp.task('html', function () {
    return gulp.src(opts.htmlFiles).
        pipe(gulp.dest(opts.paths.htmlBuild));
  });

  function compileScripts(watch) {
    gutil.log('Starting browserify');

    es6ify.traceurOverrides = {experimental: true};

    var bundler;
    if (watch) {
      bundler = watchify(opts.entryFile);
    } else {
      bundler = browserify(opts.entryFile);
    }

    bundler.require(opts.requireFiles);
    bundler.transform(reactify);
    bundler.transform(es6ify.configure(/.jsx/));

    var rebundle = function () {
      var stream = bundler.bundle({ debug: true});

      stream.on('error', function (err) { console.error(err) });
      stream = stream.pipe(source(opts.entryFile));
      stream.pipe(rename('app.js'));

      stream.pipe(gulp.dest('dist/bundle'));
    }

    bundler.on('update', rebundle);
    return rebundle();
  }

  gulp.task('serve', function (next) {
      var server = connect();
      server.use(connect.static(opts.paths.dist)).listen(opts.port, next);
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

    compileScripts(true);
    initWatch(opts.htmlFiles, 'html');

    gulp.watch([opts.paths.dist + '/**/*'], reloadPage);
  });
};
