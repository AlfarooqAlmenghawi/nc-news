const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");

const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET", () => {
  test("200: responds with a slug and a description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((rows) => {
        const textToObject = JSON.parse(rows.text);
        console.log(JSON.parse(rows.text));
        expect(textToObject).toEqual([
          { slug: "mitch", description: "The man, the Mitch, the legend" },
          { slug: "cats", description: "Not dogs" },
          { slug: "paper", description: "what books are made of" },
        ]);
      });
  });
});
