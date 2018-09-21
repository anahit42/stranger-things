const mongoose = require('mongoose')

const { ScrapingsSchema } = require('./schemas')

class ScrapingsModel {
  /**
   * @param {Object} createData
   * @return {Promise<Object>}
   * @description Create scraping instance.
   */
  static create (createData) {
    return ScrapingsModel.model.create(createData)
  }
  /**
   * @return {Promise<Object | null>}
   * @description Get last scraping data.
   */
  static getLastScrapingData () {
    return ScrapingsModel.model.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then((data) => data.length ? data[0] : null)
  }
}

ScrapingsModel.model = mongoose.model('Scrapings', ScrapingsSchema)

module.exports = ScrapingsModel
