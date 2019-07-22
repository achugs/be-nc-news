 # :star2:**NC-NEWS**:star2:

  NC News is an api that interacts with my NC News website. The  database for this project is PSQL, and we interact with it using Knex.

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
## Step 2 - Setting up your project
In this repo there is no Knex file. You will need to create your own and add it to `.gitignore`. If you are on linux insert your postgres username and password into the knexfile. 

#### Creating your Knex file
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
      database: 'nc_news',
      username: username,
      password: password
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: username,
      password: password
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```
You have also been provided with a `db` folder with some data, a [setup.sql](./db/setup.sql) file, a `seeds` folder and a `utils` folder. You should also take a minute to familiarise yourself with the npm scripts you have been provided.

### Prerequisites

### Installing

## Running the tests

## Deployment

## Built with

## Contributing

## Versioning

## Authors

## Acknowledgments