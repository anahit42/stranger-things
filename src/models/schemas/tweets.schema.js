const mongoose = require('mongoose')
const { Schema } = mongoose

const TweetsSchema = new Schema({
  tweetId: String,
  topic: String,
  createdAt: Date,
  scrapedAt: Date,
  favoriteCount: Number,
  retweetCount: Number,
  language: String,
  text: String
})

module.exports = TweetsSchema
