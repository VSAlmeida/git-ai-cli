const shell = require('shelljs');

const logger = require('./logger');

const runShellCommand = (command) => {
  logger.debug(`Executing the command "${command}"`);

  const result = shell.exec(command, { silent: true });

  if (result.code !== 0) {
    logger.error(`Error to execute the command "${command}" failed`);
    shell.exit(1);
  }

  logger.debug(`Command ${command} executed successfully`);

  return result.stdout;
};

module.exports = runShellCommand;
