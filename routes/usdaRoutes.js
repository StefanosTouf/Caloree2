const requireLogin = require('../middlewares/requireLogin');
const usdaClient = require('../services/usdaClient');
const configNutrients = require('../utils/configNutrients');

//https://api.nal.usda.gov/fdc/v1

module.exports = (app) => {
  app.get('/api/usda/foods/search', requireLogin, async (req, res) => {
    const { query, pageNumber } = req.query;

    const response = await usdaClient.get('/foods/search', {
      params: {
        query,
        pageNumber: pageNumber || 1,
      },
    });
    res.send(response.data);
  });

  app.get('/api/usda/food/:fdcId', requireLogin, async (req, res) => {
    const { fdcId } = req.params;

    const response = await usdaClient.get(`/food/${fdcId}`, {
      params: {
        format: 'abridged',
      },
    });

    const configuredNutrients = await configNutrients(
      response.data.foodNutrients
    );

    res.send({ ...response.data, foodNutrients: configuredNutrients });
  });
};
