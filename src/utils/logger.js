const ora = require('ora');
const chalk = require('chalk');
const { program } = require('commander');

// eslint-disable-next-line
const log = console.log;

let currentSpinner = null;

const spinner = (msg) => {
  currentSpinner = ora({
    text: chalk.whiteBright(msg),
    color: 'white',
    spinner: 'dots',
  }).start();
};

const clearAndRenderSpinner = (msg) => {
  currentSpinner.clear();

  log(msg);

  currentSpinner.render();
};

const success = (msg) => {
  const successTemplate = chalk.green(msg);

  if (currentSpinner) {
    currentSpinner.succeed(successTemplate);
    currentSpinner = null;

    return;
  }

  log(successTemplate);
};

const error = (msg) => {
  const errorTemplate = chalk.red(msg);

  if (currentSpinner) {
    currentSpinner.fail(errorTemplate);
    currentSpinner = null;

    return;
  }

  log(errorTemplate);
};

const info = (msg) => {
  const infoTemplate = chalk.whiteBright(msg);

  if (currentSpinner) {
    clearAndRenderSpinner(infoTemplate);

    return;
  }

  log(infoTemplate);
};

const warning = (msg) => {
  const warningTemplate = chalk.yellow(msg);

  if (currentSpinner) {
    clearAndRenderSpinner(warningTemplate);

    return;
  }

  log(warningTemplate);
};

const debug = (msg) => {
  const option = program.opts();

  if (!option.debug) {
    return;
  }

  const debugTemplate = chalk.blue(`[DEBUG]: ${msg}`);

  if (currentSpinner) {
    clearAndRenderSpinner(debugTemplate);

    return;
  }

  log(debugTemplate);
};

module.exports = { info, success, warning, error, debug, spinner };
