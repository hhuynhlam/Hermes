'use strict';

var del = require('del');
var gulp = require('gulp');
var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
var Karma = require('karma').Server;
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');


//======================================
// JSHint
//======================================

gulp.task('jshint', function() {
    return gulp.src([
        'gruntfile.js', 
        '**/*.js', 
        '!src/client/vendor/**/*.js', 
        '!_archive/**/*.js',
        '!node_modules/**/*.js',
        '!**/*.spec.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


//======================================
// Less
//======================================

gulp.task('less', function () {
    return gulp.src('./src/client/styles/global.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/client/styles'));
});


//======================================
// Jade
//======================================

gulp.task('jade', function () {
    return gulp.src([
        './src/client/**/*.jade'
    ])
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./src/client'));
});


//======================================
// RJS Optimize
//======================================
//
// gulp.task('rjs', function() {
//     rjs({
//         baseUrl: './',
//         insertRequire: ['app.js'],
//         mainConfigFile: './core/require-config.js',
//         name: './app.js',
//         out: 'main.js'
//     })
//     .pipe(uglify())
//     .pipe(gulp.dest('_dist'));
// });


//======================================
// Test
//======================================

gulp.task('karma', function(done) {
    new Karma({
        configFile: __dirname + '/build/test/karma.conf.js',
        singleRun: true
    }, done).start();
});


//======================================
// Watch
//======================================
 
gulp.task('watch', function () {
    gulp.watch('./**/*.less', ['less']);
    gulp.watch('./**/*.jade', ['jade']);
});


//======================================
// BUILD
//======================================
 
gulp.task('clean', function() {
    del(['_dist/**/*']);
});

gulp.task('copy', function() {
    
    // copy over node_modules
    gulp.src([
        'node_modules/**'
    ])
    .pipe(gulp.dest('_dist/node_modules'));

    // copy over src
    gulp.src([
        'src/**'
    ])
    .pipe(gulp.dest('_dist/src'));
    
});


//======================================
// Shell
//======================================

gulp.task('server', ['less', 'jade'], shell.task([ 'npm start' ]));


//======================================
// Primary Tasks
//======================================
gulp.task('build', ['clean', 'copy']);
gulp.task('default', ['jshint', 'less', 'jade']);
gulp.task('test', ['jshint', 'karma']);


