const { logger, getConfig } = require('../../utils');

const showConfig = () => {
  const config = getConfig('current');

  if (!config.current) {
    logger.error('You dont have any LLM Provider configured');
    logger.warning('Please run "git ai --config" to configure');

    return;
  }

  const llmConfig = config.options.find((opt) => opt.name === config.current);

  logger.success('Your current configurations:');

  logger.info(JSON.stringify(llmConfig, null, 2));
};

module.exports = showConfig;
