const db = require("../../db/connection.js");
const format = require("pg-format");

const fetchUsers = () => {
  return db.query(`SELECT * FROM users;`);
};

const addUser = (user) => {
  return db
    .query(
      `INSERT INTO users (username, name, avatar_url) VALUES ($1, $2, $3) RETURNING *`,
      [user.username, user.name, user.avatar_url]
    )
    .then((result) => {
      return result.rows;
    });
};

module.exports = { fetchUsers, addUser };
