const mongoose = require('mongoose')

const { TweetsSchema } = require('./schemas')

const { ErrorsUtil } = require('../utils')
const { TweetsBulkCreateError, TweetCreateError } = ErrorsUtil

class TweetsModel {
  /**
   * @param {string} tweetId
   * @return {Promise<Object>}
   * @description Get single tweet by tweetId.
   */
  static getTweetById (tweetId) {
    return TweetsModel.model.findOne({ tweetId })
  }

  /**
   * @param {Object} createData
   * @return {Promise<Object>}
   * @description Create single tweet.
   */
  static create (createData) {
    return TweetsModel.model
      .create(createData)
      .catch((error) => {
        const _error = new TweetCreateError(error.message)
        console.log(`\n ${_error.name}: ${_error.message}`)
      })
  }

  /**
   * @param {Array} createData
   * @return {Promise<Array>}
   * @description Create few tweets.
   */
  static bulkCreate (createData) {
    return TweetsModel.model
      .create(createData)
      .catch((error) => {
        const _error = new TweetsBulkCreateError(error.message)
        console.log(`\n ${_error.name}: ${_error.message}`)
      })
  }
}

TweetsModel.model = mongoose.model('Tweets', TweetsSchema)

module.exports = TweetsModel
