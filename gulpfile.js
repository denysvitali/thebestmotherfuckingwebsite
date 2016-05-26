'use strict';
var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var del = require('del');

gulp.task('views', () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('less', () => {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('css', () => {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', ()=>{
  del('dist');
});

gulp.task('default', ['clean','views', 'css']);