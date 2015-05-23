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
    dist: './dist',
    vendorDist: './dist/lib'
  },
  vendors: [
    'react'
  ]
};

module.exports = function(gulp, baseOpts) {
  var newOpts = _.extend({}, baseOpts, opts);
  return newOpts;
};
