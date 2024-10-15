const db = require("../../db/connection.js");
const apiEndpoints = require("../../endpoints.json");

const fetchAPI = () => {
  return apiEndpoints;
};

module.exports = { fetchAPI };
