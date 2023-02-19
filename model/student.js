const mongoose = require('mongoose');

var scheme = new mongoose.Schema({
   
    name : {
        type: String,
        unique : false,
        required : true
    },
    email : {
        type: String,
        unique : false,
        required : true
    },
    mobile : {
        type: String,
        unique : false,
        required : true
    },
    roll : {
        type: String,
        unique : false,
        required : true
    },
    gender :
    {
        type: String
    },
    image_file :
    {
        type: String,
        unique : false
    }
});

var Student = mongoose.model("student_records", scheme);

module.exports = Student;