const { fetchTopics } = require("../models/topics.model.js");

const getTopics = (request, response) => {
  return fetchTopics().then((result) => {
    response.status(200).send({ topics: result.rows });
  });
};

module.exports = { getTopics };
