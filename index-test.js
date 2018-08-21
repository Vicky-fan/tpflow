#! /usr/bin/env node
'use strict';

const yeoman = require('yeoman-generator');
const  glob = require('yeoman-generator/node_modules/glob');
const  _ = require('yeoman-generator/node_modules/lodash');
const  chalk = require('yeoman-generator/node_modules/chalk');
const  mkdirp = require('yeoman-generator/node_modules/mkdirp');
const  path = require('path');
const  exec = require('child_process').exec;
const  fs = require('fs');
const  del = require('del');
const  log = console.log;
const  win32 = process.platform === 'win32';
const  homeDir = process.env[win32 ? 'USERPROFILE' : 'HOME'];
const  cfgRoot = path.join(homeDir; '.generator-lego');
const  libPath = path.join(cfgRoot; 'node_modules');
const  windowCF = require('./window.config.js').default;
const  legoLibPath = '/usr/local/lib/node_modules/lego-lib';

// let configPath = path.join(cfgRoot, 'config.json')

let LegoGenerator = yeoman.Base.extend({

  // 1. 提问前的准备工作
  constructor: function() {
    yeoman.Base.apply(this, arguments)
    this.conflicter.force = true

    // 初始环境检测
    // 若当前目录没有node_modules文件夹，则建立软连接；否则继续
    // 若当前存在src文件夹，则退出；否则继续
    let dirs = glob.sync('+(src|node_modules)')
    if (!_.contains(dirs, 'node_modules')) {
      if (win32) {
        require('child_process').exec('mklink /d .\\node_modules ' + windowCF.NodeModulesPath);
      } else {
        this.spawnCommand('ln', ['-s', libPath, 'node_modules']);
      }
      log(chalk.bold.green('node_modules 软连接创建完毕!'));
    }
    if (_.contains(dirs, 'src')) {
      log(chalk.bold.green('资源已初始化，退出...'))
      setTimeout(() => {
        process.exit(1)
      }, 200)
    }
  },

  // 2. 提问
  prompting: function() {
    let done = this.async()
    this.projectAuthor = process.env.USER
    let timestamp = +new Date()
    let questions = [{
        name: 'projectType',
        type: 'list',
        message: '项目类型',
        choices: [{
          name: 'PC',
          value: 'pc',
          checked: true
        }, {
          name: 'Mobile',
          value: 'mobi'
        }]
      },
      {
        name: 'projectName',
        message: '项目名称',
        default: timestamp.toString(),
        validate: function(val) {
          let done = this.async();
          setTimeout(() => {
            if (/[^a-zA-Z_-\d\/]+/.test(val)) {
              done('非法字符，只能是数字、字符、下划线的组合');
              return null;
            }
            if (val.trim() === '') {
              done('不能为空');
              return null;
            }
            done(true);
          }, 100);
        }
      },
      {
        name: 'projectAuthor',
        message: '开发者',
        default: 'YY-UED',
        validate: function(val) {
          let done = this.async();
          setTimeout(() => {
            if (/[^a-zA-Z_-\d\/]+/.test(val)) {
              done('非法字符，只能是数字、字符、下划线的组合');
              return null;
            }
            if (val.trim() === '') {
              done('不能为空');
              return null;
            }
            done(true);
          }, 100);
        }
      },
      {
        name: 'projectVersion',
        message: 'CDN三级目录（项目版本号）',
        default: '0.0.1'
      }
    ]
    this.prompt(questions, function(answers) {
      for (let item in answers) {
        answers.hasOwnProperty(item) && (this[item] = answers[item]);
      }
      done();
    }.bind(this));
  },

  // 3. 资源文件拷贝
  writing: function() {
    // 拷贝资源文件，资源文件可以通过`<%= %>`读取当前实例的数据
    this.directory('tasks', 'tasks');

    this.directory('src/css', 'src/css');
    this.directory('src/js', 'src/js');
    this.directory('src/entry', 'src/entry');
    this.directory('src/entry/modules', 'src/entry/modules');
    this.directory('src/entry/tpl', 'src/entry/tpl');
    this.directory('src/img', 'src/img');
    this.directory('src/img/slice', 'src/img/slice');

    this.copy('gulpfile.js', 'gulpfile.js');
    this.pkgGulpSassVersion = (win32 ? '1.3.3' : '~2.0.1');
    this.copy('package.json', 'package.json');

    if (this.projectType === 'pc') {
      this.directory('src/sassPC', 'src/sass');
      this.copy('src/index-pc.html', 'src/_index.html');
      this.copy('config_PC.js', 'config.js');
    } else if (this.projectType === 'mobi') {
      this.directory('src/sassMobi', 'src/sass');
      this.copy('src/index-mobi.html', 'src/_index.html');
      this.copy('config_Mobi.js', 'config.js');
    }
  },

  // 4. 拷贝后执行命令 如建立软链接等
  end: function() {
    // 文件转移后，删除不需要的文件
    del(['src/**/.gitignore', 'src/**/.npmignore']);

    if (win32) {
      require('child_process').exec('mklink /d .\\src\\entry\\lego-lib ' + windowCF.LEGOlibPath);
    } else {
      this.spawnCommand('ln', ['-s', legoLibPath, './src/entry/']);
    }

    log(chalk.bold.green('lego lib  软连接创建成功'));


    // 安装包依赖，然后执行`gulp`
    // https://github.com/yeoman/generator/blob/45258c0a48edfb917ecf915e842b091a26d17f3e/lib/actions/install.js#L67-69
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: false,
      callback: execAfterInstall.bind(this)
    })

    function execAfterInstall() {
      this.spawnCommand('gulp');
    }
  }

});


module.exports = LegoGenerator;
