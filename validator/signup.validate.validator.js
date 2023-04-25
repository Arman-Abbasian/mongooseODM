const Schema  = require("validate");


const SignupSchemaWithValidate=new Schema({
    firstName:{type:String,required:true,trim:true,minLength:3,maxLength:20},
    lastName:{type:String,required:true,trim:true,minLength:3,maxLength:50},
    age:{type:Number},
    mobile:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String}
});
module.exports={
    SignupSchemaWithValidate
}