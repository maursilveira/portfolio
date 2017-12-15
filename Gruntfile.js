module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
              src: [
                  'js/modules/*.js', // All JS in the libs folder
                  'js/main.js'  // This specific file
              ],
              dest: 'js/build/app.js',
          }
        },

        uglify: {
          build: {
              src: 'js/build/app.js',
              dest: 'js/min/app.min.js'
          }
        },
      sass: {
          dist: {
              options: {
                  style: 'compressed',
                  sourcemap: 'none',
                  debugInfo : true,
                  noCache: true
              },
              files : {
                'css/main.css' : 'scss/main.scss'
              }
          }
      },
      postcss: { // Begin Post CSS Plugin
        options: {
          map: false,
          processors: [
        require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ]},
        dist: {
          src: 'css/main.css'
        }
      },
      watch: {
          scripts: {
              files: ['js/*.js'],
              tasks: ['concat', 'uglify'],
              options: {
                  spawn: false,
              }
          },
          sass: {
            files: ['scss/*.scss'],
            tasks: ['sass','postcss'],
            options: {
                spawn: false,
            }
        }
      }
      });

    //Plug-in used
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //When called, perform
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);

};
