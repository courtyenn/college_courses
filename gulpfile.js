'use strict';

var gulp   = require('gulp');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');

var paths = {
  watch: ['./gulpfile.js', './js/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
  source: ['./lib/*.js']
};

gulp.task('testing', function(){
  gulp.src(paths.tests).pipe(jasmine({
    includeStackTrace:true
  }));
});

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['testing']);

gulp.task('default', ['test']);
