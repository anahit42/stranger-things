const Twitter = require('twitter')

const { TWITTER } = require('../config')
const { ACCESS_TOKEN, ACCESS_TOKEN_SECRET, API_KEY, API_SECRET } = TWITTER

const { ErrorsUtil } = require('../utils')
const { StreamDataParsingError } = ErrorsUtil

const { TweetsModel } = require('../models')

class TwitterStreamLib {
  /**
   * @param {string} topic
   * @description Follow twitter stream about single topic.
   */
  static followTwitterStream (topic) {
    const stream = TwitterStreamLib.client.stream('statuses/filter', { track: topic })

    stream.on('data', (data) => {
      const tweetData = TwitterStreamLib.getTweetCleanData(data, topic)

      TweetsModel.create(tweetData).catch(console.error)
    })

    stream.on('error', (error) => {
      const _error = new StreamDataParsingError(error.message)
      console.log(`${_error.name}: ${_error.message}`)
    })
  }

  /**
   * @param {Array} topics
   * @description Follow twitter streams about few topics.
   */
  static followTwitterStreams (topics) {
    topics.forEach(TwitterStreamLib.followTwitterStream)
  }

  /**
   * @param {Object} tweet
   * @param {string} topic
   * @return {Object}
   * @description Get tweet clean data.
   */
  static getTweetCleanData (tweet, topic) {
    const { created_at, id, text, retweet_count, favorite_count, lang, user } = tweet

    return {
      tweetId: id,
      topic,
      userId: user.id,
      createdAt: created_at,
      scrapedAt: new Date(),
      favoriteCount: favorite_count,
      retweetCount: retweet_count,
      language: lang,
      text
    }
  }
}

TwitterStreamLib.client = new Twitter({
  consumer_key: API_KEY,
  consumer_secret: API_SECRET,
  access_token_key: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
})

module.exports = TwitterStreamLib
