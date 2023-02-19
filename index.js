const express = require('express')
const app = express();
const hbs = require('hbs'); 
const path = require('path');
const bodyParser = require('body-parser'); 
const fs = require('fs');
const multer = require('multer');


const upload_file = require('./helpers/image_helper.js') // It has Code for Image 

//const image_file = require('./helpers/file_helper.js');

app.use(bodyParser.urlencoded({ extended: true })); 

require("./db/conn");
const Student = require('./model/student'); 

const port = process.env.port || 3000;

app.use(express.static('./assets/images')); 
//app.use(express.static('./assets/files'));  

app.set('view engine','hbs');
app.set("views",path.join(__dirname,"./views/layouts"));

// Dsiplay Data 

var display = Student.find({});

app.get('/',function(req,res,next){ 
    display.exec(function(err,data){
        if(err)throw err;
        console.log(data)
         res.render('index',{title:'Employee Record',records:data});
    });
}); 

// Insert Data


app.post('/insert',upload_file.single('image'),function (req,res){

    
    //fileSave();
    console.log(req.file);
    var data = new Student();

    data.name = req.body.name;
    data.email = req.body.email;
    data.mobile = req.body.mobile;
    data.roll = req.body.roll;
    data.gender = req.body.gender;
    data.image_file = req.file.filename;
    var save = data.save();
      
    if (save)
       res.redirect('/');
    else
    console.log('Error during record insertion : ' + err);  
   });

app.get('/:id',function(req,res){
   Student.findByIdAndRemove(req.params.id,(err,doc)=>{
      if (!err)
        {
        res.redirect('/');
        }
      else 
        {
        console.log('Failed to Delete Course Details: ' + err);
        }
   });
}); 


// To show select data on update element on edit.hbs page

app.get('/edit/:id', (req, res) => {
   Student.findById({_id:req.params.id},req.body, { new: true },(err,docs)=>{
      if(err)
      {
          console.log('Cant retreive date and edit');
      }
      else
      {
          res.render('edit',{club:docs});
      }
   })
});

// Now Update Data here using ID

app.post('/update/:id',(req,res)=>{
     Student.findByIdAndUpdate({_id:req.params.id},req.body,(err,docs)=>{
         if(err)
         {
             console.log('Error');
         }  
         else
         {  
             res.redirect('/index');
         }
     });
});

app.listen(port,()=>{
    console.log('Listening on Port:',port);
});







