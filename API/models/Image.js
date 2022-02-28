const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  image: { type: String },
});

module.exports = mongoose.model("Image", ImageSchema);
