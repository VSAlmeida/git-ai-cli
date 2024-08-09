const shell = require('shelljs');

const testingCommand = 'git-ai config --list-models';

describe(`The "${testingCommand}" command canary spec`, () => {
  it('shows the infrastructure works', () => {
    expect(true).toBe(true);
  });
});

describe(`The "${testingCommand}" command should`, () => {
  describe('Prints an debug message whe', () => {
    it('The user provides the flah "--debug" or "-d"', () => {
      const options = ['--debug', '-d'];

      options.forEach((option) => {
        const result = shell.exec(`${testingCommand} ${option}`, {
          silent: true,
        });

        expect(result).toEqual(expect.stringContaining('[DEBUG]:'));
      });
    });
  });

  describe('Prints the available models whe', () => {
    it('The user select IBM Watsonx AI as LLM', () => {
      global.editLlmConfig('IBM Watsonx AI', {
        apiKey: process.env.WATSONX_API_KEY,
        projectId: process.env.WATSONX_PROJECT_ID,
      });

      const result = shell.exec(testingCommand, { silent: true });

      expect(result.stderr).toEqual(
        expect.stringContaining('Available models for Watsonx AI')
      );
    });
  });

  describe('Prints an error messsage when', () => {
    it('The user dont have any LLM Provider configured', () => {
      const result = shell.exec(testingCommand, { silent: true });

      expect(result.stderr).toEqual(
        expect.stringContaining('You dont have any LLM Provider configured')
      );
    });

    describe('The user select IBM Watsonx AI as LLM Provider but', () => {
      it('Dont have apiKey configured', () => {
        global.editLlmConfig('IBM Watsonx AI', {
          apiKey: '',
          projectId: '123',
        });

        const result = shell.exec(testingCommand, { silent: true });

        expect(result.stderr).toEqual(
          expect.stringContaining(
            'You dont have IBM Watsonx AI apiKey configured'
          )
        );
      });

      it('Dont have projectId configured', () => {
        global.editLlmConfig('IBM Watsonx AI', {
          apiKey: '123',
          projectId: '',
        });

        const result = shell.exec(testingCommand, { silent: true });

        expect(result.stderr).toEqual(
          expect.stringContaining(
            'You dont have IBM Watsonx AI projectId configured'
          )
        );
      });
    });
  });
});
