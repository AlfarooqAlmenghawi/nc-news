const { fetchAPI } = require("../models/api.model.js");

const getAPI = (request, response) => {
  const result = fetchAPI();
  response.status(200).send({ APIs: result });
};

module.exports = { getAPI };
