const shell = require('shelljs');
const { select } = require('@inquirer/prompts');

const { watsonxAI } = require('../../services');
const { logger, getConfig } = require('../../utils');

const editConfig = async () => {
  logger.debug('Editing configuration...');

  const defaultConfig = getConfig('default');

  const llmProvider = await select({
    message: 'Select the LLM Provider you want to use:',
    choices: defaultConfig.options.map((opt) => ({
      name: opt.name,
      value: opt.name,
    })),
  }).catch(() => {
    shell.exit(1);
  });

  const llmProviders = {
    'IBM Watsonx AI': watsonxAI,
  };

  await llmProviders[llmProvider].setCredentials(defaultConfig);

  logger.debug(`${llmProvider} configured successfully`);
};

module.exports = editConfig;
