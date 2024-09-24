/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const shelljs = require('shelljs');

const { logger, checkLlmConfiguration } = require('../../utils');

const getToken = require('./getToken');

const generateText = async (config, changes, modelId, message = '') => {
  checkLlmConfiguration(config, ['apiKey', 'modelId', 'projectId']);

  const token = await getToken(config);

  const stream = await axios.default
    .post(
      `${config.baseURL}/ml/v1/text/generation_stream?version=${config.apiVersion}`,
      {
        input: `
You are a software developer and need to generate commit messages for a git repository.
Messages must be generated based on changes provided by the 'git diff' command.
Commit messages must follow the Conventional Commits pattern.
This pattern uses specific prefixes to categorize the type of change made, followed by a brief description.
The most common Conventional Commits pattern prefixes are:
  - feat: A new feature
  - fix: A bug fix
  - docs: Documentation only changes
  - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  - refactor: A code change that neither fixes a bug nor adds a feature
  - perf: A code change that improves performance
  - test: Adding missing or correcting existing tests
  - chore: Changes to the build process or auxiliary tools and libraries such as documentation generatio
Start the commit message with one of the prefixes, and then add a short, concise and clean description.
After the first line, always add an objective explanation of the changes made, the reason for the change and, if applicable, the impact of the change.
${message}
Input:
${changes}
Output:
`,
        model_id: modelId || config.modelId,
        project_id: config.projectId,
        parameters: config.modelParameters,
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        responseType: 'stream',
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      logger.error('Failed to generate commit message');
      logger.error(err.toString());

      shelljs.exit(1);
    });

  let text = '';

  for await (const chunk of stream) {
    const lines = chunk.toString().split('\n');

    lines.forEach((line) => {
      if (line.startsWith('data: ')) {
        const jsonString = line.replace('data: ', '');

        try {
          const data = JSON.parse(jsonString);

          text += data.results[0].generated_text;

          logger.updateSpinner(`Generating commit message... \n\n${text}`);
        } catch (err) {
          logger.debug(`Failed to parse chuck: ${err}`);
        }
      }
    });
  }

  logger.success('Commit message generated successfully!');

  return text;
};

module.exports = generateText;
