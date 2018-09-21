const mongoose = require('mongoose')

const { TweetsSchema } = require('./schemas')

class TweetsModel {
  /**
   * @param {Object} createData
   * @return {Promise<Object>}
   * @description Create single tweet.
   */
  static create (createData) {
    return TweetsModel.model.create(createData)
  }

  /**
   * @param {Array} createData
   * @return {Promise<Array>}
   * @description Create few tweets.
   */
  static bulkCreate (createData) {
    return TweetsModel.model.create(createData)
  }
}

TweetsModel.model = mongoose.model('Tweets', TweetsSchema)

module.exports = TweetsModel
