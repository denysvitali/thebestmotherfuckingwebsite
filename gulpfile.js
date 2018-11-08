'use strict';
const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const htmlMinifier = require('gulp-html-minifier');
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('views', () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({}))
        .pipe(htmlMinifier({
            removeComments: true,
            collapseWhitespace: true,
            removeTagWhitespace: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', () =>
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img/'))
);

gulp.task('less', () => {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy', () => {
    return gulp.src('src/dist/**/*')
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', () => {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', (cb) => {
    return del.sync('dist',cb);
});

gulp.task('watch', () => {
    return gulp.watch('src/**/*', ['views', 'css', 'images', 'copy']);
});

gulp.task('build', ['views', 'css', 'images', 'copy']);
gulp.task('cleanandbuild', ['clean', 'build']);
gulp.task('default', ['cleanandbuild']);
