/**
 * Gulp views task file
 * This task minifies and copies all font assets to the public folder
 * @todo add gulp plugin to minify font assets
 */

'use strict';

const gulp = require('gulp');

const files = ['assets/fonts/**/*.eot',
        'assets/fonts/**/*.svg',
        'assets/fonts/**/*.ttf',
        'assets/fonts/**/*.woff',
        'assets/fonts/**/*.woff2'];

gulp.task('fonts', () => {
        return gulp.src(files)
                .pipe(gulp.dest('./public/fonts'));
});

gulp.task('fonts:watch', () => {
        gulp.watch(files, ['fonts']);
});
