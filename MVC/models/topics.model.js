const format = require("pg-format");
const db = require("../../db/connection.js");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics;");
};

const addTopic = (topicData) => {
  const { slug, description } = topicData;

  const insertTopicQueryString = format(
    "INSERT INTO topics (slug, description) VALUES (%L) RETURNING *;",
    [slug, description]
  );
};

const removeSpecificTopic = (topic_name) => {
  return db.query(`DELETE FROM topics WHERE slug = $1`, [topic_name]);
};

module.exports = { fetchTopics, addTopic, removeSpecificTopic };
