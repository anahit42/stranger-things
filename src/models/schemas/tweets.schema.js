const mongoose = require('mongoose')
const { Schema } = mongoose

const TweetsSchema = new Schema({
  tweetId: {
    type: String,
    index: true,
    unique: true
  },
  topic: {
    type: String,
    index: true
  },
  userId: String,
  createdAt: Date,
  scrapedAt: Date,
  favoriteCount: Number,
  retweetCount: Number,
  language: String,
  text: String
})

module.exports = TweetsSchema
