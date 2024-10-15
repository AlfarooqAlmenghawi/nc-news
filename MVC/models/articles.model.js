const db = require("../../db/connection.js");
const format = require("pg-format");

const fetchArticlesAndTotalComments = () => {
  return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS total_comment_count FROM articles 
 LEFT JOIN comments ON comments.article_id = articles.article_id
 GROUP BY articles.article_id ORDER BY articles.created_at DESC;`);
};

const fetchSpecificArticle = (article_id) => {
  return db
    .query(format(`SELECT * FROM articles WHERE article_id = %L`, [article_id]))
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 410,
          message: "??? There isn't an article stored in this parameter.",
        });
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

module.exports = {
  fetchSpecificArticle,
  fetchArticlesAndTotalComments,
  fetchAllCommentsOfSpecificArticle,
};
