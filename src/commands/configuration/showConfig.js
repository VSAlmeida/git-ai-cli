const { logger, getConfig } = require('../../utils');

const showConfig = () => {
  const config = getConfig('current');

  logger.success('Your current configurations:');

  logger.info(JSON.stringify(config, null, 2));
};

module.exports = showConfig;
