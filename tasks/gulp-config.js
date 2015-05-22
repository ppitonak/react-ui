'use strict';

var _ = require('underscore');

var opts = {
  paths: {
    html: './app/**/*.html',
    jsx: './app/**/*.jsx',
    app: './app/app.jsx'
  },
  dest: {
    app: 'app.js',
    dist: './dist'
  },
  vendorFiles: [
    'bower_components/react/react-with-addons.js',
    'bower_components/patternfly/dist/css/patternfly.css'
  ],
  entryFile: './app/js/app.jsx',

  lrPort: 35729,
  hostname: 'localhost',
  port: process.env.PORT || '9000'
};

module.exports = function(gulp, baseOpts) {
  var newOpts = _.extend({}, baseOpts, opts);
  return newOpts;
};
