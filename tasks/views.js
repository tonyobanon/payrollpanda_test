/**
 * Gulp views task file
 * Copies all views to the public folder
 */

'use strict';

const gulp = require('gulp');

gulp.task('views', () => {
        return gulp.src(['assets/views/**/*.html'])
                .pipe(gulp.dest('./public'));
});

gulp.task('views:watch', () => {
        gulp.watch(['assets/views/**/*.html'], ['views']);
    });
