const mongoose = require("mongoose");

const studentAttendanceModel = new mongoose.Schema({
    Date:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    },
    Section:{
        type:String,
        required:true
    },
    Attendance:[{
        RollNo:{
            type:Number,
            required:true
        },
        Status:{
            type:String,
            required:true
        }
    }]
});

const StudentAttendance = mongoose.model("StudentAttendance", studentAttendanceModel);
module.exports = StudentAttendance; 