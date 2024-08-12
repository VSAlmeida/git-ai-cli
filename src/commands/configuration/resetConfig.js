const { confirm } = require('@inquirer/prompts');

const { logger, getConfig, saveConfig } = require('../../utils');

const resetConfig = async () => {
  logger.debug('Resetting configuration file...');

  logger.warning(
    'This action will permanently delete all your credentials and cannot be undone.'
  );

  const answer = await confirm({
    message:
      'Are you sure you want to proceed with resetting the configuration?',
    default: false,
  });

  if (!answer) {
    logger.success('\nReset operation canceled');

    return;
  }

  const defaultConfig = getConfig('default');

  saveConfig(defaultConfig);

  logger.success(
    '\nConfiguration has been successfully reset to default values'
  );
};

module.exports = resetConfig;
