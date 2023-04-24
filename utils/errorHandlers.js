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
            message:err?.message || "internal server error"
        }
    })
};

module.exports={
    NotFoundError,
    ErrorHandler
}