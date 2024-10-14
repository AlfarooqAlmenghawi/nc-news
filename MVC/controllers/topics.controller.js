const { fetchTopics } = require("../models/topics.model.js");

const getTopics = (request, response) => {
  return fetchTopics().then((result) => {
    console.log(result.rows);
    response.status(200).send({ topics: result.rows });
  });
};

module.exports = { getTopics };