const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const endpoints = require("../endpoints.json");

const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET", () => {
  test("/api/topics/ 200: responds with a slug and a description", () => {
    return request(app)
      .get("/api/topics/")
      .expect(200)
      .then(({ body }) => {
        console.log(body.topics, "<<<< body");
        expect(body.topics).toEqual([
          { slug: "mitch", description: "The man, the Mitch, the legend" },
          { slug: "cats", description: "Not dogs" },
          { slug: "paper", description: "what books are made of" },
        ]);
      });
  });

  test("/api/ 200: responds with the documentation of the current available endpoints", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body }) => {
        expect(body.APIs).toEqual(endpoints);
      });
  });
});
