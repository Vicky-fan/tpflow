'use strict';

const gulp          = require('gulp');
const loadTask      = require('./commonGulpModule/loadCommonTask');
const plugins       = require('./commonGulpModule/gulpPlugins');
const webp          = require('gulp-webp');
const rename        = require('gulp-rename');
const pkg           = require('./package.json');
const browserSync   = require('browser-sync');
const replaceString = require('gulp-replace');
const reload        = browserSync.reload;

let browserOpen = () => {
  browserSync({
    server: './src/',
    notify: false,
    open: 'external',
  }, (err, arg) => {
    if (!err) {
      console.log('---------现在可以开始Coding--------- ');
    }
  })
};


//启动server
gulp.task('dev_server', ['sass'], () => {
  browserOpen();
  gulp.watch('src/scss/**/**', ['sass']);
  gulp.watch('src/images/**', reload);
  gulp.watch('src/*.html', reload);
  gulp.watch('src/scripts/**.js', reload);
})

// 补零
let zeroPrefix = (num) => {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}
let d      = new Date();
let year   = d.getFullYear().toString();
let month  = zeroPrefix(d.getMonth() + 1);
let day    = zeroPrefix(d.getDate());
let hour   = zeroPrefix(d.getHours());
let minute = zeroPrefix(d.getMinutes());
let stamp  = `tpime_v${year}${month}${day}${hour}${minute}_`;

let sassArray = [
  'main'
];

let projectConfig_usa = {
  rootPath: '',
  jsSuffix: '.js',
  //需要编译到styles目录下的sass文件
  styleDir: './styles/',
  sassArray: sassArray,
  //css兼容版本
  vendorTimeStamp: 'tpime_v201512251254_',
  otherTimeStamp: stamp,
  dropLog: true,
  browsers: ['Android >= 4.0', 'last 3 versions', 'iOS > 7'],
  webpack: {
    watch: false
  },
  domain: '',
  dest_doc: './build/',
  name: pkg.name
};

// 替换项目文件中的文件名和包名
gulp.task('replaceFileKey', () => {
  gulp.src(['./src/scripts/main.js'])
    .pipe(replaceString('test-stepTracker', `test-${pkg.name}`))
    .pipe(gulp.dest((data) => data.base));
})


loadTask.makeTaskFromArray(
  [
    'webpack',
    'sass',
    'cssMin',
    'jshint',
    'compressJs',
    'moveFile',
    'compressVendor'
  ], projectConfig_usa
);
//devTask
gulp.task('scssWatch', ['sass'], function() {
  gulp.watch('./src/scss/**/**', ['sass']);
});

loadTask.makeTask('webpack', {
  webpack: {
    watch: true
  }
}, 'webpackWatch');

gulp.task('default', ['replaceFileKey', 'dev_server', 'sass', 'webpackWatch']);

loadTask.makeTask('webpack', projectConfig_usa, 'webpackWithMoveJs');
loadTask.makeTaskWithDependency('compressJs', ['webpackWithMoveJs'], projectConfig_usa, 'compressJsWithWebpack');
loadTask.makeTaskWithDependency('cssMin', ['sass'], projectConfig_usa, 'cssMinWithSass');
loadTask.makeTask('sass', projectConfig_usa, 'sass');
loadTask.makeTask('jshint', projectConfig_usa, 'jshint');
loadTask.makeTask('moveShopHtml', projectConfig_usa, 'moveShopHtml');
loadTask.makeTask('moveFile', projectConfig_usa, 'moveFile');
gulp.task('common', ['moveShopHtml', 'webpackWithMoveJs', 'compressJsWithWebpack', 'cssMinWithSass', 'moveFile']);
gulp.task('webp', () =>
  gulp.src('./src/raw/**')
  .pipe(gulp.dest('./src/images/'))
  .pipe(webp({
    quality: 100
  }))
  .pipe(gulp.dest('./src/images/'))
);
/* 生成多个语言版本的html，主要是替换head中的title与description */
var shareConfig = require('./src/share_config');
gulp.task('multiLanguage', ['common'], () => {
  shareConfig.supportLanguages.forEach(lang => {
    gulp.src('./build/index.html')
      .pipe(replaceString('@og:title', shareConfig.translateMap.title[lang]))
      .pipe(replaceString('@og:description', shareConfig.translateMap.subtitle[lang]))
      .pipe(replaceString('@og:image', 'http://ime.cdn.cootekservice.com/default/webpage/' + projectConfig_usa.name + '/images/share.png'))
      .pipe(rename('index_' + lang + '.html'))
      .pipe(gulp.dest('./build/'));
  });
});
gulp.task('template', ['common'], () => {
  gulp.src('./build/index.html')
    .pipe(replaceString('@og:title', '{{ preview_title }}'))
    .pipe(replaceString('@og:description', '{{ preview_desc }}'))
    .pipe(replaceString('@og:image', '{{ preview_image }}'))
    .pipe(replaceString(/\.\//g, 'http://ime.cdn.cootekservice.com/default/webpage/' + projectConfig_usa.name + '/'))
    .pipe(rename('index.html.tmpl'))
    .pipe(gulp.dest('./build/'));
});
gulp.task('build', ['template']);
