'use strict';

var gulp        = require('gulp');
var gbrowserify = require('gulp-browserify');
var browserify  = require('browserify');
var babelify    = require("babelify");
var vueify      = require('vueify')
var stripDebug  = require('gulp-strip-debug');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var server      = require('gulp-express');
var htmlmin     = require('gulp-htmlmin');

gulp.task('server', function () {
    server.run(['index.js']);
    gulp.watch([
        'environments/development/**/*.css',
        'environments/development/**/*.js', 
        'environments/development/**/*.jsx'
    ], server.notify);
});

gulp.task('views',function(){
    gulp.src('./app/views/**/*.html',{base : './app'})
        .pipe(gulp.dest('./environments/development/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./environments/production/'));
});

gulp.task('img',function(){
    gulp.src('./app/img/**/*.*',{base : './app'})
        .pipe(gulp.dest('./environments/development/'))
        .pipe(gulp.dest('./environments/production/'));
});

gulp.task('media',function(){
    gulp.src('./app/media/**/*.*',{base : './app'})
        .pipe(gulp.dest('./environments/development/'))
        .pipe(gulp.dest('./environments/production/'));
});

gulp.task('browserify', function () {
    gulp.src('./app/app.js', {entry: true})
        .pipe(gbrowserify({
            transform: ['vueify','babelify']
        }))
        .pipe(gulp.dest('./environments/development/js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./environments/production/js'))
});


gulp.task('sass', function () {
    gulp.src('./app/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./environments/development/css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./environments/production/css'));
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.html', ['frontEnd']);
    gulp.watch('app/**/*.scss', ['frontEnd']);
    gulp.watch('app/**/*.js', ['frontEnd']);
    gulp.watch('app/**/*.vue', ['frontEnd']);
    gulp.watch('app/**/*.jsx', ['frontEnd']);
});

gulp.task('frontEnd', ['browserify', 'sass', 'img', 'media', 'views']);
gulp.task('default',  ['browserify', 'sass', 'img', 'media', 'views', 'watch', 'server']);
