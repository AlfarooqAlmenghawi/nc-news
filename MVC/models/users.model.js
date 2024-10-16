const db = require("../../db/connection.js");
const format = require("pg-format");

const fetchUsers = () => {
  return db.query(`SELECT * FROM users;`);
};

module.exports = { fetchUsers };
