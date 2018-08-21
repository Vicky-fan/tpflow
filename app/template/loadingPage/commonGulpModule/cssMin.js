module.exports = function (gulp, plugin, projectConfig) {
	return function () {
		gulp.src('./src/styles/main.css')
			//.pipe(plugin.replaceString('url(\"../', 'url(\"' + projectConfig.staticSourceUrl))
			//.pipe(plugin.replaceString('url(../font', 'url(' + projectConfig.xlinkHref + 'font'))
			.pipe(plugin.minifyCss())
			.pipe(plugin.gulpRename(function (path) {
				path.basename = projectConfig.otherTimeStamp + path.basename;
			}))
			.pipe(gulp.dest(projectConfig.dest_doc + '/styles/'))
			.pipe(plugin.notify({message: 'Styles task complete'}));
	};
};
