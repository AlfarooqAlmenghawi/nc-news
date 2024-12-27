const express = require("express");
const app = express();
const cors = require("cors");

// Functions from MVC Requiring

const {
  getTopics,
  postTopic,
  deleteSpecificTopic,
} = require("./MVC/controllers/topics.controller.js");

const { getAPI } = require("./MVC/controllers/api.controller.js");

const {
  getSpecificArticle,
  getArticlesAndTotalComments,
  getAllCommentsOfSpecificArticle,
  postArticle,
  postCommentToSpecificArticle,
  patchVotesOfSpecificArticle,
  deleteSpecificArticle,
} = require("./MVC/controllers/articles.controller.js");

const {
  getComments,
  getSpecificComment,
  deleteSpecificComment,
} = require("./MVC/controllers/comments.controller.js");

const {
  getUsers,
  createUser,
} = require("./MVC/controllers/users.controller.js");

// Error Handling Requiring

const { SQLErrorHandler, customErrorhandler } = require("./error-handlers.js");

// API Requests Handling

app.use(cors());
app.use(express.json());

app.get("/api", getAPI);
app.get("/api/users", getUsers);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticlesAndTotalComments);
app.get("/api/articles/:article_id", getSpecificArticle);
app.get("/api/articles/:article_id/comments", getAllCommentsOfSpecificArticle);

// BELOW IS EXTRA FOR TESTING

app.get("/api/comments", getComments);
app.get("/api/comments/:comment_id", getSpecificComment);

// END OF EXTRA ABOVE

app.post("/api/articles", postArticle);
app.post("/api/topics", postTopic);
app.post("/api/users", createUser);
app.post("/api/articles/:article_id/comments", postCommentToSpecificArticle);

app.patch("/api/articles/:article_id", patchVotesOfSpecificArticle);

app.delete("/api/articles/:article_id", deleteSpecificArticle);
app.delete("/api/topics/:topic_name", deleteSpecificTopic);
app.delete("/api/comments/:comment_id", deleteSpecificComment);

// Error Handling Below

app.use(SQLErrorHandler);
app.use(customErrorhandler);

app.all("*", function (request, response, next) {
  response.status(404).send({
    message: "INVALID API",
  });
});

module.exports = app;
