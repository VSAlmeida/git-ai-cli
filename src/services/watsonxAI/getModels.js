const axios = require('axios');
const shelljs = require('shelljs');

const { logger, checkLlmConfiguration } = require('../../utils');

const getToken = require('./getToken');

const listModels = async (config) => {
  checkLlmConfiguration(config, ['apiKey', 'projectId']);

  const token = await getToken(config);

  logger.debug('Fetching Watonx AI models...');

  await axios.default
    .get(
      `${config.baseURL}/ml/v1/foundation_model_specs?version=${config.apiVersion}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      logger.debug('Watsonx AI models fetched successfully');

      logger.success('Available models for Watsonx AI: \n');

      res.data.resources.forEach((model) => {
        logger.success(`${model.provider} - ${model.model_id}`);
      });
    })
    .catch((err) => {
      logger.error('Failed to fetch Watonx AI models');
      logger.error(err?.response?.data?.errors[0]?.message || err.toString());

      shelljs.exit(1);
    });
};

module.exports = listModels;
