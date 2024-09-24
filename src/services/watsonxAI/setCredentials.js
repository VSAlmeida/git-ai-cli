const shell = require('shelljs');
const { input, select } = require('@inquirer/prompts');

const { saveConfig, logger } = require('../../utils');

const setCredentials = async (config) => {
  let modelId = await select({
    message: 'Select the model id you want to use:',
    choices: [
      {
        name: 'Llama 3.1 405B Instruct',
        value: 'meta-llama/llama-3-405b-instruct',
      },
      {
        name: 'Llama 3 70B Instruct',
        value: 'meta-llama/llama-3-70b-instruct',
      },
      {
        name: 'Mixtral 8x7B Instruct',
        value: 'mistralai/mixtral-8x7b-instruct-v01',
      },
      {
        name: 'Granite 34B Instruct',
        value: 'ibm/granite-34b-code-instruct',
      },
      {
        name: 'Other',
        value: 'other',
        description: 'You will need to provide the model id manually',
      },
    ],
  }).catch(() => {
    shell.exit(1);
  });

  if (modelId === 'other') {
    modelId = await input({
      message: 'Enter the Model ID:',
      required: true,
    }).catch(() => {
      shell.exit(1);
    });
  }

  const projectId = await input({
    message: 'Enter your ML Project id:',
    required: true,
  }).catch(() => {
    shell.exit(1);
  });

  const apiKey = await input({
    message: 'Enter your IBM Cloud API Key:',
    required: true,
  }).catch(() => {
    shell.exit(1);
  });

  saveConfig({
    current: 'IBM Watsonx AI',
    options: config.options.map((opt) => {
      if (opt.name === 'IBM Watsonx AI') {
        return { ...opt, apiKey, modelId, projectId };
      }

      return opt;
    }),
  });

  logger.success('Your configuration has been saved successfully');
};

module.exports = setCredentials;
