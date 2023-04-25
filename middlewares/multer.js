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
const storageSomeFile=multer.diskStorage({
    destination:function(req,file,cb){
        fs.mkdirSync("public/uploadSomeFile",{recursive:true});
        cb(null,"public/uploadSomeFile")
    },
    filename:function(req,file,cb){
        if(file.fieldname=="image"){
            console.log(path.extname(file.originalname))
        const ext=path.extname(file.originalname);
        //format filter
        const listOfAcceptedFormats=[".png",".jpg",".jpeg",".webp"];
        const ListOfAcceptedMimtypes=["image/png","image/jpg","image/jpeg","image/webp"];
        
        if(listOfAcceptedFormats.includes(ext)){
            console.log(ext)
        const fileName=Date.now()+ext;
        console.log(fileName)
        cb(null,fileName)
    }else{
        cb(new Error("wrong format"))
    }
}else if(file.fieldname=="pdf"){
    const ext=path.extname(file.originalname);
    //format filter
    const acceptedFormats=".pdf";
    const acceptedMimtypes="file/pdf";
    if(acceptedFormats.includes(ext)){
    const fileName=Date.now()+ext;
    cb(null,fileName)
}else{
    cb(new Error("wrong format"))
}
}
    }
});

//size filter for someFile
const maxsizeimage=1000000;
const maxsizepdf=100000000;
const uploadSomeFiles=multer({
    storage:storageSomeFile,
    limits:{fieldSize:maxsizepdf}
});
//size filter for one file
const maxsize=10000000;
const uploadFile=multer({
    storage:storage,
    limits:{fileSize:maxsize}
});
module.exports={uploadFile,uploadSomeFiles}