const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

const path = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

console.log(`the environment is ${ENV}`);
console.log(`the path is ${path}`);
console.log(`the database is ${process.env.PGDATABASE}`);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

module.exports = new Pool(config);
