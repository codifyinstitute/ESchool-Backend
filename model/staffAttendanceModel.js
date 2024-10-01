const mongoose = require("mongoose");

const staffAttendanceModel = new mongoose.Schema({
    Date:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true
    },
    Attendance:[{
        EmployeeId:{
            type:String,
            required:true
        },
        Status:{
            type:String,
            required:true
        },
        
    }]
});

const StaffAttendance = mongoose.model("StaffAttendance",staffAttendanceModel);
module.exports = StaffAttendance;