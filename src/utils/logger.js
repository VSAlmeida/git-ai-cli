const { program } = require('commander');
const chalk = require('chalk');
const ora = require('ora');

// eslint-disable-next-line
const log = console.log;

const spinner = (msg) => {
  return ora({
    text: chalk.whiteBright(msg),
    color: 'white',
    spinner: 'dots',
  }).start();
};

const info = (msg) => {
  log(chalk.whiteBright(msg));
};

const success = (msg) => {
  log(chalk.green(msg));
};

const warning = (msg) => {
  log(chalk.yellow(msg));
};

const error = (msg) => {
  log(chalk.red(msg));
};

const debug = (msg) => {
  const option = program.opts();

  if (!option.debug) {
    return;
  }

  log(chalk.blue(msg));
};

module.exports = { info, success, warning, error, debug, spinner };
