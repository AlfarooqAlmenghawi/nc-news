const db = require("../../db/connection.js");
const format = require("pg-format");

const fetchSpecificArticle = (article_id) => {
  return db.query(
    format(`SELECT * FROM articles WHERE article_id = %L`, [article_id])
  );
};

module.exports = { fetchSpecificArticle };
