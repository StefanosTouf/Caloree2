const axios = require('axios');
const { usdaApiKey } = require('../config/keys');

module.exports = axios.create({
  baseURL: 'https://api.nal.usda.gov/fdc/v1',
  params: {
    api_key: usdaApiKey,
  },
});
