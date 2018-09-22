const mongoose = require('mongoose')
const { Schema } = mongoose

const ScrapingsSchema = new Schema({
  nextMaxId: String,
  topic: {
    type: String,
    index: true
  }
}, {
  timestamps: true
})

module.exports = ScrapingsSchema
