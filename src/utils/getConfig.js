const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');

const logger = require('./logger');

const configPath = {
  default: path.resolve(__dirname, '../default.json'),
  current: path.resolve(__dirname, '../config.json'),
};

// eslint-disable-next-line consistent-return
const getConfig = (configType) => {
  logger.debug('Fetching configuration file...');

  if (configType === 'current' && !fs.existsSync(configPath.current)) {
    logger.debug('Configuration file not found, creating a new one...');

    try {
      fs.copyFileSync(configPath.default, configPath.current);

      logger.debug('Configuration file created successfully');
    } catch (err) {
      logger.error('Failed to copy default configuration file');
      logger.error(err);
      shelljs.exit(1);
    }
  }

  try {
    return JSON.parse(fs.readFileSync(configPath[configType], 'utf-8'));
  } catch (err) {
    logger.error('Failed to read configuration file');
    logger.error(err);
    shelljs.exit(1);
  }
};

module.exports = getConfig;
