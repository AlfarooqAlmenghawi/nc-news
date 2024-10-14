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

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on local server 4000...");
  }
});

module.exports = app;
