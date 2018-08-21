'use strict';

const chalk = require('chalk');
const prompt = require('inquirer').prompt;
const tpflowProject = require('./tpflow-project.js');
// const exec = require('child_process').exec;


module.exports = async function() {
  const types = Object.keys(tpflowProject.getDefalutProjectType());
  types.forEach((item, index) => {
    switch (item) {
      case 'Skin':
        {
          types[index] = {
            name: `${chalk.bold(item)}${chalk.whiteBright('- 皮肤推送 模板')}`,
            value: item
          };
          break;
        }
      case 'LoadingPage':
        {
          types[index] = {
            name: `${chalk.bold(item)}${chalk.whiteBright('- 落地页 模板')}`,
            value: item
          };
          break;
        }
      case 'Activity':
        {
          types[index] = {
            name: `${chalk.bold(item)}${chalk.whiteBright('- 活动 模板')}`,
            value: item,
          };
          break;
        }
    }
  });

  let questions = [{
      type: 'input',
      name: 'name',
      message: '项目名称',
      default: '',
      validate(input) {
        const done = this.async();

        !input ? done('项目名称不能为空') : done(null, true);
      },
    },
    {
      type: 'list',
      name: 'type',
      message: '项目类型',
      choices: types,
      default: 0,
    },
    {
      type: 'input',
      name: 'packageName',
      message: '包名(运营提供)',
      default: 'keyboard_theme_golden_rose',
    },
    {
      type: 'input',
      name: 'version',
      message: '版本号',
      default: '0.0.1',
    },
    {
      type: 'input',
      name: 'description',
      message: '项目描述',
      default: '',
    },
    {
      type: 'input',
      name: 'author',
      message: '开发者',
      default: 'GB CLOUD',
    }
  ];

  const {
    name,
    packageName,
    type,
    version,
    description,
    author
  } = await prompt(questions);

  const isESNext = true;

  const options = {
    path: process.cwd(),
    name,
    packageName,
    type,
    version,
    isESNext,
    description,
    from: 'cli',
    author
  }

  const result = await tpflowProject.new(options);


  if (typeof result !== 'string') {
    console.log(chalk.green.bold(`✔ 创建成功`));
  } else {
    console.log(chalk.red.bold(`!! [ERROR] ${result}`));
  }
}
