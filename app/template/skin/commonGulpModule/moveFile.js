module.exports = function(gulp, plugin, projectConfig) {
    return function() {
        gulp.src(['./src/images/**'], { base: './src' })
            .pipe(gulp.dest(projectConfig.dest_doc));
        gulp.src(['./src/audio/**'], { base: './src' })
            .pipe(gulp.dest(projectConfig.dest_doc));
    };
};
