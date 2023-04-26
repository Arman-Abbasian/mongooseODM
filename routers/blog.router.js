const {Router}=require("express");
const router=Router();
const {blogController} = require("../controllers/blog.controller");

router.get("/",blogController.getAllBlogs)
router.get("/:id",blogController.getOneBlog)
router.post("/",blogController.createOneBlog)
router.put("/:id",blogController.updateOneBlog)
router.delete("/:id",blogController.deleteOneBlog)

module.exports=router;