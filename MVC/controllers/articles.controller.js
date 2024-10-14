const { fetchSpecificArticle } = require("../models/articles.model.js");

const getSpecificArticle = (request, response) => {
  const { article_id } = request.params;
  console.log(article_id);
  return fetchSpecificArticle(article_id)
    .then((result) => {
      if (result.rows.length === 0) {
        response.status(410).send({
          status: 410,
          message: "??? There isn't an article stored in this parameter.",
        });
      } else {
        response.status(200).send({ article: result.rows });
      }
    })
    .catch((error) => {
      response.status(406).send({
        status: 406,
        message: "Unknown endpoints are not acceptable on this platform.",
      });
    });
};

module.exports = { getSpecificArticle };
