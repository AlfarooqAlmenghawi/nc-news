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

  test("/api/articles/:article_id 200: responds with the specific article depending on the params in the url", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          article: [
            {
              article_id: 2,
              title: "Sony Vaio; or, The Laptop",
              topic: "mitch",
              author: "icellusedkars",
              body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
              created_at: "2020-10-16T05:03:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            },
          ],
        });
      });
  });

  test("/api/articles/:article_id 406: rebukes the user if they try to send an unknown endpoint.", () => {
    return request(app)
      .get("/api/articles/nonsense")
      .expect(406)
      .then(({ body }) => {
        console.log(body);
        expect(body.status).toBe(406);
        expect(body.message).toBe(
          "Unknown endpoints are not acceptable on this platform."
        );
        expect(body).toEqual({
          status: 406,
          message: "Unknown endpoints are not acceptable on this platform.",
        });
      });
  });

  test('/api/articles/:article_id 410: returns error "Gone" if the parameter article doesn\'t even exist in the database.', () => {
    return request(app)
      .get("/api/articles/274957890")
      .expect(410)
      .then(({ body }) => {
        console.log(body);
        expect(body.status).toBe(410);
        expect(body.message).toBe(
          "??? There isn't an article stored in this parameter."
        );
        expect(body).toEqual({
          status: 410,
          message: "??? There isn't an article stored in this parameter.",
        });
      });
  });
});
