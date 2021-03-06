module.exports = {
  MONGODB: {
    CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING
  },
  TWITTER: {
    ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    API_KEY: process.env.TWITTER_API_KEY,
    API_SECRET: process.env.TWITTER_API_SECRET
  },
  TOPICS: ['Trump', 'ISIS', 'Esports', 'Lady Gaga']
}
