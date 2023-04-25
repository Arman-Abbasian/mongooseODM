const multer = require("multer");
const fs=require("fs");
const path = require("path");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        fs.mkdirSync("public/upload",{recursive:true});
        cb(null,"public/upload")
    },
    filename:function(req,file,cb){
        const ext=path.extname(file.originalname);
        const fileName=Date.now()+ext;
        cb(null,fileName)
    }
});
const uploadFile=multer({
    storage:storage
});
module.exports={uploadFile}