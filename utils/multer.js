const express = require('express')
const multer = require('multer');
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        // destination: (req, file, cb)=>{
        //     cb(null, 'tmp/uploads') 
        // },

        // filename : (req, file, cb) => {
        //     const uniqueName = Date.now() +'-'+ Math.round((Math.random()*1E9))
        //     cb(null, file.fieldname+'-'+uniqueName)
        // }
    }),
    filefilter: (req, file, cb) => {
        let extName = path.extname(file.originalname);
        if(extName !== ".jpg" && extName !== ".img" && extName !== ".jpeg" && extName !==".png"){
            cb(new error("File type not supported"), false);
            return
        }
        cb(null, true);
    }
})

module.exports = upload