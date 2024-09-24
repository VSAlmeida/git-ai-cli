<p align="center">
  <h3 align="center">Git AI CLI</h3>

  <p align="center">
    Automate commit message generation <br />
    with AI-driven suggestions
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="/../../issues">Report Bug</a>
    ·
    <a href="/../../issues">Request Feature</a>
  </p>
</p>

## Table of contents

1. [About The Project](#about-the-project)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Configuring](#configuring)
5. [Debugging](#debugging)
6. [Contributing](#contributing)
7. [Code of Conduct](#code-of-conduct)
8. [License](#license)

## About The Project

Git AI CLI automates the generation of commit messages using AI, based on your staged changes.

- **AI-Powered Commit Messages:** Automatically generate meaningful commit messages based on the changes you've staged, reducing the time spent writing commits manually.
- **Customizable Inputs:** Guide the AI by providing your own messages, allowing for more precise and contextually relevant commit messages.
- **Edit Before Commit:** Review and edit the generated commit message before finalizing the commit, giving you full control over the final output.
- **Model Configuration:** Easily configure and override the AI model used for generating commit messages, adapting to your specific needs.
- **Debug Mode:** Enable detailed logging with the --debug flag to gain insights into the commit generation process, helpful for troubleshooting and understanding the AI's behavior.

## Installation

First, download and install [Nodejs](https://nodejs.org/en) and [Git](https://git-scm.com/).

```bash
npm install -g git-ai-cli
```

That's all you need to start! 🎉

## Basic Usage

Generate a commit message based on the staged changes.

```bash
git ai [OPTION]
```

| Option          | Description                                                             | Type     | Default | Required? |
| --------------- | ----------------------------------------------------------------------- | -------- | ------- | --------- |
| `-m, --message` | Provide a message to assist the model in generating the commit message. | `string` | `empty` | No        |
| `--model-id`    | Override the selected Model Id for this commit generation.              | `bool`   | `false` | No        |
| `--dry-run`     | Show the generated commit message without committing.                   | `bool`   | `false` | No        |
| `-d, --debug`   | Enable debug mode to log detailed information during execution.         | `bool`   | `false` | No        |

![GIT AI Demo](assets/demo.gif)

For more detailed examples of how to use other commands, check out the [Advanced Usage Guide](docs/USAGE_GUIDE.MD).

## Configuring

Configures the LLM model and sets up necessary credentials.

```bash
git ai config [OPTION]
```

| Option          | Description                                                     | Type   | Default | Required? |
| --------------- | --------------------------------------------------------------- | ------ | ------- | --------- |
| `--list-models` | List available Models.                                          | `bool` | `false` | No        |
| `--show-config` | Show the current configuration.                                 | `bool` | `false` | No        |
| `--reset`       | Reset configuration to default values.                          | `bool` | `false` | No        |
| `-d, --debug`   | Enable debug mode to log detailed information during execution. | `bool` | `false` | No        |

![GIT AI Config](assets/config.gif)

For more detailed examples of how to use other commands, check out the [Advanced Usage Guide](docs/USAGE_GUIDE.MD).

## Debugging

To activate debugging mode and see detailed output during command execution, pass the `--debug` flag to your command. This mode is useful for troubleshooting and understanding how the commit message was generated.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Code of Conduct

Git AI CLI has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## License

This project is licensed under the Apache 2.0 License. See [LICENSE](/LICENSE) for more information.
