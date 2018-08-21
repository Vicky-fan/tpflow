var path = require('path');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = function(gulp, plugin, projectConfig) {
  return function() {
    var rpath = './src/scss/';
    var srcArray = [];

    for (var i = 0; i < projectConfig.sassArray.length; i++) {
      srcArray.push(rpath + projectConfig.sassArray[i] + '.scss');
    }
    return gulp.src(srcArray)
      .pipe(plugin.sass())
      .on('error', function(error) {
        console.log(error.toString());
        this.emit('end');
      })
      .pipe(plugin.autoprefixer({
        browsers: projectConfig.browsers
      }))
      .pipe(gulp.dest('./src/styles'))
      .pipe(plugin.notify({
        message: 'sass task complete'
      }))
      .pipe(reload({
        stream: true
      }));
  };
};
