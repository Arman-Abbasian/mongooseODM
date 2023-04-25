const { validationResult } = require("express-validator")

const checkValidation=(req,res,next)=>{
const error=validationResult(req);
let obj={};
console.log(error.errors)
error?.errors?.forEach(err => {
    obj[err.path]=err.msg
});
console.log(obj)
if(Object.keys(obj).length>0){
    throw ({status:400,message:"validation error",validator:obj})
}else{
    next()
}
}
module.exports={
    checkValidation
}