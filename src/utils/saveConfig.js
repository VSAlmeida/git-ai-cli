const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');

const logger = require('./logger');

const saveConfig = (config) => {
  logger.debug('Saving configuration file...');

  try {
    fs.writeFileSync(
      path.resolve(__dirname, '../config.json'),
      JSON.stringify(config, null, 2)
    );

    logger.debug('Configuration file saved successfully');
  } catch (err) {
    logger.error('Failed to save configuration file');
    logger.error(err);
    shelljs.exit(1);
  }
};

module.exports = saveConfig;
