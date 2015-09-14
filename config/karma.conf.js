module.exports = function(config){
	'use strict';

	config.set({
		basePath: '../',
		files: [
			'app/libs/angular/angular.js',
			'app/libs/angular-route/angular-route.js',
			'app/libs/angular-mocks/angular-mocks.js',
			'app/libs/momentjs/moment.js',
			'app/libs/underscore/underscore.js',
			'app/libs/d3/d3.js',
			'app/libs/n3-line-chart/build/line-chart.js',
			'app/js/**/*.js',
			'app/bwmonUsage.js',
			'test/unit/**/*.js'
		],
		exclude: [
//			'app/js/**/*.min.js',
		],
		frameworks: ['jasmine'],
		browsers : [
//			'Chrome',
//			'Firefox',
			'PhantomJS'
		],
		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-coverage',
			'karma-junit-reporter'
		],
		reporters: [
			'progress',
			'junit'
		],
		junitReporter: {
			outputDir: 'logs',
			outputFile: 'logs/test-results.xml',
			suite: 'unit'
		},
		preprocessors: {
			'app/js/**/*.js': 'coverage'
		},
		coverageReporter: {
			type: 'html',
			dir: 'logs/'
		}
	});
};
