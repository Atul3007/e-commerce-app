const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: [{ type: mongoose.ObjectId, ref: "products" }],
  payment: {},
  buyer: { type: mongoose.ObjectId, ref: "users" },
  status:{
    type:String,
    default:"Not Process",
    enum:["Not process","Processing","Shipped","Not Delivered","Delivered","Cancelled"]
  }
},{timestamps:true});

const orderModel = mongoose.model("orders", orderSchema);

module.exports = {
  orderModel,
};
