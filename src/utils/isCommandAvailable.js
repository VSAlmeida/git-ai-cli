const shelljs = require('shelljs');
const logger = require('./logger');

const isCommandAvailable = (command) => {
  logger.debug(`Checking the command "${command}" is available`);

  const cmd = shelljs.which(command);

  if (!cmd) {
    logger.error(`Error: The command "${command}" is not available`);
    logger.warning('Please install it before use git-ai-cli');
    shelljs.exit(1);
  }

  logger.debug(`The command "${command}" is available`);
};

module.exports = isCommandAvailable;
