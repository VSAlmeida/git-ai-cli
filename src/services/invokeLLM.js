const shelljs = require('shelljs');

const { watsonxAi } = require('../config');
const { logger } = require('../utils');

const invokeLLM = (changes) => {
  const spinner = logger.spinner('Generating commit message');

  return watsonxAi
    .invoke(
      `
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
Input:
${changes}
Output:
`
    )
    .then((commitMessage) => {
      spinner.succeed('Message generated successfully \n');

      return commitMessage;
    })
    .catch((err) => {
      spinner.fail('Error: Failed to generate commit message');

      logger.error(err);
      shelljs.exit(1);
    });
};

module.exports = invokeLLM;
