const {
  fetchTopics,
  addTopic,
  removeSpecificTopic,
} = require("../models/topics.model.js");

const getTopics = (request, response) => {
  return fetchTopics().then((result) => {
    response.status(200).send({ topics: result.rows });
  });
};

const postTopic = (request, response, next) => {
  const { slug, description } = request.body;

  return addTopic(request.body)
    .then((result) => {
      response.status(200).send({ newTopic: result.rows });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteSpecificTopic = (request, response, next) => {
  const { topic_name } = request.params;
  removeSpecificTopic(topic_name).then(() => {
    response.status(204).send();
  });
};

module.exports = { getTopics, postTopic, deleteSpecificTopic };
