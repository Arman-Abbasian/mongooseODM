const {default:mongoose}=require("mongoose");
const DB_URL="mongodb://127.0.0.1:27017/mongooseTest"
mongoose.set("strictQuery",true);
mongoose.connect(DB_URL,(err)=>{
    console.log(err?err.message:"mongoose connected to DB")
})