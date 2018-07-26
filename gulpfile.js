'use strict';

let gulp = require('gulp');
let runSequence =  require('run-sequence');

require('require-dir')('tasks');

gulp.task('dist', function (callback) {
    runSequence(['images'], ['fonts'], ['scss'], ['scripts'], ['views'], callback);
});

gulp.task('dev', function (callback) {
    runSequence(
        ['images:watch'],
        ['fonts:watch'],
        ['scss:watch'],
        ['scripts:watch'],
        ['views:watch'],
        callback);
});
