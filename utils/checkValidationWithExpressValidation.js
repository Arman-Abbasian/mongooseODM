const checkValidationWithExpressValidation=(error)=>{
const {details}=error;
console.log("error",details)
let invalidParams={};
if(details?.body?.length>0){
    for(const item of details.body){
        console.log(item.context)
        invalidParams[item.context.key]=item.message?.replace(/[\'\"\\]*/g,'')
    }
    return invalidParams
}
return invalidParams
}
module.exports={
    checkValidationWithExpressValidation
}
