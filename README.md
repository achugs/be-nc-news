# :star2:**NC-NEWS**:star2:

NC News is an api that interacts with my NC News website. The database for this project is PSQL, and we interact with it using Knex. The database stores articles, users, topics and comments which are available through various endpoints.

Find the hosted version at https://nc-hughes-news.herokuapp.com/api

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Step 1 - Setting up your own repository

Clone this repo:

```bash
git clone (https://github.com/achugs/be-nc-news.git)

cd be-nc-news
```

On GitHub create your own **public** repository for your project. **Make sure NOT to initialise it with a README or .gitignore.**

Next, you should hook your local version up to the newly created GitHub repo. Use the following terminal commands, making sure to check the git remotes with each step (`git remote -v`):

```bash
git remote remove origin

# This will prevent you from pushing to the original repo.
```

```bash
git remote add origin <YOUR-GITHUB-URL>

# This will add your GitHub location to your local git repository.
# You can confirm this by checking the new git remote.
```

#### Prerequisites

```
node v11.14.0
postgresSQL 11
npm 6.9.0
```

#### Dependencies

```
"express": "^4.17.1",
"knex": "^0.19.0",
"pg": "^7.11.0"
```

#### Developer Dependencies

```
"chai": "^4.2.0",
"chai-sorted": "^0.2.0",
"mocha": "^6.1.4",
"supertest": "^4.0.2"
```

To install all dependencies:

```bash
npm install
```

## Step 2 - Setting up your project

In this repo there is no Knex file. You will need to create your own and add it to `.gitignore`. If you are on linux insert your postgres username and password into the knexfile.

#### Creating your knexfile.js

```
const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;
const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {

  development: {
    connection: {
      database: 'nc_news'
      // username,
      // password
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
  test: {
    connection: {
      database: 'nc_news_test'
      // username,
      // password
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };

```

You have also been provided with a `db` folder with some data, a [setup.sql](./db/setup.sql) file, a `seeds` folder and a `utils` folder. You should also take a minute to familiarise yourself with the npm scripts you have been provided.

The job of `index.js` in each the data folders is to export out all the data from that folder. Three `index.js` files have been created for you. This is so that, when you need access to the data elsewhere, there is one convenient require statement - to the index file, rather than having to require each file individually. These index files can be found in `db/data`, `db/data/development-data` and `db/data/test-data`

The job of the `db/index.js` file will be to export out of the db folder _only the data relevant to the current environment_. Specifically this file should allow your seed file to access only a specific set of data depending on the environment it's in: test, development or production.

## Step 3 - Migrations and Seeding

Your seed file should now be set up to require in either test or dev data depending on the environment.

Migrations have been created and seed functions provided.

Run the seed script to seed

```
npm run seed
```

## Testing for each endpoint

```
/api/topics:

GET: Returns an array of topic objects with correct properties.
```

```
/api/users/:username:

GET: Returns an object of the passed user with the correct properties in relation to the username.
```

```
/api/articles/:article_id:

GET: Returns an article object with correct properties in relation to the articles id number.
PATCH: The article can have its votes updated when passed an object of inc_votes and valid number.
```

```
/api/articles/:article_id/comments:

GET: Returns all of a specific articles comments by passing it into the url.
POST: Tested that a new comment can be posted to a specified article.
```

```
/api/articles:

GET: Returns an array of articles objects with the correct properties. This endpoint can use queries such as author, topic, sort_by and order.
```

```
/api/comments/:comment_id:
GET: Returns an object with the correct properties in relation to the comments id number.
PATCH: The comment can have its votes updated when passed an object of inc_votes and valid number.
```

```
/api/comments/:comment_id:
DELETE: Tested to ensure we can delete a comment by passing its ID.
```

## Version

1.0

## Authors

Anna Hughes

## Acknowledgments

NorthCoders
