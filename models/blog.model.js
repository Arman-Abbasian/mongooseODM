const { Schema, model } = require("mongoose");

const BlogSchema=new Schema({
    title:{type:String,required:true,trim:true,minLength:3,maxLength:20},
    text:{type:String,required:true,trim:true,minLength:3},
    show:{type:Boolean,default:false},
    likes:{type:[String]},
    bookmarks:{type:[String]},
},{
    timestamps:true
}
);
const BlogModel=model("blog",BlogSchema);
module.exports={BlogModel}