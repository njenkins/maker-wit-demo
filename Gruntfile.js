module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs");

    grunt.initConfig({
        jshint: {
            all: ['*.js']
        },
        jscs: {
          src: "*.js",
          options: {
              config: true,
              fix: true
          }
      }
    });
    grunt.registerTask('test', ['jshint', 'jscs']);

};
