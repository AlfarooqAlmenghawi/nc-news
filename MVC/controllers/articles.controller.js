const {
  fetchSpecificArticle,
  fetchArticlesAndTotalComments,
  fetchAllCommentsOfSpecificArticle,
  addArticle,
  addCommentToSpecificArticle,
  updateVotesOfSpecificArticle,
} = require("../models/articles.model.js");

const getArticlesAndTotalComments = (request, response, next) => {
  const queries = request.query;

  return fetchArticlesAndTotalComments(queries)
    .then(({ rows }) => {
      response.status(200).send({ articlesWithTotalComments: rows });
    })
    .catch((error) => {
      next(error);
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

const getAllCommentsOfSpecificArticle = (request, response, next) => {
  const { article_id } = request.params;

  return fetchAllCommentsOfSpecificArticle(article_id)
    .then((result) => {
      response.status(200).send({ commentsOfThisArticle: result.rows });
    })
    .catch((error) => {
      next(error);
    });
};

const postArticle = (request, response, next) => {
  const requestedArticle = request.body;
  return addArticle(requestedArticle).then((result) => {
    response.status(200).send({ addedArticle: result.rows });
  });
};

const postCommentToSpecificArticle = (request, response, next) => {
  const { article_id } = request.params;
  const requestedComment = request.body;
  return addCommentToSpecificArticle(article_id, requestedComment)
    .then((result) => {
      response.status(201).send({ addedComment: result.rows });
    })
    .catch((error) => {
      next(error);
    });
};

const patchVotesOfSpecificArticle = (request, response, next) => {
  const { article_id } = request.params;
  const requestedVoteChangeData = request.body;

  return updateVotesOfSpecificArticle(article_id, requestedVoteChangeData)
    .then(({ rows }) => {
      response.status(202).send({ updatedArticle: rows });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getSpecificArticle,
  getArticlesAndTotalComments,
  getAllCommentsOfSpecificArticle,
  postArticle,
  postCommentToSpecificArticle,
  patchVotesOfSpecificArticle,
};
