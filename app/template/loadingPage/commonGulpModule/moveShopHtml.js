var name;
module.exports = function (gulp, plugin, projectConfig) {
	return function () {
		gulp.src(['./src/*.html'], {base: './src'})
			.pipe(plugin.gulpRename(function (path) {
				name = path.basename;
				console.log(name);
			}))
			.pipe(plugin.replaceString('main.css', projectConfig.otherTimeStamp + 'main.css'))
			.pipe(plugin.replaceString('main.bundle.js', projectConfig.otherTimeStamp + 'main.bundle.js'))
			.pipe(plugin.replaceString('./scripts/template.js', '../../common/vendor/template.js'))
			.pipe(gulp.dest(projectConfig.dest_doc));
	};
};
