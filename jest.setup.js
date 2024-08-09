require('dotenv').config();

const fs = require('fs');
const path = require('path');

const configPath = {
  default: path.resolve(__dirname, './src/default.json'),
  current: path.resolve(__dirname, './src/config.json'),
};

const defaultConfig = JSON.parse(fs.readFileSync(configPath.default, 'utf8'));

const currentConfig = JSON.parse(fs.readFileSync(configPath.current, 'utf8'));

const editLlmConfig = (llm, config) => {
  const configEditted = {
    current: llm,
    options: defaultConfig.options.map((conf) => {
      if (conf.name !== llm) {
        return conf;
      }

      return { ...conf, ...config };
    }),
  };

  fs.writeFileSync(configPath.current, JSON.stringify(configEditted));
};

const resetConfigFile = () => {
  fs.writeFileSync(configPath.current, JSON.stringify(defaultConfig));
};

beforeEach(() => {
  resetConfigFile();
});

afterAll(() => {
  fs.writeFileSync(configPath.current, JSON.stringify(currentConfig, null, 2));
});

global.editLlmConfig = editLlmConfig;
