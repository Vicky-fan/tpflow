var gulp = require('gulp');
var plugins = require('./gulpPlugins');
module.exports = {
  getTask: function(task, projectConfig) {
    return require('../commonGulpModule/' + task)(gulp, plugins, projectConfig);
  },
  makeTaskWithDependency: function(task, dependencyArray, projectConfig, rename) {
    var taskName = rename ? rename : task;
    gulp.task(taskName, dependencyArray, this.getTask(task, projectConfig))
  },
  makeTask: function(task, projectConfig, rename) {
    var taskName = rename ? rename : task;
    gulp.task(taskName, this.getTask(task, projectConfig))
  },
  makeTaskFromArray: function(taskArray, projectConfig) {
    if (taskArray instanceof Array && taskArray.length != 0) {
      taskArray.forEach(function(task) {
        gulp.task(task, this.getTask(task, projectConfig));
      }.bind(this));
    }
  }
};