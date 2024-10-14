const express = require("express");
const app = express();

const { getTopics } = require("./MVC/controllers/topics.controller.js");

const { getAPI } = require("./MVC/controllers/api.controller.js");

const {
  getSpecificArticle,
} = require("./MVC/controllers/articles.controller.js");

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getSpecificArticle);

module.exports = app;
