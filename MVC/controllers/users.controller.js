const { fetchUsers } = require("../models/users.model.js");

const getUsers = (request, response) => {
  return fetchUsers().then(({ rows }) => {
    response.status(200).send({ Users: rows });
  });
};

module.exports = { getUsers };
