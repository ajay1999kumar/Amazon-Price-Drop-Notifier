const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  productUrl: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model("Tracks", trackSchema);