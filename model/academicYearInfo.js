const mongoose = require("mongoose");

const academicYearInfoModel = new mongoose.Schema({
    StartYear:{
        type:Number,
        required:true
    },
    StartMonth:{
        type:String,
        required:true
    },
    EndYear:{
        type:Number,
        required:true
    },
    EndMonth:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    }
});

const AcademicYearInfo = mongoose.model("AcademicYearInfo", academicYearInfoModel);
module.exports = AcademicYearInfo; 