const { fetchAPI } = require("../models/api.model.js");

const getAPI = (request, response) => {
  const result = fetchAPI();
  console.log(result);
  response.status(200).send({ APIs: result });
};

module.exports = { getAPI };
