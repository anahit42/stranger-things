const { ScraperJob } = require('./jobs')
const TwitterStreamLib = require('./libs/twitter-stream.lib')

const { MongooseConnection } = require('./storages')

const { MONGODB, TOPICS } = require('./config')

/**
 * @description Init Mongoose connection.
 */
MongooseConnection.init(MONGODB.CONNECTION_STRING)

ScraperJob.start()

TwitterStreamLib.followTwitterStreams(TOPICS)
