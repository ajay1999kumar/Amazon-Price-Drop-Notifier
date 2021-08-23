const mongoose = require("mongoose");

const ProductSchema =  mongoose.Schema({
  product_id: {
    type: String,
  },
  product_asin: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  product_link: {
    type: String,
  },
  title: {
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
  ispresent:{
    type: Boolean,
  }
});

module.exports = mongoose.model("product", ProductSchema);