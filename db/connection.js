const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

const path = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

console.log(`the environment is ${ENV}`);
console.log(`the path is ${path}`);
console.log(`the database is ${process.env.PGDATABASE}`);

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = new Pool();
