const express=require("express");

const { NotFoundError, ErrorHandler } = require("./utils/errorHandlers");
const { BlogModel } = require("./models/blog.model");
const { isValidObjectId } = require("mongoose");


const app=express();
require("./config/mongo.config");
app.use(express.json())
app.use(express.urlencoded({extended:true}))
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
    res.status(201).json({
        statusCode:res.statusCode,
        data:{
            blogs,
            message:"data created successfully"
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
    res.status(201).json({
        statusCode:res.statusCode,
        data:{
            blog,
            message:"data created successfully"
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
        const blog=await BlogModel.deleteOne({_id:id});
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            blog,
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
            blog,
            message:"all blogs deleted successfully"
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
        const newBlog={title,blog}
        const {id}=req.params;
        if(!isValidObjectId(id)) throw({status:401,message:"params is false"})
        const blog=await BlogModel.updateOne({_id:id});
        if(!blog) throw{status:404,message:"not found blog"}
        Object.assign(blog,newBlog)
        await blog.save()
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            blog,
            message:"blog updated successfully"
        }
    })
    } catch (error) {
        next (error)
    }
})
//update one blog with updateOne
app.patch("/blogs/updateOne/:id",async(req,res,next)=>{
    try {
        const {title,text}=req.body;
        const newBlog={title,blog}
        const {id}=req.params;
        if(!isValidObjectId(id)) throw({status:401,message:"params is false"})
        const blog=await BlogModel.updateOne({_id:id});
        if(!blog) throw{status:404,message:"not found blog"}
        const result=await BlogModel.updateOne({_id:id},{$set:newBlog})
        await blog.save()
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            blog,
            message:"blog updated successfully"
        }
    })
    } catch (error) {
        next (error)
    }
})
//update one blog with findeOneAndUpdate
app.patch("/blogs/findeOneAndUpdate/:id",async(req,res,next)=>{
    try {
        const {title,text}=req.body;
        const newBlog={title,blog}
        const {id}=req.params;
        if(!isValidObjectId(id)) throw({status:401,message:"params is false"})
        const blog=await BlogModel.findeOn({_id:id});
        if(!blog) throw{status:404,message:"not found blog"}
        const result=await BlogModel.findOneAndUpdate({_id:id},{$set:newBlog})
        await blog.save()
    res.status(200).json({
        statusCode:res.statusCode,
        data:{
            blog,
            message:"blog updated successfully"
        }
    })
    } catch (error) {
        next (error)
    }
})
app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(3000,()=>{
    console.log("server connected")
})