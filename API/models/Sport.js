const mongoose = require('mongoose');

const SportSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  url_image: { type: String, required: true },
  url_wiki: { type: String, required: true },
});

module.exports = mongoose.model('Sport', SportSchema);
