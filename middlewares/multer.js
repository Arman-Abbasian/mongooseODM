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
        //format filter
        const listOfAcceptedFormats=[".png",".jpg",".jpeg",".webp"];
        const ListOfAcceptedMimtypes=["image/png","image/jpg","image/jpeg","image/webp"];
        if(listOfAcceptedFormats.includes(ext)){
        const fileName=Date.now()+ext;
        cb(null,fileName)
    }else{
        cb(new Error("wrong format"))
    }
    }
});
//size filter
const maxsize=1000000;
const uploadFile=multer({
    storage:storage,
    limits:{fileSize:maxsize}
});
module.exports={uploadFile}