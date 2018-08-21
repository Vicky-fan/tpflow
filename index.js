#! /usr/bin/env node
const program  = require('commander');
const inquirer = require('inquirer');
const chalk    = require('chalk');

(async () => {
  program
    .command('init')
    .description('init new project')
    .action(require('./app/workflow'));

  program.parse(process.argv);
})();
