var gulp = require('gulp'), gulpLoadPlugins = require('gulp-load-plugins'), plugins = gulpLoadPlugins();

var cdnUrl = [
	// [ 'assets/', 'https://s.anw.red/' ],
	[	'assets/vue.js', 'https://s.anw.red/js/vue.min.js' ],
	[	'assets/', 'https://s.anw.red/2018-party/' ]
];

var cssProcess = [
	[	'/* animation: body-show .2s ease-out 9.6s both; */', 'animation: body-show .2s ease-out 9.6s both;' ]
];

gulp.task('default', function() {

	gulp.src('*.html')
		.pipe(plugins.cacheBust({
      type: 'MD5',
      basePath: './'
    	}))
		.pipe(plugins.batchReplace(cdnUrl))
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('builds'));


	gulp.src('assets/main.js')
    .pipe(plugins.minify({
			ext:{
            min:'.js'
        },
				noSource: true
		}))
    .pipe(gulp.dest('builds'))

	gulp.src('assets/*.css')
		.pipe(plugins.batchReplace(cssProcess))
  	.pipe(plugins.cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('builds'));
});

gulp.task('watch', function() {
	gulp.watch(['*','*/*'], ['default']);
 });
