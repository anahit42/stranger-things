const Promise = require('bluebird')
const Agenda = require('agenda')

const { MONGODB } = require('../config')
const { CONNECTION_STRING } = MONGODB

/**
 * @description DeprecationWarning is because of agenda lib not setting { useNewUrlParser: true } in Mongo connection.
 */
const agenda = new Agenda({ db: { address: CONNECTION_STRING, collection: 'jobs' } })

const ScraperLib = require('../libs/scraper.lib')

class ScraperJob {
  /**
   * @return {Promise<Array>}
   * @description Function to define as scraping job.
   */
  static startScraping (job, done) {
    console.log(' Scarping tweets at', new Date())

    return Promise.all([
      ScraperLib.scrapTweetsAboutTopic('Trump'),
      ScraperLib.scrapTweetsAboutTopic('ISIS'),
      ScraperLib.scrapTweetsAboutTopic('Esports'),
      ScraperLib.scrapTweetsAboutTopic('Lady Gaga')
    ])
      .then(() => done())
      .catch(done)
  }

  /**
   * @description Start scraper job.
   */
  static start () {
    agenda.define('scraping', ScraperJob.startScraping)

    agenda.on('ready', async () => {
      await agenda.every('30 seconds', 'scraping')
      await agenda.start()
    })
  }
}

module.exports = ScraperJob
