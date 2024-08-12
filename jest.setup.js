require('dotenv').config();

const fs = require('fs');
const path = require('path');

const configPath = {
  default: path.resolve(__dirname, './src/default.json'),
  current: path.resolve(__dirname, './src/config.json'),
};

const defaultConfig = JSON.parse(fs.readFileSync(configPath.default, 'utf8'));

const originalConfig = JSON.parse(fs.readFileSync(configPath.current, 'utf8'));

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

  return configEditted;
};

const resetConfigFile = () => {
  fs.writeFileSync(configPath.current, JSON.stringify(defaultConfig));
};

const getCurrentConfig = () => {
  return JSON.parse(fs.readFileSync(configPath.current, 'utf8'));
};

beforeEach(() => {
  resetConfigFile();
});

afterAll(() => {
  fs.writeFileSync(configPath.current, JSON.stringify(originalConfig, null, 2));
});

global.editLlmConfig = editLlmConfig;
global.getCurrentConfig = getCurrentConfig;
global.defaultConfig = defaultConfig;
