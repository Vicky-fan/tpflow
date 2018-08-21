module.exports = function (gulp, plugin, projectConfig) {
	return function () {
		gulp.src(['./src/index.html'],{ base: './src' })
			.pipe(plugin.replaceString('common.bundle.js', projectConfig.otherTimeStamp + 'common.bundle.js'))
			.pipe(gulp.dest(projectConfig.dest_doc));
	};
};
