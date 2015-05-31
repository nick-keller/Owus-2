var gulp = require('gulp');
var concat = require('gulp-concat');
var cache = require('gulp-cached');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');

var paths = {
    concat: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-jwt/dist/angular-jwt.js',
        'public/assets/compiled/temp/*.js',
        'public/app/app.module.js',
        'public/app/app.routing.js',
        'public/app/*/**/*.js'
    ],
    less: 'public/assets/less/design.less',
    angular_templates: 'public/app/**/*.html',
    app: 'public/app/**/*.js',
    watch: {
        concat: [
            'public/app/**/*.js',
            'public/assets/compiled/temp/*.js'
        ],
        less: 'public/assets/less/**/*.less'
    }
};

gulp.task('default', ['concat']);

gulp.task('watch', ['concat', 'less'], function() {
    gulp.watch(paths.watch.concat, ['concat']);
    gulp.watch(paths.watch.less, ['less']);
    gulp.watch(paths.angular_templates, ['angular-template']);
});

gulp.task('concat', ['angular-template'], function () {
    return gulp.src(paths.concat)
        .pipe(plumber())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('public/assets/compiled'));
});

gulp.task('angular-template', function () {
    return gulp.src(paths.angular_templates)
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('public/assets/compiled/temp'));
});

gulp.task('less', function() {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/assets/compiled'));
});