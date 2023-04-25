const { Schema, model } = require("mongoose");

const SignupSchema=new Schema({
    firstName:{type:String,required:true,trim:true,minLength:3,maxLength:20},
    lastName:{type:String,required:true,trim:true,minLength:3,maxLength:50},
    age:{type:Number},
    mobile:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String}
},{
    timestamps:true
}
);
const SignupModel=model("singup",SignupSchema);
module.exports={SignupModel}