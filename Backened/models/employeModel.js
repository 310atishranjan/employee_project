const mongoose=require("mongoose");

const mongooseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    img:{
        type:String,
        // required:true
    }
})
const employee=mongoose.model('employeeModel',mongooseSchema);
module.exports=employee;