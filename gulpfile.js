var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleancss = require('gulp-clean-css');
var size = require('gulp-size');

gulp.task('compile', function() {
	return gulp.src('scss/*.scss')
		.pipe(plumber())
		.pipe(sass({
			precision: 6
		}).on('error', sass.logError))
		.pipe(gulp.dest('dist'));
});

gulp.task('prefix', ['compile'], function () {
	return gulp.src('dist/*.css')
		.pipe(plumber())
		.pipe(postcss([ autoprefixer() ]))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify', ['prefix'], function () {
	return gulp.src('dist/*.css')
		.pipe(plumber())
		.pipe(cleancss({
			format: {
				breaks: {
					afterComment: true
				}
			},
			level: {
				1: {
					all: true
				},
				2: {
					all: true
				}
			}
		}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(size({
			showFiles: true,
			gzip: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('beautify', ['minify'], function () {
	return gulp.src('dist/*.css')
		.pipe(plumber())
		.pipe(cleancss({
			format: 'beautify',
			level: 0
		}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['beautify'], function() {
	gulp.watch('scss/**/*.scss', ['beautify']);
});
