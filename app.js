const express=require("express");
const multer=require("multer")

const { NotFoundError, ErrorHandler } = require("./utils/errorHandlers");
const { BlogModel } = require("./models/blog.model");
const { isValidObjectId } = require("mongoose");
const { signupValidator } = require("./validator/signUp.validator");
const { checkValidation } = require("./utils/checkValidation");
const { SignupModel } = require("./models/signup.model");
const { signupValidation } = require("./validator/signup.expressValidation.validator");
const { validate } = require("express-validation");
const { signupValidationWithJoi } = require("./validator/signup.joi.validator");
const { SignupSchemaWithValidate } = require("./validator/signup.validate.validator");
const { uploadFile, uploadSomeFiles } = require("./middlewares/multer");


const app=express();
require("./config/mongo.config");
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",(req,res)=>{
    res.send("ok")
})
//post data with create method
app.post("/blog/create",async(req,res,next)=>{
    try {
        const {title,text}=req.body;
        if(!title || !text) throw {status:400,message:"title or text not sent"}
        await BlogModel.create({title,text})
        res.status(201).json({
            statusCode:res.statusCode,
            data:{
                message:"data created successfully"
            }
        })
    } catch (error) {
        next (error)
    }
})
//post data with new method
app.post("/blog/new",async(req,res,next)=>{
    try {
        const {title,text}=req.body;
        if(!title || !text) throw {status:400,message:"title or text not sent"}
        const result=new BlogModel({title,text})
        await result.save()
        res.status(201).json({
            statusCode:res.statusCode,
            data:{
                message:"data created successfully"
            }
        })
    } catch (error) {
        next (error)
    }
})
//post some datas 
app.post("/blog/insertMany",async(req,res,next)=>{
    try {
        const result=await BlogModel.insertMany([
            {title:"Arman",text:"the best"},
            {title:"javad",text:"the best"},
            {title:"Ali",text:"the best"}
        ])
        res.status(201).json({
            statusCode:res.statusCode,
            data:{
                message:"data created successfully"
            }
        })
    } catch (error) {
        next (error)
    }
})
//get all blogs
app.get("/blogs",async(req,res,next)=>{
    try {
        const blogs=await BlogModel.find();
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            message:"all blogs fetched successfully",
            blogs
        }
    })
    } catch (error) {
        next (error)
    }
});
//get one blog
app.get("/blogs/:id",async(req,res,next)=>{
    try {
        const {id}=req.params;
        if(!isValidObjectId(id)) throw({status:401,message:"params is false"})
        const blog=await BlogModel.findOne({_id:id});
        if(!blog) throw ({status:404,message:"blog not found"})
    res.status(201).json({
        statusCode:res.statusCode,
        data:{
            message:"data created successfully",
            blog
        }
    })
    } catch (error) {
        next (error)
    }
})
//delete one blog
app.delete("/blogs/:id",async(req,res,next)=>{
    try {
        const {id}=req.params;
        if(!isValidObjectId(id)) throw({status:401,message:"params is false"})
        const blog=await BlogModel.findOne({_id:id});
        if(!blog) throw ({status:404,message:"blog not found"})
        await BlogModel.deleteOne({_id:id});
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            message:"blog deleted successfully"
        }
    })
    } catch (error) {
        next (error)
    }
})
//delete all blogs
app.delete("/blogs",async(req,res,next)=>{
    try {
        const blog=await BlogModel.deleteMany();
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            message:"all blogs deleted successfully",
            blog
        }
    })
    } catch (error) {
        next (error)
    }
})
//update one blog with Object.assaign
app.put("/blogs/objectAssign/:id",async(req,res,next)=>{
    try {
        const {title,text}=req.body;
        const updatedBlog={title,text}
        const {id}=req.params;
        if(!isValidObjectId(id)) throw({status:401,message:"params is false"});
        const blog=await BlogModel.findOne({_id:id});
        if(!blog) throw{status:404,message:"not found blog"}
        Object.assign(blog,updatedBlog)
        await blog.save()
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            message:"blog updated successfully"
        }
    })
    } catch (error) {
        next (error)
    }
})
//update one blog with updateOne
app.put("/blogs/updateOne/:id",async(req,res,next)=>{
    try {
        const {title,text}=req.body;
        const newBlog={title,text}
        const {id}=req.params;
        if(!isValidObjectId(id)) throw({status:401,message:"params is false"})
        const blog=await BlogModel.findOne({_id:id});
        if(!blog) throw{status:404,message:"not found blog"}
        const updatedblog=await BlogModel.updateOne({_id:id},{$set:newBlog});
        if(updatedblog.modifiedCount==0) throw{status:404,message:"not updated"}
        
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            updatedblog,
            message:"blog updated successfully"
        }
    })
    } catch (error) {
        next (error)
    }
})
//update one blog with findeOneAndUpdate
app.put("/blogs/findeOneAndUpdate/:id",async(req,res,next)=>{
    try {
        const {title,text}=req.body;
        const newBlog={title,text}
        const {id}=req.params;
        if(!isValidObjectId(id)) throw({status:401,message:"params is false"});
        const blog=await BlogModel.findOne({_id:id});
        if(!blog) throw{status:404,message:"not found blog"}
        const result=await BlogModel.findOneAndUpdate({_id:id},{$set:newBlog})
        if(!result) throw{status:404,message:"not updated"}
        await blog.save()
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            result,
            message:"blog updated successfully"
        }
    })
    } catch (error) {
        next (error)
    }
})
//validate the body data with express-validator package
app.post("/expressValidator/signup",signupValidator(),checkValidation,async(req,res,next)=>{
   try {
    const {firstName,lastName,age,mobile,email,password}=req.body;
    await SignupModel.create({firstName,lastName,age,mobile,email,password})
    res.status(201).json({
        statusCode:res.statusCode,
        data:{
            message:"data created successfully"
        }
    })
   } catch (error) {
    next(error)
   }
});
//validate the body data with express-validation package
app.post("/expressValidation/signup",validate(signupValidation),async(req,res,next)=>{
    try {
     const {firstName,lastName,age,mobile,email,password}=req.body;
     await SignupModel.create({firstName,lastName,age,mobile,email,password})
     res.status(201).json({
         statusCode:res.statusCode,
         data:{
             message:"data created successfully"
         }
     })
    } catch (error) {
     next(error)
    }
 });
 //validate the body data with joi package
app.post("/joi/signup",async(req,res,next)=>{
    try {
        await signupValidationWithJoi.validateAsync(req.body)
     const {firstName,lastName,age,mobile,email,password}=req.body;
     await SignupModel.create({firstName,lastName,age,mobile,email,password})
     res.status(201).json({
         statusCode:res.statusCode,
         data:{
             message:"data created successfully"
         }
     })
    } catch (error) {
     next(error)
    }
 });
  //validate the body data with validate package
app.post("/validate/signup",async(req,res,next)=>{
    try {
      const [error]=SignupSchemaWithValidate.validate(req.body)
      console.log(error)
      if(error) throw error
     const {firstName,lastName,age,mobile,email,password}=req.body;
     await SignupModel.create({firstName,lastName,age,mobile,email,password})
     res.status(201).json({
         statusCode:res.statusCode,
         data:{
             message:"data created successfully"
         }
     })
    } catch (error) {
     next(error)
    }
 });
  //send one file with multer 
 app.post("/multer",uploadFile.single("image"),async(req,res,next)=>{
    try {
      console.log(req.file)
     res.status(201).json({
         statusCode:res.statusCode,
         data:{
            body:req.body,
             message:"data sent successfully"
         }
     })
    } catch (error) {
     next(error)
    }
 });
 //send some file with same fieldname with multer 
 app.post("/multer/array",uploadFile.array("image"),async(req,res,next)=>{
    try {
      console.log(req.file)
     res.status(201).json({
         statusCode:res.statusCode,
         data:{
            body:req.body,
            file:req.files,
             message:"data sent successfully"
         }
     })
    } catch (error) {
     next(error)
    }
 });
  //send some file with diffrent fieldname with multer 
  app.post("/multer/someFiles",uploadSomeFiles.fields([{name:"image",maxCount:1},{name:"pdf",maxCount:1}]),async(req,res,next)=>{
    try {
      console.log(req.file)
     res.status(201).json({
         statusCode:res.statusCode,
         data:{
            body:req.body,
            file:req.files,
             message:"data sent successfully"
         }
     })
    } catch (error) {
     next(error)
    }
 });
app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(3000,()=>{
    console.log("server connected")
})