const { checkValidationWithExpressValidation } = require("./checkValidationWithExpressValidation");

const NotFoundError=(req,res,next)=>{
    res.status(404).json({
        statusCode:res.statusCode,
        error:{
            type:"not found",
            message:`not found ${req.url} route`
        }
    })
};

const ErrorHandler=(err,req,res,next)=>{
    console.log("error handler")
    res.json({
        statusCode:err?.status || "internal server error",
        error:{
            error:err.validator,
            message:err?.message?.replace(/[\'\"\\]*/g,'') || "internal server error",
            invalidParms:checkValidationWithExpressValidation(err)
        }
    })
};

module.exports={
    NotFoundError,
    ErrorHandler
}