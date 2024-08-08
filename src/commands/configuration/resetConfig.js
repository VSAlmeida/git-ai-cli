const { logger, getConfig, saveConfig } = require('../../utils');

const resetConfig = () => {
  logger.debug('Resetting configuration file...');

  const defaultConfig = getConfig('default');

  saveConfig(defaultConfig);

  logger.success('Configuration has been reset to default values');
};

module.exports = resetConfig;
