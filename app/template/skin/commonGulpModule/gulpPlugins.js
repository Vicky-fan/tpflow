var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
  rename: {
    'gulp-html-replace': 'htmlReplace',
    'gulp-minify-css': 'minifyCss',
    'gulp-replace': 'replaceString',
    'gulp-angular-templatecache': 'templateCache',
    'gulp-rename': 'gulpRename'
  }
});
module.exports = plugins;