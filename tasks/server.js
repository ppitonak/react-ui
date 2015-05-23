'use strict';

var browserSync = require('browser-sync');

module.exports = function(gulp, opts) {
  gulp.task('server', ['vendors', 'html', 'js'], function () {
    browserSync({
      server: {
        baseDir: opts.dest.dist
      },
      notify: false
    });
  });

  gulp.task('server:min', ['vendors', 'html', 'js:min'], function () {
    browserSync({
      server: {
        baseDir: opts.dest.dist
      },
      notify: false
    });
  });

  gulp.task('watch', [], function () {
    gulp.watch([opts.paths.jsx], ['js', browserSync.reload]);
    gulp.watch([opts.paths.html], ['html', browserSync.reload]);
  });

  gulp.task('watch:min', [], function () {
    gulp.watch([opts.paths.jsx], ['js:min', browserSync.reload]);
    gulp.watch([opts.paths.html], ['html', browserSync.reload]);
  });
};
