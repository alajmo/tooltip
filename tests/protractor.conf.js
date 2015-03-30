'use strict';

exports.config = {

  seleniumServerJar: '../node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

  capabilities: {
      browserName: 'chrome'
  },

  framework: 'jasmine',

  specs: ['e2e/*.js']
};