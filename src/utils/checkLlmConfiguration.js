const shelljs = require('shelljs');

const logger = require('./logger');

const checkLlmConfiguration = (config, requiredFields) => {
  logger.debug(`Checking ${config.name} configuration...`);

  requiredFields.forEach((field) => {
    if (!config[field]) {
      logger.error(`You dont have ${config.name} ${field} configured`);
      logger.warning('Please run "git ai config" to configure');
      shelljs.exit(1);
    }
  });
};

module.exports = checkLlmConfiguration;
