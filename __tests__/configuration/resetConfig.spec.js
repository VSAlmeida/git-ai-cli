const shell = require('shelljs');

const testingCommand = 'git-ai config --reset';

describe(`The "${testingCommand}" command canary spec`, () => {
  it('shows the infrastructure works', () => {
    expect(true).toBe(true);
  });
});

describe(`The "${testingCommand}" command should`, () => {
  it('Prints an debug message whe the user provides the flah "--debug" or "-d"', () => {
    const options = ['--debug', '-d'];

    options.forEach((option) => {
      const result = shell.exec(`echo "n" | ${testingCommand} ${option}`, {
        silent: true,
      });

      expect(result).toEqual(expect.stringContaining('[DEBUG]:'));
    });
  });

  it('Prints an confirmation prompt to reset of the configuration', () => {
    const result = shell.exec(`echo "n" | ${testingCommand}`, { silent: true });

    expect(result).toEqual(
      expect.stringContaining(
        'Are you sure you want to proceed with resetting the configuration'
      )
    );
  });

  it('Not make any changes to the configuration file when the user cancels the reset', () => {
    const newConfig = global.editLlmConfig('IBM Watsonx AI', {
      apiKey: '123',
      projectId: '123',
    });

    shell.exec(`echo "n" | ${testingCommand}`, { silent: true });

    expect(global.getCurrentConfig()).toEqual(newConfig);
  });

  it('Reset the configuration file to default values when the user confirms the reset.', () => {
    shell.exec(`echo "y" | ${testingCommand}`, { silent: true });

    expect(global.getCurrentConfig()).toEqual(global.defaultConfig);
  });
});
