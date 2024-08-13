const shell = require('shelljs');
const { select, editor } = require('@inquirer/prompts');

const { watsonxAI } = require('../services');
const {
  logger,
  getConfig,
  runShellCommand,
  isCommandAvailable,
} = require('../utils');

const llmProviders = {
  'IBM Watsonx AI': watsonxAI,
};

const generateCommit = async (dryRun, modelId, message) => {
  const config = getConfig('current');

  if (!config.current) {
    logger.error('You dont have any LLM Provider configured');
    logger.warning('Please run "git ai config" to configure');

    return;
  }

  const llmConfig = config.options.find((opt) => opt.name === config.current);

  isCommandAvailable('git');

  const changes = runShellCommand('git diff --staged');

  logger.debug(`Current git changes: \n${changes}}`);

  if (changes.length === 0) {
    logger.error('No staged changes found');
    logger.warning('Please run "git add" to stage files before committing');

    shell.exit(1);
  }

  logger.spinner('Generating commit message...');

  let commitMessage = await llmProviders[config.current].generateText(
    llmConfig,
    changes,
    modelId,
    message
  );

  logger.info(`\n${commitMessage}`);

  if (dryRun) {
    return;
  }

  const answer = await select({
    message: 'What do you want to do with the commit message?',
    choices: [
      { name: 'Accept and commit', value: 'use' },
      { name: 'Edit and commit', value: 'edit' },
      { name: 'Cancel and discard', value: 'cancel' },
    ],
  }).catch(() => {
    shell.exit(1);
  });

  if (answer === 'cancel') {
    return;
  }

  if (answer === 'edit') {
    commitMessage = await editor({
      message: 'Commit message edited',
      default: commitMessage,
      waitForUseInput: false,
    });
  }

  runShellCommand(`git commit -m "${commitMessage}"`);
};

module.exports = generateCommit;
