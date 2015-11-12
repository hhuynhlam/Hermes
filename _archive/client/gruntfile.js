'use strict';

module.exports = function(grunt) {

var _ = require('lodash');
var jasmineOptions = {
    display: 'full',
    summary: true,
    template: require('grunt-template-jasmine-requirejs'),
    templateOptions: {
        requireConfigFile: './core/require-config.js',
        requireConfig: {
            baseUrl: './',
        }
    }
};

// Setup Grunt
grunt.initConfig({

    jasmine: {
        ui: {
            options: _.assign({
                specs: grunt.file.expand([
                    './**/*.spec.js',
                    '!./vendor/**/*.spec.js'
                ])
            }, jasmineOptions)
        },

        single: {
            options: _.assign({
                specs: grunt.file.expand([
                    './**/*.spec.js',
                    '!./vendor/**/*.spec.js'
                ])
            }, jasmineOptions)
        }
    }

});

// Load Grunt plugins
grunt.loadNpmTasks('grunt-contrib-jasmine');

// Register Grunt tasks
grunt.registerTask('default', []);
grunt.registerTask('test', ['jasmine:ui']);
grunt.registerTask('tdd', ['jasmine:single']);

};