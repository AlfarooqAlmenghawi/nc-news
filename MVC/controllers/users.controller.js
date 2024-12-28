const { fetchUsers, addUser } = require("../models/users.model.js");

const getUsers = (request, response) => {
  return fetchUsers().then(({ rows }) => {
    response.status(200).send({ Users: rows });
  });
};

const createUser = (request, response, next) => {
  const newUser = request.body;
  return addUser(newUser)
    .then((result) => {
      response.status(201).send({ newUser: result });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getUsers, createUser };
