/**
 * Created by luis_blanco on 11/21/2014.
 */

module.exports = function (grunt) {
    // Load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function (task) {
            grunt.loadNpmTasks(task)
        });

    // Configure plugins.
    grunt.initConfig({
        cafemocha: {
            all: {src: 'qa/tests-*.js', options: {ui: 'tdd'}}
        },
        jshint: {
            app: ['meadowlark.js', 'public/js/**/*/*.js', 'lib/**/*.js'],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
        },
        exec: {
            linkchecker: {cmd: 'linkchecker http://localhost:4390'}
        }
    });

    // Setup environment option.
    var target = grunt.option('target') || 'dev';

    // Register tasks.
    grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};
