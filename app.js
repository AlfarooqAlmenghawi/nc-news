const express = require("express");
const app = express();

const { getTopics } = require("./MVC/controllers/topics.controller.js");

const { getAPI } = require("./MVC/controllers/api.controller.js");

const {
  getSpecificArticle,
  getArticlesAndTotalComments,
} = require("./MVC/controllers/articles.controller.js");

const { SQLErrorHandler, customErrorhandler } = require("./error-handlers.js");

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticlesAndTotalComments);

app.get("/api/articles/:article_id", getSpecificArticle);

app.use(SQLErrorHandler);

app.use(customErrorhandler);

module.exports = app;
