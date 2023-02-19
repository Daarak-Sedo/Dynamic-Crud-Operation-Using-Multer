const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Bhuwan:fake2fake@cluster0.b8ptwn6.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
  }).then(()=>{
     console.log("Run Succefully");
  }).catch(()=>{
    console.log("Error in the code");    
  })

  
