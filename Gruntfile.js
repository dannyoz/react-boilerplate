module.exports = function(grunt) {

    // CONFIG 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    //'app/bower_components/jquery/dist/jquery.js',
                    'app/bower_components/react/react.js',
                    'app/components/**/*.js'
                ],
                dest: 'app/main.js',
            }
        },

        uglify: {
            build: {
                src: 'app/main.js',
                dest: 'build/js/main.min.js'
            }
        },

        react: {
            jsx: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/components/',
                        src: [ '**/*.jsx' ],
                        dest: 'app/components/',
                        ext: '.js'
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: [
                    'app/components/**/*.js'
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                },
            },

            css: {
                files: [
                    'app/**/*.scss'
                ],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            },

            json: {
                files:[
                    'app/**/*.json'
                ],
                tasks: ['copy:json']
            },

            react: {
                files: 'app/components/**/*.jsx',
                tasks: ['react']
            },

            livereload: {
                options: { livereload: 1338 },
                files: [
                    'app/**/*.js',
                    'app/**/*.html',
                    'app/**/*.json',
                    'app/**/*.scss',
                    'build/css/*.css',
                    'build/js/*.js',
                    'build/views/*.html'
                    ],
            }
        },

        compass: {                  
            dist: {                
                options: {          
                    sassDir: 'app',
                    cssDir: 'build/css',
                    noLineComments : true,
                    environment: 'development'
                }
            }
        },

        copy: {
            json : {
                expand: true, 
                flatten: true,
                cwd: 'app', 
                src: [
                    '**.json',
                    '*/*.json',
                    '*/*/*.json',
                    '*/*/*/*.json'
                    ], 
                dest: 'build/api/', 
                filter: 'isFile'
            }
        },

        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        }

    });

    // PACKAGES
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');

    // RUN GRUNT 
    grunt.registerTask('default', ['concat', 'express:dev','react', 'uglify', 'watch', 'compass', 'copy:json']);

};