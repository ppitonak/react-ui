'use strict';

var del = require('del');

module.exports = function(gulp, opts) {
  gulp.task('clean', function(next) {
    del([opts.dest.dist + '/**/*'], next);
  });
};
