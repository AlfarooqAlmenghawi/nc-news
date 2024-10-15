const {
  fetchSpecificArticle,
  fetchArticlesAndTotalComments,
} = require("../models/articles.model.js");

const getArticlesAndTotalComments = (request, response) => {
  return fetchArticlesAndTotalComments().then(({ rows }) => {
    response.status(200).send({ articlesWithTotalComments: rows });
  });
};

const getSpecificArticle = (request, response, next) => {
  const { article_id } = request.params;
  return fetchSpecificArticle(article_id)
    .then((result) => {
      response.status(200).send({ article: result.rows });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getSpecificArticle, getArticlesAndTotalComments };
