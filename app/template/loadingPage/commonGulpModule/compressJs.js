module.exports = function (gulp, plugin, projectConfig) {
	return function () {
		setTimeout(function () {
			gulp.src(['./src/scripts/main.bundle.js'])
				.pipe(plugin.replaceString(`test-${projectConfig.name}`, `OPS-${projectConfig.name}`))
				.pipe(plugin.uglify({
					compress: {
						drop_console: projectConfig.dropLog
					}
				}))
				.pipe(plugin.gulpRename(function (path) {
					path.basename = projectConfig.otherTimeStamp + path.basename;
				}))
				.pipe(gulp.dest(projectConfig.dest_doc + 'scripts/'));
		}, 1000);
	};
};
