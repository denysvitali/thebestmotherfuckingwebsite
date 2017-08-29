'use strict';
var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var htmlMinifier = require('gulp-html-minifier');
var del = require('del');

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
    return gulp.watch('src/**/*', ['views', 'less', 'copy']);
});

gulp.task('build', ['views', 'css', 'copy']);

gulp.task('cleanandbuild', ['clean', 'build']);

gulp.task('default', ['cleanandbuild']);
