const Promise = require('bluebird')

const { ScrapingsModel, TweetsModel } = require('../models')

const TwitterLib = require('./twitter.lib')

class ScraperLib {
  /**
   * @param {string} topic
   * @return {Promise<Array>}
   * @description Scrap tweets about some topic.
   */
  static async scrapTweetsAboutTopic (topic) {
    try {
      const scrapingData = await ScrapingsModel.getLastScrapingData(topic)

      const options = scrapingData
        ? { q: topic, max_id: scrapingData.nextMaxId, result_type: 'recent', count: '100' }
        : { q: topic, result_type: 'recent', count: '100' }

      const { tweets, metadata } = await TwitterLib.getTweets(options)
      const nextMaxId = ScraperLib.getNextMaxId(metadata)

      if (tweets.length) {
        const tweetsData = ScraperLib.getTweetsCleanData(tweets, topic)

        return Promise.all([
          TweetsModel.bulkCreate(tweetsData),
          ScrapingsModel.create({ nextMaxId, topic })
        ])
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * @param {Array} tweets
   * @param {string} topic
   * @return {Array}
   * @description Get tweets clean data.
   */
  static getTweetsCleanData (tweets, topic) {
    return tweets.map((tweet) => {
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
    })
  }

  /**
   * @param {Object} metadata
   * @return {string}
   * @description Get next max id from metadata.
   */
  static getNextMaxId (metadata) {
    const { next_results } = metadata

    return next_results.split('=')[1].split('&')[0]
  }
}

module.exports = ScraperLib
