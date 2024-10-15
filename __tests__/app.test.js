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

  test("/api/articles/ 200: responds with all the articles with the total comment count for each article", () => {
    return request(app)
      .get("/api/articles/")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          articlesWithTotalComments: [
            {
              article_id: 3,
              title: "Eight pug gifs that remind me of mitch",
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2020-11-03T09:12:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "2",
            },
            {
              article_id: 6,
              title: "A",
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2020-10-18T01:00:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "1",
            },
            {
              article_id: 2,
              title: "Sony Vaio; or, The Laptop",
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2020-10-16T05:03:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "0",
            },
            {
              article_id: 12,
              title: "Moustache",
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2020-10-11T11:24:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "0",
            },
            {
              article_id: 13,
              title: "Another article about Mitch",
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2020-10-11T11:24:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "0",
            },
            {
              article_id: 5,
              title: "UNCOVERED: catspiracy to bring down democracy",
              topic: "cats",
              author: "rogersop",
              created_at: "2020-08-03T13:14:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "2",
            },
            {
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 100,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "11",
            },
            {
              article_id: 9,
              title: "They're not exactly dogs, are they?",
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2020-06-06T09:10:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "2",
            },
            {
              article_id: 10,
              title: "Seven inspirational thought leaders from Manchester UK",
              topic: "mitch",
              author: "rogersop",
              created_at: "2020-05-14T04:15:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "0",
            },
            {
              article_id: 4,
              title: "Student SUES Mitch!",
              topic: "mitch",
              author: "rogersop",
              created_at: "2020-05-06T01:14:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "0",
            },
            {
              article_id: 8,
              title: "Does Mitch predate civilisation?",
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2020-04-17T01:08:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "0",
            },
            {
              article_id: 11,
              title: "Am I a cat?",
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2020-01-15T22:21:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "0",
            },
            {
              article_id: 7,
              title: "Z",
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2020-01-07T14:08:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              total_comment_count: "0",
            },
          ],
        });
      });
  });

  test("/api/articles/:article_id 200: responds with the specific article for the user when they send a valid endpoint.", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          article: [
            {
              article_id: 3,
              title: "Eight pug gifs that remind me of mitch",
              topic: "mitch",
              author: "icellusedkars",
              body: "some gifs",
              created_at: "2020-11-03T09:12:00.000Z",
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
        expect(body.message).toBe(
          "Unknown endpoints are not acceptable on this platform."
        );
        expect(body).toEqual({
          message: "Unknown endpoints are not acceptable on this platform.",
        });
      });
  });

  test('/api/articles/:article_id 410: returns error "Gone" if the parameter article doesn\'t even exist in the database.', () => {
    return request(app)
      .get("/api/articles/274957890")
      .expect(410)
      .then(({ body }) => {
        expect(body.message).toBe(
          "??? There isn't an article stored in this parameter."
        );
        expect(body).toEqual({
          message: "??? There isn't an article stored in this parameter.",
        });
      });
  });

  test("/api/articles/:article_id/comments 200: returns the comments of the specific article as requested by the client.", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          commentsOfThisArticle: [
            {
              comment_id: 11,
              body: "Ambidextrous marsupial",
              article_id: 3,
              author: "icellusedkars",
              votes: 0,
              created_at: "2020-09-19T23:10:00.000Z",
            },
            {
              comment_id: 10,
              body: "git push origin master",
              article_id: 3,
              author: "icellusedkars",
              votes: 0,
              created_at: "2020-06-20T07:24:00.000Z",
            },
          ],
        });
      });
  });

  test("/api/articles/:article_id/comments 410: returns an error if the article doesn't exist.", () => {
    return request(app)
      .get("/api/articles/123/comments")
      .expect(410)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "??? There isn't an article stored in this parameter.",
        });
      });
  });

  test("/api/articles/:article_id/comments 403: returns an error if there are no comments in the article.", () => {
    return request(app)
      .get("/api/articles/12/comments")
      .expect(403)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "There are no comments yet on this article.",
        });
      });
  });
});
