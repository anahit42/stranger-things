const mongoose = require('mongoose')
const { Schema } = mongoose

const ScrapingsSchema = new Schema({
  nextMaxId: String,
  topic: String
}, {
  timestamps: true
})

module.exports = ScrapingsSchema
