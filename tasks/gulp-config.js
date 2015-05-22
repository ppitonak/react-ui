'use strict';

var _ = require('underscore')
  ;

var opts = {
  paths: {
    dist: 'dist',
    htmlBuild: opts.paths.dist,
    vendorBuild: opts.paths.dist + '/vendor'
  },
  htmlFiles: 'app/**/*.html',
  jsxFiles: 'app/**/*.jsx',
  vendorFiles: [
    'bower_components/react/react-with-addons.js',
    'bower_components/patternfly/dist/css/patternfly.css'
  ],
  requireFiles: 'bower_components/react/react.js',
  entryFile: './app/app.jsx',

  lrPort: 35729,
  hostname: 'localhost',
  port: process.env.PORT || '9000'
};

module.exports = function(gulp, baseOpts) {
  var newOpts = _.extend({}, baseOpts, opts);
  return newOpts;
};
