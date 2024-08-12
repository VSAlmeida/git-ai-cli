const shell = require('shelljs');

const testingCommand = 'git-ai config --show-config';

describe(`The "${testingCommand}" command canary spec`, () => {
  it('shows the infrastructure works', () => {
    expect(true).toBe(true);
  });
});

describe(`The "${testingCommand}" command should`, () => {
  it('Prints an debug message whe the user provides the flah "--debug" or "-d"', () => {
    const options = ['--debug', '-d'];

    options.forEach((option) => {
      const result = shell.exec(`${testingCommand} ${option}`, {
        silent: true,
      });

      expect(result).toEqual(expect.stringContaining('[DEBUG]:'));
    });
  });

  it('Prints an error messsage when the user dont have any LLM Provider configured', () => {
    const result = shell.exec(testingCommand, { silent: true });

    expect(result).toEqual(
      expect.stringContaining('You dont have any LLM Provider configured')
    );
  });

  it('Prints a current LLM Provider configuration', () => {
    global.editLlmConfig('IBM Watsonx AI', {});

    const result = shell.exec(testingCommand, { silent: true });

    expect(result).toEqual(expect.stringContaining('IBM Watsonx AI'));
  });
});
