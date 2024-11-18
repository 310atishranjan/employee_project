const mongoose=require("mongoose");

const mongooseSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})
const admin=mongoose.model('admin',mongooseSchema);
module.exports=admin;