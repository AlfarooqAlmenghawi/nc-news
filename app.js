const express = require("express");
const app = express();

const { getTopics } = require("./MVC/controllers/topics.controller.js");

const { getAPI } = require("./MVC/controllers/api.controller.js");

const {
  getSpecificArticle,
  getArticlesAndTotalComments,
  getAllCommentsOfSpecificArticle,
  postCommentToSpecificArticle,
} = require("./MVC/controllers/articles.controller.js");

const {
  SQLErrorHandlerForUnknownEndPoints,
  SQLErrorHandlerForPostingInvalidUsernamesOrPostingToInvalidArticles,
  SQLErrorHandlerForNullValuesOrInvalidBodyFormatRequestedByTheClient,
  customErrorhandler,
} = require("./error-handlers.js");

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticlesAndTotalComments);

app.get("/api/articles/:article_id", getSpecificArticle);

app.get("/api/articles/:article_id/comments", getAllCommentsOfSpecificArticle);

app.post("/api/articles/:article_id/comments", postCommentToSpecificArticle);

app.all("*", function (request, response, next) {
  response.status(500).send({
    message: "INVALID API",
  });
});

app.use(SQLErrorHandlerForUnknownEndPoints);

app.use(SQLErrorHandlerForPostingInvalidUsernamesOrPostingToInvalidArticles);

app.use(SQLErrorHandlerForNullValuesOrInvalidBodyFormatRequestedByTheClient);

app.use(customErrorhandler);

module.exports = app;
