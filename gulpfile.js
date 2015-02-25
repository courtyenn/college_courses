'use strict';

var gulp   = require('gulp');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');

var paths = {
  watch: ['./gulpfile.js', './js/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
};

gulp.task('testing', function(){
  gulp.src('test/college-courses_test.js').pipe(jasmine({
    includeStackTrace:true
  }));
});

gulp.task('watch', function () {
  gulp.watch(paths.watch, ['testing']);
});


gulp.task('default', ['watch']);
