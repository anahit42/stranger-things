const Twitter = require('twitter')

const { TWITTER } = require('../config')
const { ACCESS_TOKEN, ACCESS_TOKEN_SECRET, API_KEY, API_SECRET } = TWITTER

class TwitterLib {
  /**
   * @param {Object} options
   * @return {Promise<Object>}
   * @description Get tweets with provided options.
   */
  static getTweets (options) {
    return new Promise((resolve, reject) => {
      TwitterLib.client.get('search/tweets', options, (error, data) => {
        if (error) {
          return reject(error)
        }

        const { search_metadata, statuses } = data

        return resolve({ tweets: statuses, metadata: search_metadata })
      })
    })
  }
}

TwitterLib.client = new Twitter({
  consumer_key: API_KEY,
  consumer_secret: API_SECRET,
  access_token_key: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
})

module.exports = TwitterLib
