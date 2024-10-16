const {
  fetchComments,
  fetchSpecificComment,
  removeSpecificComment,
} = require("../models/comments.model.js");

const getComments = (request, response, next) => {
  return fetchComments().then(({ rows }) => {
    response.status(200).send({ allComments: rows });
  });
};

const getSpecificComment = (request, response, next) => {
  const { comment_id } = request.params;
  return fetchSpecificComment(comment_id)
    .then((result) => {
      response.status(200).send({ comment: result.rows });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteSpecificComment = (request, response, next) => {
  const { comment_id } = request.params;

  return removeSpecificComment(comment_id)
    .then(() => {
      response.status(204).send(); // Nothing can be sent, it will always assume nothing
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getComments, getSpecificComment, deleteSpecificComment };
