const axios = require('axios');
const shelljs = require('shelljs');

const { logger } = require('../../utils');

const getToken = (config) => {
  logger.debug('Fetching IAM Token...');

  return axios.default
    .post(
      'https://iam.cloud.ibm.com/identity/token',
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${config.apiKey}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
    .then((res) => {
      logger.debug('IAM Token fetched successfully');

      return res.data.access_token;
    })
    .catch((err) => {
      logger.error('Failed to fetch IAM Token');
      logger.error(err?.response?.data?.errorMessage || err.toString());

      shelljs.exit(1);
    });
};

module.exports = getToken;
