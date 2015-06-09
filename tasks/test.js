'use strict';

var mocha = require('gulp-mocha');
require('../tests/util/compiler');

module.exports = function(gulp, opts) {
  gulp.task('unit-tests', function() {
    return gulp.src('tests/hello-test.js', {
        read: false
      })
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({
        reporter: 'spec'
      }));
  });
};
