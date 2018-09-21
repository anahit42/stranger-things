const mongoose = require('mongoose')

class MongooseConnection {
  /**
   * @param {string} MONGODB_URL
   * @description Initiate Mongoose connection and attach event listeners to it.
   */
  static init (MONGODB_URL) {
    const connectionOptions = {
      useNewUrlParser: true,
      keepAlive: true,
      reconnectTries: 5
    }

    mongoose.connect(MONGODB_URL, connectionOptions).catch(MongooseConnection._onConnectionOpeningError)

    mongoose.connection.on('connected', MongooseConnection._onConnected)

    mongoose.connection.on('error', MongooseConnection._onError)

    mongoose.connection.on('disconnected', MongooseConnection._onDisconnected)
  }

  /**
   * @description On connected event handler.
   */
  static _onConnected () {
    console.log('\n Mongoose connection opened')
  }

  /**
   * @description On disconnected event handler.
   */
  static _onDisconnected () {
    console.error('Mongoose connection disconnected')
  }

  /**
   * @description On error event handler.
   */
  static _onError (error) {
    console.error(`Mongoose connection error: ${error.message}`)
  }

  /**
   * @description Connection opening error handler.
   */
  static _onConnectionOpeningError (error) {
    console.error(`Failed to init Mongoose connection: ${error.message}`)
  }
}

module.exports = MongooseConnection
