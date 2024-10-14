const { fetchTopics } = require("../models/topics.models.js");

const getTopics = (request, response) => {
  return fetchTopics().then((result) => {
    console.log(result.rows);
    response.status(200).send(result.rows);
  });
};

module.exports = { getTopics };
