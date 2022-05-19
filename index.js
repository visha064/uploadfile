const express = require("express");
const multer = require("multer");
const ejs = require('ejs');
const { param } = require("express/lib/request");
var str1=""; 
const app = express();
app.set('view engine','ejs');

const str = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images');
    },
    
        filename:function(req,file,cb){
            str1=file.originalname;
            console.log("this is the String'"+str1+"'");
            cb(null,file.originalname);
        }
    });

const upload = multer({storage:str});    
app.get("/upload",function(req,res){
   res.render('upload.ejs');
});
app.post("/upload",upload.single('avatar'),function(req,res){
    res.send('Image uploaded');
});
app.get("/:file",(req,res)=>{
    console.log("working "+" "+req.params['file']);
    res.sendFile(__dirname+'/images/'+req.params['file']);
});

app.listen(3000,function(){
    console.log("listening on port 3000");
});