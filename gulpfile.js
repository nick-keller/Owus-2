var gulp = require('gulp');
var concat = require('gulp-concat');
var cache = require('gulp-cached');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

var paths = {
    less: 'public/assets/less/main.less',
    compiled: 'public/assets/compiled'
};