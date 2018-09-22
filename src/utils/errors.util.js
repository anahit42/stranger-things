class StreamDataParsingError extends Error {
  constructor (message) {
    super()
    this.message = message
    this.name = this.constructor.name
  }
}

class TweetsBulkCreateError extends Error {
  constructor (message) {
    super()
    this.message = message
    this.name = this.constructor.name
  }
}

class TweetCreateError extends Error {
  constructor (message) {
    super()
    this.message = message
    this.name = this.constructor.name
  }
}

module.exports = {
  StreamDataParsingError,
  TweetsBulkCreateError,
  TweetCreateError
}
