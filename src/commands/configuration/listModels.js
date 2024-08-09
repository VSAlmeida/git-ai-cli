const { logger, getConfig } = require('../../utils');

const { watsonxAI } = require('../../services');

const listModels = async () => {
  const config = getConfig('current');

  if (!config.current) {
    logger.error('You dont have any LLM Provider configured');
    logger.warning('Please run "git ai --config" to configure');

    return;
  }

  logger.spinner(`Fetching ${config.current} models...`);

  const llmConfig = config.options.find((opt) => opt.name === config.current);

  const llmProviders = {
    IBM: watsonxAI.getModels(llmConfig),
  };

  await llmProviders[config.current];
};

module.exports = listModels;
