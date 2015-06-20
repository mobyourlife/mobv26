var config = require('../config'),
    gulp = require('gulp'),
    debug = require('gulp-debug'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename');

gulp.task('sass', function () {
    gulp.src(config.sass.src + config.wildcards.all_sass)
        .pipe(sass({
        includePaths: config.sass.includePaths
    }))
        .pipe(gulp.dest(config.sass.dist))
        .pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(minify())
        .pipe(rename({
        suffix: '.min'
    }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.sass.dist))
        .pipe(debug());
});