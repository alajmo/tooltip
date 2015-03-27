// Karma configuration
// Generated on Sat Feb 14 2015 13:13:04 GMT+0100 (CET)
/*'../bower_components/angular-mocks/angular-mocks.js',*/

module.exports = function(config) {
  config.set({

    basePath: '../',
    frameworks: ['jasmine'],
    files: [
        "bower_components/angular/angular.js",
        "bower_components/angular/angular.animate.js",
        "node_modules/angular-mocks/angular-mocks.js",

        "src/*.js",

        "tests/unit/unit.js"
    ],
    // list of files to exclude
    exclude: [],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
});
};