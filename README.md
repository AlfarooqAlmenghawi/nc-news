# Northcoders News API

Hosted Database URL: https://nc-news-uocp.onrender.com/api/users

Summary: This project is a news & articles website where users can view articles and also post their own. They can also comment and like other people's articles, creating a sense of engagement.

**_To make this project run, you must add certain files to allow this codebase to connect to the databases._**

How to Prepare the Project (Cloning, installing dependencies, etc.):

**1. Fork and clone this github repository (the link to this project) to your computer: https://github.com/AlfarooqAlmenghawi/nc-news**

**2. Open it in VS Code and make sure you have cd (changed directory) into the path leading up to /be-nc-news**

**3. Run `npm install`. This will install all the required dependencies which are taken from the `package.json` file in the root of this repository.**

**4. Create 2 files in the root of this repository (which should be now on your computer) called `.env.test` and `.env.development`. In the `.env.test`, write exactly `PGDATABASE=nc_news_test` inside it. And inside of the `.env.development`, write exactly `PGDATABASE=nc_news` with no changes of case and no extra characters (not even a ; in the end) and ensure there are NO typos.**

**5. Then you will want to run `npm run setup-dbs` and `npm run seed` . This will prepare and create the PSQL database and tables for you.**

Versions of `Node.js` and `Postgres` used for this project:

`Node.js`: "v22.6.0"  
`Postgres`: "^8.7.3"

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
