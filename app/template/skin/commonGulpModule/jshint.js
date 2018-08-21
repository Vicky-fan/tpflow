module.exports = function(gulp, plugin, projectConfig) {
  return function() {
    gulp.src(['./src/scripts/**/*.js'])
      .pipe(plugin.jshint())
      .pipe(plugin.jshint.reporter('default'))
  };
};