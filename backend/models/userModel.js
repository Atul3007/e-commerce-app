const mongoose =require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }, address:{
        type:String,
        required:true
    }, role:{
        type:String,
        default:0
    },question:{
        type:String,
        required:true
    }
},{timestamps:true})

const userModel=mongoose.model('users',userSchema);

module.exports={userModel};