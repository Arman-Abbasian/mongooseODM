class BlogController{
    getAllBlogs(req,res,next){
       try {
        res.status(200).json({
            statusCode:res.statusCode,
            data:{
                data:"all blogs",
                message:"data got successfully"
            }
        })
       } catch (error) {
        next(error)
       }
    };
    getOneBlog(req,res,next){
        res.status(200).json({
            statusCode:res.statusCode,
            data:{
                data:`get ${req.params.id} blogs`,
                message:"data got successfully"
            }
        })
    };
    createOneBlog(req,res,next){
        res.status(200).json({
            statusCode:res.statusCode,
            data:{
                data:`post blog`,
                message:"data post successfully"
            }
        })
    };
    updateOneBlog(req,res,next){
        res.status(200).json({
            statusCode:res.statusCode,
            data:{
                data:`update ${req.params.id} blog`,
                message:"data updated successfully"
            }
        })
    };
    deleteOneBlog(req,res,next){
        res.status(200).json({
            statusCode:res.statusCode,
            data:{
                data:`delete ${req.params.id} blog`,
                message:"data deleted successfully"
            }
        })
    };
}
module.exports={
    blogController:new BlogController()
}