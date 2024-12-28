const db = require("../../db/connection.js");
const format = require("pg-format");

const nonExistentArticleCustomError = {
  status: 410,
  message: "??? There isn't an article stored in this parameter.",
};

const fetchArticlesAndTotalComments = (queries) => {
  let queryString = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles 
  LEFT JOIN comments ON comments.article_id = articles.article_id`;

  let validQueries = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];

  let validOrderBys = ["asc", "desc"];

  let queryValues = []; // // queryValues array is useless by the way. it's just a fun reference

  if (queries.topic && queries.author) {
    queryString =
      queryString +
      ` WHERE topic = '${queries.topic}' AND articles.author = '${queries.author}'`;
  } else if (queries.topic) {
    queryString = queryString + ` WHERE topic = '${queries.topic}'`;
    queryValues.push(queries.topic);
  } else if (queries.author) {
    queryString = queryString + ` WHERE articles.author = '${queries.author}'`;
    queryValues.push(queries.author);
  }

  queryString += ` GROUP BY articles.article_id`;

  // ORDER BY articles.created_at DESC
  if (queries.sort_by) {
    queryString = queryString + ` ORDER BY ${queries.sort_by}`;
    queryValues.push(queries.sort_by);
  } else {
    queryString = queryString + ` ORDER BY created_at`;
    queryValues.push("created_at");
  } // if the column is wrong it throws an error by itself unlike the one below , but i dont need to put an error anyway just leave it default as desc, the "&& validOrderBys.includes(queries.order)" fixes the error that doesn't crash the server, remove it and test and see if you desire
  if (queries.order && validOrderBys.includes(queries.order)) {
    queryString = queryString + ` ${queries.order}`;
    queryValues.push(queries.order);
  } else {
    queryString = queryString + ` DESC`;
    queryValues.push("desc");
  }
  return db.query(queryString).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 410, message: "There are no articles." });
    }
    return result;
  });
};

const fetchSpecificArticle = (article_id) => {
  return db
    .query(
      format(
        `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles 
  LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = %L GROUP BY articles.article_id`,
        [article_id]
      )
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject(nonExistentArticleCustomError);
      }
      return result;
    });
};

const fetchAllCommentsOfSpecificArticle = (article_id) => {
  return fetchSpecificArticle(article_id).then((result) => {
    return db
      .query(
        format(
          `SELECT * FROM comments WHERE article_id = %L ORDER BY created_at DESC`,
          [article_id]
        )
      )
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({
            status: 403,
            message: "There are no comments yet on this article.",
          });
        }
        return result;
      });
  });
};

const addArticle = (requestedArticle) => {
  return db.query(
    "INSERT INTO articles (title, topic, author, body, votes, article_img_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
    [
      requestedArticle.title,
      requestedArticle.topic,
      requestedArticle.author,
      requestedArticle.body,
      0,
      requestedArticle.article_img_url,
    ]
  );
};

const addCommentToSpecificArticle = (article_id, requestedComment) => {
  return db.query(
    `INSERT INTO comments (body, article_id, author, votes) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [requestedComment.comment, article_id, requestedComment.username, 0]
  );
};

const updateVotesOfSpecificArticle = (article_id, requestedVoteChangeData) => {
  return db
    .query(
      `UPDATE articles 
    SET votes = votes + $1
    WHERE article_id = $2 RETURNING *;`,
      [requestedVoteChangeData.inc_votes, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject(nonExistentArticleCustomError);
      }
      return result;
    });
};

const removeSpecificArticle = (article_id) => {
  return db.query(`DELETE FROM articles WHERE article_id = $1;`, [article_id]);
};

module.exports = {
  fetchSpecificArticle,
  fetchArticlesAndTotalComments,
  fetchAllCommentsOfSpecificArticle,
  addArticle,
  addCommentToSpecificArticle,
  updateVotesOfSpecificArticle,
  removeSpecificArticle,
};
