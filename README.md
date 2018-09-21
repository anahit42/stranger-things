# stranger-things

Package for scraping twitter data

# Table of Contents

* [Environment Variables](#environment-variables)
* [Static Config Variables](#static-config-variables)
* [Starting Scraping](#starting-scraping)

## Environment Variables

Required Environment Variables.

| Variable name                    | Description                        |
|----------------------------------|------------------------------------|
| `MONGODB_CONNECTION_STRING`      | MongoDB connection string          |
| `TWITTER_ACCESS_TOKEN`           | Twitter access token               |
| `TWITTER_ACCESS_TOKEN_SECRET`    | Twitter access token secret        |
| `TWITTER_API_KEY`                | Twitter app API key                |
| `TWITTER_API_SECRET`             | Twitter app API secret             |


## Static Config Variables

| Variable name                    | Value                                        |
|----------------------------------|----------------------------------------------|
| `TOPICS`                         | `['Trump', 'ISIS', 'Esports', 'Lady Gaga']`  |


## Starting Scraping

You need to provide all environment variables and then start the scraping with the following command:

```
npm start
```
