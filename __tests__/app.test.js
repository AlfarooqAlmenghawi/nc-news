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
              comment_count: "0",
            },
          ],
        });
      });
  });

  test("/api/articles/ 200: responds with all the articles with the total comment count for each article and is sorted by date and ordered by latest first by default", () => {
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
              comment_count: "2",
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
              comment_count: "1",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "2",
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
              comment_count: "11",
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
              comment_count: "2",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "0",
            },
          ],
        });

        expect(body.articlesWithTotalComments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  test("/api/users/ 200: responds with all the users in the users table (using SQL of course).", () => {
    request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          Users: [
            {
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            },
            {
              username: "icellusedkars",
              name: "sam",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
            },
            {
              username: "rogersop",
              name: "paul",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
            },
            {
              username: "lurker",
              name: "do_nothing",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            },
          ],
        });
      });
  }); // error handling for get users and articles already done with the LAST RESORT ERROR HANDLER describe block (the last describe block.).

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
              comment_count: "2",
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
        expect(body.commentsOfThisArticle.length).toBe(2);
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

describe("POST", () => {
  test("/api/articles/:article_id/comments 201: posts the comment with the reference to the article to the database", () => {
    const exampleComment = {
      username: "icellusedkars",
      comment:
        "I don't like this article. How dare you post such trash content?",
    };

    return request(app)
      .post("/api/articles/5/comments")
      .send(exampleComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.addedComment[0].article_id).toBe(5);
        expect(body.addedComment[0].author).toBe("icellusedkars");
        expect(body.addedComment[0].comment_id).toBe(19);
        expect(body.addedComment[0].votes).toBe(0);
        // How i'm handling the constantly changing time data
        expect(body).toEqual({
          addedComment: [
            {
              comment_id: 19,
              body: "I don't like this article. How dare you post such trash content?",
              article_id: 5,
              author: "icellusedkars",
              votes: 0,
              created_at: expect.any(String),
            },
          ],
        });
      });
  });

  test("/api/articles/:article_id/comments 406: returns an error if the username is invalid and doesn't exist in the database.", () => {
    const exampleComment = {
      username: "rosemullan",
      comment: "431",
    };

    return request(app)
      .post("/api/articles/12/comments")
      .send(exampleComment)
      .expect(406)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "User doesn't exist.",
        });
      });
  });

  test("/api/articles/:article_id/comments 406: returns an error if the article id in the parameter is invalid to post in the first place.", () => {
    const exampleComment = {
      username: "icellusedkars",
      comment: "Yo",
    };

    return request(app)
      .post("/api/articles/888/comments")
      .send(exampleComment)
      .expect(406)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Invalid article ID, so nowhere to post this comment.",
        });
      });
  });

  test("/api/articles/:article_id/comments 400: returns an error if the object format is invalid.", () => {
    const exampleComment = {
      userdname: "icellusedkars",
      comment: "431",
    };

    return request(app)
      .post("/api/articles/12/comments")
      .send(exampleComment)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Invalid object format.",
        });
      });
  });

  test("/api/articles/:article_id/comments 400: returns an error if the ID is an invalid format.", () => {
    const exampleComment = {
      username: "icellusedkars",
      comment: "431",
    };

    return request(app)
      .post("/api/articles/notanID/comments")
      .send(exampleComment)
      .expect(406)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Unknown endpoints are not acceptable on this platform.",
        });
      });
  });

  test("/api/articles/:article_id/comments 400: returns an error if the ID non existent.", () => {
    const exampleComment = {
      username: "icellusedkars",
      comment: "431",
    };

    return request(app)
      .post("/api/articles/1996/comments")
      .send(exampleComment)
      .expect(406)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Invalid article ID, so nowhere to post this comment.",
        });
      });
  });

  test("/api/articles/:article_id/comments 400: returns an error if the ID non existent.", () => {
    const exampleComment = {
      username: "icellusedkars",
      comment: "431",
    };

    return request(app)
      .post("/api/articles/1996/comments")
      .send(exampleComment)
      .expect(406)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Invalid article ID, so nowhere to post this comment.",
        });
      });
  });

  test("/api/articles/:article_id/comments 400: returns an error if the body is missing required elements.", () => {
    const exampleComment = {
      username: "icellusedkars",
    };

    return request(app)
      .post("/api/articles/1996/comments")
      .send(exampleComment)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Invalid object format.",
        });
      });
  });
});

describe("PATCH", () => {
  test("/api/articles/:article_id 202: successfully updates the votes count of a specific article", () => {
    const requestedVoteChange = {
      inc_votes: 6,
    };

    return request(app)
      .patch("/api/articles/4")
      .send(requestedVoteChange)
      .expect(202)
      .then(({ body }) => {
        expect(body).toEqual({
          updatedArticle: [
            {
              article_id: 4,
              title: "Student SUES Mitch!",
              topic: "mitch",
              author: "rogersop",
              body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
              created_at: "2020-05-06T01:14:00.000Z",
              votes: 6,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            },
          ],
        });
      });
  });

  test("/api/articles/:article_id 410: rejects the request by sending a 410 if there is no article in the first place to update.", () => {
    const requestedVoteChange = {
      inc_votes: 6,
    };

    return request(app)
      .patch("/api/articles/433")
      .send(requestedVoteChange)
      .expect(410)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "??? There isn't an article stored in this parameter.",
        });
      });
  });

  test("/api/articles/:article_id 400: rejects the request by sending a 400 if client sends wrong object format.", () => {
    const requestedVoteChange = {
      inc_votgggs: 6,
    };

    return request(app)
      .patch("/api/articles/4")
      .send(requestedVoteChange)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Invalid object format.",
        });
      });
  });
});

describe("DELETE", () => {
  test("/api/comments/:comment_id 204: should delete and return a 204 (No content) indicating that it has successfully deleted the comment.", () => {
    return request(app).delete("/api/comments/6").expect(204);
  });

  test("/api/comments/:comment_id 410: should reject and return a 410 (Gone) indicating that the comment doesn't even exist, either because it has already been deleted or the comment never existed in the parameter in the first place.", () => {
    return request(app)
      .delete("/api/comments/6768")
      .expect(410)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "??? There isn't a comment stored in this parameter.",
        });
      });
  });

  test("/api/comments/:comment_id 410: should reject and return a 406 indicating that the parameter is not a nuber (ID).", () => {
    return request(app)
      .delete("/api/comments/HAVGVDG")
      .expect(406)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Unknown endpoints are not acceptable on this platform.",
        });
      });
  });
});

describe("LAST RESORT ERROR HANDLER", () => {
  test("(any invalid API) 500: rejects the request if API doesn't exist, and is not supposed to be sent.", () => {
    const requestedVoteChange = {
      inc_votes: 6,
    }; // can be anything

    return request(app)
      .patch("/api/articccleaf4") // or anything else that doesn't exist or shouldn't
      .send(requestedVoteChange)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "INVALID API",
        });
      });
  });
});

describe("GET (QUERIES)", () => {
  test("/api/articles?sort_by=article_id&order=desc 200: responds with all the articles with the total comment count for each article and is sorted by article_id from bottom to top", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=desc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          articlesWithTotalComments: [
            {
              article_id: 13,
              title: "Another article about Mitch",
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2020-10-11T11:24:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "2",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "1",
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
              comment_count: "2",
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
              comment_count: "0",
            },
            {
              article_id: 3,
              title: "Eight pug gifs that remind me of mitch",
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2020-11-03T09:12:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "2",
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
              comment_count: "0",
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
              comment_count: "11",
            },
          ],
        });

        expect(body.articlesWithTotalComments).toBeSortedBy("article_id", {
          descending: true,
        });
      });
  });

  test("/api/articles?sort_by=votes&order=asc 200: a further test that tests that it responds with all the articles with the total comment count for each article and is sorted by votes from top to bottom", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          articlesWithTotalComments: [
            {
              article_id: 12,
              title: "Moustache",
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2020-10-11T11:24:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "1",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "2",
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
              comment_count: "0",
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
              comment_count: "0",
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
              comment_count: "2",
            },
            {
              article_id: 3,
              title: "Eight pug gifs that remind me of mitch",
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2020-11-03T09:12:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              comment_count: "2",
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
              comment_count: "11",
            },
          ],
        });

        expect(body.articlesWithTotalComments).toBeSortedBy("votes", {
          descending: false,
        });
      });
  });

  test("/api/articles?sort_by=favoriteFood&order=asc 400: responds with an error stating that the sort_by query is referencing a column that doesn't exist in the database table", () => {
    return request(app)
      .get("/api/articles?sort_by=favoriteFood&order=asc")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "Column doesn't exist.",
        });
      });
  });

  test("/api/articles?sort_by=article_id&order=adscf 200: responds with the data sorted by article_id (for example) and order by default (descending) if the order query is something other than asc or desc", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=adscf")
      .expect(200)
      .then(({ body }) => {
        expect(body.articlesWithTotalComments).toBeSortedBy("article_id", {
          descending: true,
        });
      });
  });

  test('/api/articles?sort_by=article_id&order=asc&topic=mitch 200: responds with all the articles with the same queries as above but with a specific topic (for example: "mitch")', () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=asc&topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articlesWithTotalComments).toBeSortedBy("article_id", {
          descending: false,
        });
      });
  });

  test("/api/articles?sort_by=article_id&order=asc&topic=alfarooq 410: responds with an error if there are no articles with the topic of the given query.", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=asc&topic=alfarooq")
      .expect(410)
      .then(({ body }) => {
        expect(body).toEqual({
          message: "There are no articles.",
        });
      });
  });

  test("/api/articles?sort_by=article_id&order=asc&todpic=mitch 200: ignores the third query if it's invalid", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=asc&todpic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articlesWithTotalComments).toBeSortedBy("article_id", {
          descending: false,
        });
      });
  });
});
