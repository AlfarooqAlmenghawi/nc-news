const db = require("../../db/connection.js");
const format = require("pg-format");

const nonExistentCommentCustomError = {
  status: 410,
  message: "??? There isn't a comment stored in this parameter.",
};

const fetchComments = () => {
  return db.query(`SELECT * FROM comments;`);
};

const fetchSpecificComment = (comment_id) => {
  return db
    .query(format(`SELECT * FROM comments WHERE comment_id = %L`, [comment_id]))
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject(nonExistentCommentCustomError);
      }
      return result;
    });
};

const removeSpecificComment = (comment_id) => {
  return fetchSpecificComment(comment_id).then((result) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]);
  });
};

module.exports = { fetchComments, fetchSpecificComment, removeSpecificComment };
