var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var notify = require('gulp-notify');
var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
function NamedModulesPlugin(options) {
  this.options = options || {};
}
module.exports = NamedModulesPlugin;
NamedModulesPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compilation", function(compilation) {
    compilation.plugin("before-module-ids", function(modules) {
      modules.forEach(function(module) {
        if (module.id === null && module.libIdent) {
          module.id = module.libIdent({
            context: this.options.context || compiler.options.context
          });
        }
      }, this);
    }.bind(this));
  }.bind(this));
};
var webpackConfig = {
  watch: false,
  entry: {
    main: './src/scripts/main.js'
  },
  output: {
    path: path.join(__dirname, "js"),
    filename: "./scripts/[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.js']
  },
  //plugins: [
  //	new CommonsChunkPlugin({
  //		name: "vendor",
  //		filename: "./scripts/[name].bundle.js",
  //		// (Give the chunk a different name)
  //		minChunks: Infinity
  //		// (with more entries, this ensures that no other module
  //		//  goes into the vendor chunk)
  //		//chunks: ["skin", "cell", "detail"],
  //	})
  //],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
    //'redux-router': 'reduxReactRouter'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  },

  devtool: "#source-map"
};

module.exports = function(gulp, plugin, projectConfig) {
  return function() {
    console.log(projectConfig, 2);
    webpackConfig.watch = typeof projectConfig.webpack.watch == 'boolean' ? projectConfig.webpack.watch : false;
    //webpackConfig.externals = projectConfig.webpack.externals;
    return gulp.src('./src/scripts/')
      .pipe(gulpWebpack(webpackConfig, webpack))
      .pipe(gulp.dest("./src"))
    //.pipe(plugin.notify({message: 'webpack task complete'}));
  };
};


