const mongoose = require("mongoose");

const enquiryModel = new mongoose.Schema({
    RegistrationNo:{
        type:String,
        required:true,
        unique:true,
    },
    StudentName:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true,
    },
    MobileNo:{
        type:String,
        required:true,
    },
    AdmissionClass:{
        type:String,
        required:true
    },
    FatherName:{
        type:String,
        required:true
    },
    MotherName:{
        type:String
    },
    Address:{
        type:String
    },
    Message:{
        type:String
    },
    Refer:{
        type:String
    },
    Requirement:{
        type:String
    },
    Status:{
        type:String,
        default:"Open",
        enum:["Open","Follow up","Hot"],
        required:true
    }
});

const Enquiry = ("Enquiry", enquiryModel);
module.exports = Enquiry;