const Promise = require('bluebird')
const Agenda = require('agenda')

const { MONGODB, TOPICS } = require('../config')
const { CONNECTION_STRING } = MONGODB

/**
 * @description DeprecationWarning is because of agenda lib not setting { useNewUrlParser: true } in Mongo connection.
 */
const agenda = new Agenda({ db: { address: CONNECTION_STRING, collection: 'jobs', options: { useNewUrlParser: true } } })

const ScraperLib = require('../libs/scraper.lib')

class ScraperJob {
  /**
   * @return {Promise<Array>}
   * @description Function to define as scraping job.
   */
  static startScraping (job, done) {
    console.log('\n Scarping tweets at', new Date())

    const promises = TOPICS.map((topic) => ScraperLib.scrapTweetsAboutTopic(topic))

    return Promise.all(promises).then(() => done()).catch(done)
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
