#!/usr/bin/env node
const { program } = require('commander');

const { configuration, generateCommit } = require('./commands');

const { version } = require('../package.json');

program
  .description('Automate commit message generation with AI-driven suggestions.')
  .version(`v${version}`, '-v, --version', 'Output the current version')
  .helpOption('-h, --help', 'Display help for command')
  .option(
    '-d, --debug',
    'Enable debug mode to log detailed information during execution'
  );

program
  .command('gen', { isDefault: true })
  .description('Generate a commit message based on the staged changes.')
  .option(
    '-m, --message <msg>',
    'Provide a message to assist the model in generating the commit message.'
  )
  .option(
    '--model-id <modelId>',
    'Override the selected Model Id for this commit generation'
  )
  .option('--dry-run', 'Show the generated commit message without committing')
  .option(
    '-d, --debug',
    'Enable debug mode to log detailed information during execution'
  )
  .action((options) => {
    const { dryRun, modelId, message } = options;

    generateCommit(dryRun, modelId, message);
  });

program
  .command('config')
  .description('Configures the LLM model and sets up necessary credentials.')
  .option('--list-models', 'List available Model IDs')
  .option('--show-config', 'Show the current configuration')
  .option('--reset', 'Reset configuration to default values')
  .option(
    '-d, --debug',
    'Enable debug mode to log detailed information during execution'
  )
  .action((options) => {
    const { showConfig, reset, listModels } = options;

    if (showConfig) {
      configuration.showConfig();
      return;
    }

    if (reset) {
      configuration.resetConfig();
      return;
    }

    if (listModels) {
      configuration.listModels();
      return;
    }

    configuration.editConfig();
  });

program.parse(process.argv);
