'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync');

var opts = require('./tasks/gulp-config.js')(gulp, {});

require('./tasks/util.js')(gulp, opts);
require('./tasks/install.js')(gulp, opts);
require('./tasks/build.js')(gulp, opts);
require('./tasks/server.js')(gulp, opts);
require('./tasks/test.js')(gulp, opts);

gulp.task('default', ['serve']);

gulp.task('install', ['bower-install']);

gulp.task('serve', ['server', 'watch'], function() {});
gulp.task('serve:min', ['server:min', 'watch:min'], function() {});

gulp.task('test', ['unit-tests']);
