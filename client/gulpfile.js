'use strict';

var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var rjs = require('gulp-requirejs');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');


//======================================
// JSHint
//======================================

gulp.task('jshint', function() {
    return gulp.src([
        'gruntfile.js', 
        '**/*.js', 
        '!_dist/**/*.js', 
        '!vendor/bower_components/**/*.js', 
        '!node_modules/**/*.js',
        '!**/*.spec.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


//======================================
// Less
//======================================

gulp.task('less', function () {
    return gulp.src('./assets/less/global.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./assets/css'));
});

//======================================
// Jade
//======================================

gulp.task('jade', function () {
    return gulp.src([
        './**/*.jade',
        '!./**/*_layout.jade',
        '!./**/*navbar.jade'
    ])
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./'));
});


//======================================
// Clean
//======================================

gulp.task('clean', function() {
    del(['_dist/**/*']);
});


//======================================
// Copy
//======================================

gulp.task('copy', function() {
    
    // concat/minify css
    gulp.src([
        'vendor/bower_components/bootstrap/dist/css/bootstrap.min.css',
        'vendor/bower_components/font-awesome/css/font-awesome.min.css',
        'vendor/bower_components/fullcalendar/dist/fullcalendar.min.css',
        'vendor/bower_components/kendo/styles/kendo.common-bootstrap.min.css',
        'assets/css/global.css'])
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('_dist'));

    // copy over images
    gulp.src([
        'assets/img/**'
    ])
    .pipe(gulp.dest('_dist/assets/img'));

    // copy over fonts
    gulp.src([
        'assets/font/**'
    ])
    .pipe(gulp.dest('_dist/assets/font'));

    // copy vendor/require.js
    gulp.src([
        'vendor/bower_components/requirejs/require.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('_dist'));

    // copy index.html
    gulp.src([
        'index.release.html'
    ])
    .pipe(rename('index.html'))
    .pipe(minifyHtml())
    .pipe(gulp.dest('_dist'));
    
    // copy html
    gulp.src([
        '**/*.html', 
        '!node_modules/**', 
        '!vendor/**', 
        '!index.html',
        '!index.release.html',
        '!_dist/**'])
    .pipe(minifyHtml())
    .pipe(gulp.dest('_dist'));

    // copy .htaccess
    gulp.src([
        '.htaccess'
    ])
    .pipe(gulp.dest('_dist'));
});


//======================================
// RJS Optimize
//======================================
//
gulp.task('rjs', function() {
    rjs({
        baseUrl: './',
        insertRequire: ['app.js'],
        mainConfigFile: './core/require-config.js',
        name: './app.js',
        out: 'main.js'
    })
    .pipe(uglify())
    .pipe(gulp.dest('_dist'));
});

//======================================
// Watch
//======================================
 
gulp.task('watch', function () {
    gulp.watch('./**/*.less', ['less']);
    gulp.watch('./**/*.jade', ['jade']);
});


//======================================
// Shell
//======================================

gulp.task('serve', ['less', 'jade'], shell.task([ 'node ./_mock/server.js' ]));


//======================================
// Primary Tasks
//======================================
gulp.task('default', ['jshint', 'less', 'jade']);
gulp.task('build', ['copy', 'rjs']);


