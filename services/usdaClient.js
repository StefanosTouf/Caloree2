const axios = require('axios');

module.exports = axios.create({
  baseURL: 'https://api.nal.usda.gov/fdc/v1',
  params: {
    api_key: 'kK3qN4gZtTNBtKuEuwDyDH2vvLiNk5UaV2FTEeaz',
  },
});
