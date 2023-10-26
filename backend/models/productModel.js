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
    type:mongoose.Schema.Types.ObjectId,
    ref:'category',
    required:true
  },
  photo:{
    type:Buffer,
    contentType:String
  },
  shipping:{
    type:Boolean
  }
},{timestamps:true});

const productModel = mongoose.model("products", productSchema);

module.exports = {
  productModel,
};
