const db = require("../../db/connection.js");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics;");
};

module.exports = { fetchTopics };
