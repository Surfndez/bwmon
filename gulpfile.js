var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),

	jshint = plugins.jshint,
	protractor = plugins.protractor.protractor,
	webdriverUpdate = plugins.protractor.webdriver_update,
	concat = plugins.concat,
	uglify = plugins.uglify,
	rename = plugins.rename,
	header = plugins.header,
	cssmin = plugins.minifyCss,
	htmlmin = plugins.htmlmin,
	templates = plugins.angularTemplatecache,
	preprocess = plugins.preprocess,
	connect = plugins.connect,

	pkg = require('./package.json'),
	extend = require('node.extend'),
	jshint_stylish = require('jshint-stylish'),
	del = require('del'),

	banner = '/*\n\t<%=pkg.name%> v<%=pkg.version%>\n\t(C) 2010 - 2015 VREM Software Development\n\t<%= pkg.homepage %>\n\tLicense: <%=pkg.license%>\n*/\n',
	srcdir = 'app',
	dstdir = 'dist',
	cmpdir = 'bower_components',

	files = {
		data: {
			src: [srcdir+'/bwmonUsage.js'],
			dest: dstdir
		},
		js: {
			src: [srcdir+'/**/*.js'],
			libs: [
				cmpdir+'/angular/angular.min.js',
				cmpdir+'/angular-route/angular-route.min.js',
				cmpdir+'/underscore/underscore-min.js',
				cmpdir+'/momentjs/min/moment.min.js',
				cmpdir+'/d3/d3.min.js',
				cmpdir+'/n3-line-chart/build/line-chart.min.js'
			],
			dest: dstdir+'/js',
			temp: 'bwmon.js',
			name: 'bwmon.min.js',
			excludes: '!'+srcdir+'/**/bwmonUsage.js'
		},
		unit: {
			src: ['test/unit/**/*.js'],
			libs: [cmpdir+'/angular-mocks/angular-mocks.js'],
			excludes: srcdir+'/**/!(bwmonUsage).js'
		},
		e2e : {
			src: ['test/e2e/**/*.js']
		},
		css: {
			src: srcdir+'/css/app.css',
			libs: cmpdir+'/bootstrap/dist/css/bootstrap.min.css',
			dest: dstdir+'/css',
			name: 'bwmon.min.css'
		},
		templates:  {
			src: srcdir+'/templates/**.tpl.html',
			module: 'BWMonApp',
			root: 'templates/',
			dest: srcdir+'/js'
		},
		html:  {
			src: srcdir+'/index.html',
			dest: dstdir,
			preprocess: {context: {PRODUCTION: true}}
		}
	},
	objectExists = function(object) {
		return typeof object != "undefined";
	},
	karma = function(done, config) {
		var Server = require('karma').Server,
			defaults = {
				files: [].concat(files.js.libs, files.unit.libs, files.js.src, files.unit.src, files.data.src, files.unit.excludes),
				configFile: __dirname+'/config/karma.conf.js',
			},
			parameters = extend(defaults, config);
		new Server(parameters, done).start();
	};

gulp.task('templates', function() {
	return gulp
		.src(files.templates.src)
		.pipe(htmlmin())
		.pipe(templates({
			module: files.templates.module,
			root: files.templates.root
		}))
		.pipe(gulp.dest(files.templates.dest));
});

gulp.task('jshint', function() {
	var src = [].concat(files.js.src, files.unit.src, files.e2e.src, files.data.src);
	return gulp
		.src(src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshint_stylish))
		.pipe(jshint.reporter('fail'));
});

gulp.task('unit', ['jshint'], function(done) { karma(done); });
gulp.task('unit_auto', function(done) { karma(done, {autoWatch: true, singleRun: false}); });
gulp.task('coverage', function(done) { karma(done, {reporters: ['coverage']}); });

gulp.task('cssmin', function() {
	return gulp
		.src(files.css.src)
		.pipe(cssmin())
		.pipe(concat(files.css.name))
		.pipe(gulp.dest(files.css.dest));
});

gulp.task('csslibs', function() {
	return gulp
		.src(files.css.libs)
		.pipe(gulp.dest(files.css.dest));
});

gulp.task('jslibs', function() {
	return gulp
		.src(files.js.libs)
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('uglify', ['templates', 'unit'], function() {
	var src = [].concat(files.js.src, files.js.excludes);
	return gulp
		.src(src)
		.pipe(concat(files.js.temp, {newLine: ';'}))
		.pipe(gulp.dest(files.js.dest))
		.pipe(rename(files.js.name))
		.pipe(uglify())
		.pipe(header(banner, {pkg: pkg}))
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('html', function() {
	return gulp
		.src(files.html.src)
		.pipe(preprocess(files.html.preprocess))
		.pipe(gulp.dest(files.html.dest));
});

gulp.task('data', function() {
	return gulp
		.src(files.data.src)
		.pipe(gulp.dest(files.data.dest));
});

gulp.task('webserver', ['jslibs', 'uglify', 'csslibs', 'cssmin', 'html', 'data', ], function() {
	connect.server({
		root: dstdir,
		port: 8080
	});
});

gulp.task('webdriverUpdate', webdriverUpdate);

gulp.task('e2e', ['webdriverUpdate', 'webserver'], function() {
	return gulp
		.src(files.e2e.src)
		.pipe(protractor({configFile: __dirname+'/config/protractor.conf.js'}));
});

gulp.task('build', ['e2e'], function() {
	connect.serverClose();
	return del(files.js.dest+'/'+files.js.temp);
});

gulp.task('watch', function() {
	var src = [].concat(files.main.src, files.unit.src, files.e2e.src, files.data.src);
	gulp.watch(src, ['jshint']);
});

gulp.task('default', ['build']);
