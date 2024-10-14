const db = require("../../db/connection.js");
const apiEndpoints = require("../../endpoints.json");

const fetchAPI = () => {
  console.log(apiEndpoints);
  console.log(typeof apiEndpoints);
  return apiEndpoints;
};

module.exports = { fetchAPI };
