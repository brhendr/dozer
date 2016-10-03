module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/blockGame.js',
        dest: 'build/script.min.js'
      }
    },
    less: {
      development: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          compress: true,
          paths: ["less/"],
        },
        files: {
          // compilation.css  :  source.less
          "build/style.min.css": "less/style.less"
        }
      },
    },
    watch:{
      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
      less:{
        files: ['less/*.less'],
        tasks: ['less']
      }
    },
    json: {
    main: {
        options: {
            namespace: 'levelObj',
            includePath: false
            // processName: function(filename) {
            //     return filename.toLowerCase();
            // }
        },
        src: ['levels/*.json'],
        dest: 'build/json.js'
    }
}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-json');
  // Default task(s).
  grunt.registerTask('default', ['uglify','less','json','watch']);

};
