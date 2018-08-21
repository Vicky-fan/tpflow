module.exports = function (gulp, plugin, projectConfig) {
	return function () {
		setTimeout(function () {
			gulp.src(['./src/scripts/lib/vendor.bundle.js'])
				//.pipe(plugin.sourcemaps.init({loadMaps: true}))
				.pipe(plugin.uglify({
					compress: {
						drop_console: projectConfig.dropLog
					}
				}))
				.pipe(plugin.gulpRename(function (path) {
					path.basename = projectConfig.vendorTimeStamp + path.basename;
				}))
				//.pipe(plugin.sourcemaps.write('./'))
				.pipe(gulp.dest(projectConfig.dest_doc + 'scripts/lib'));
		}, 500);
	};
};
