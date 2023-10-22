const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category:{
    type:mongoose.ObjectId,
    ref:'category',
    required:true
  },
  photo:{
    data:Buffer,
    required:true,
    contentType:String
  },
  shipping:{
    type:Boolean
  }
},{timestamp:true});

const productModel = mongoose.model("products", productSchema);

module.exports = {
  productModel,
};
