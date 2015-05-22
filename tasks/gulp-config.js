'use strict';

var _ = require('underscore');

var opts = {
  paths: {
    build: 'dist',
    htmlBuild: 'dist',
    vendorBuild: 'dist/vendor'
  },
  htmlFiles: 'app/**/*.html',
  jsxFiles: 'app/**/*.jsx',
  vendorFiles: [
    'bower_components/react/react-with-addons.js',
    'bower_components/patternfly/dist/css/patternfly.css'
  ],
  requireFiles: 'bower_components/react/react.js',
  entryFile: './app/js/app.jsx',

  lrPort: 35729,
  hostname: 'localhost',
  port: process.env.PORT || '9000'
};

module.exports = function(gulp, baseOpts) {
  var newOpts = _.extend({}, baseOpts, opts);
  return newOpts;
};
