const mongoose = require("mongoose");

const studentAttendanceModel = new mongoose.Schema({
    Date:{
        
    }
});

const StudentAttendance = mongoose.model("StudentAttendance", studentAttendanceModel);
module.exports = StudentAttendance; 