'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync');

var opts = require('./tasks/gulp-config.js')(gulp, {});

require('./tasks/util.js')(gulp, opts);
require('./tasks/install.js')(gulp, opts);
require('./tasks/build.js')(gulp, opts);
require('./tasks/watch.js')(gulp, opts);

gulp.task('default', ['serve']);

gulp.task('install', ['bower-install']);

gulp.task('serve', ['clean', 'lint', 'html', 'js', 'server'], function() {
  return gulp.watch([
    opts.paths.jsx, opts.paths.html
  ], [
    'lint', 'html', 'js', browserSync.reload
  ]);
});

gulp.task('serve:minified', ['clean', 'lint', 'html', 'js:min', 'server'], function() {
  return gulp.watch([
    opts.paths.jsx, opts.paths.html
  ], [
    'lint', 'html', 'js:min', browserSync.reload
  ]);
});
