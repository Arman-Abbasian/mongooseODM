const {Router}=require("express");
const router=Router();
const BlogRouter=require("./blog.router")
router.use("/blogs",BlogRouter)
module.exports=router;