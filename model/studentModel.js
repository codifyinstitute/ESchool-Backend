const mongoose = require('mongoose');

const studentModel = new mongoose.Schema({
    StudentName: {
        type: String,
        required: true
    },
    StudentId:{
        type: String,
        required: true,
        unique:true
    },
    DOB: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Religion: {
        type: String
    },
    BloodGroup: {
        type: String
    },
    Category: {
        type: String
    },
    Height: {
        type: String
    },
    Weight: {
        type: String
    },
    AadharNumber: {
        type: String
    },
    MobileNo: {
        type: String,
        required: true
    },
    House:{
        type:String
    },
    Email:{
        type:String
    },
    Address: {
        type: String
    },
    City: {
        type: String
    },
    Area: {
        type: String
    },
    Pincode: {
        type: String
    },
    AdmissionDate: {
        type: String
    },
    Stream: {
        type: String
    },
    AdmissionInClass: {
        type: String,
        required: true
    },
    Section:{
        type: String
    },
    FeeCategory: {
        type: String,
        required: true
    },
    RollNo: {
        type: String
    },
    LastSchoolAttended: {
        type: String
    },
    IdentificationMark: {
        type: String
    },
    SourceOfAdmission: {
        type: String
    },
    TransportNeeded: {
        type: Boolean
    },
    Route: {
        type: String
    },
    FeeDiscount: {
        type: String
    },
    BankName: {
        type: String
    },
    BankAccountNumber: {
        type: Number
    },
    IFSC: {
        type: String
    },
    Disability: {
        type: Boolean
    },
    DisabilityName: {
        type: String
    },
    Discount: {
        type: String
    },
    Orphan: {
        type: Boolean
    },
    Subject: [String],
    FatherDetail: {
        Name: {
            type: String,
            required: true
        },
        Qualification: {
            type: String
        },
        Occupation: {
            type: String
        },
        AnnualIncome: {
            type: String
        },
        AadharNumber: {
            type: String
        },
        MobileNo: {
            type: String,
            required: true
        },
        EmailId: {
            type: String
        },
    },
    MotherDetails: {
        Name: {
            type: String,
            required: true
        },
        Qualification: {
            type: String
        },
        Occupation: {
            type: String
        },
        AnnualIncome: {
            type: String
        },
        AadharNumber: {
            type: String
        },
        MobileNo: {
            type: String,
            required: true
        },
        EmailId: {
            type: String
        }
    },
    EmergencyContact:{
        Name: {
            type: String
        },
        Relation: {
            type: String
        },
        MobileNo: {
            type: String
        },
    },
    Document:{
        StudentPhoto: {
            type: String,
        },
        Birth:{
            type: String,
        },
        Leaving: {
            type: String,
        },
        FatherPhoto: {
            type: String
        },
        MotherPhoto: {
            type: String
        }
    }   
});

const Student = mongoose.model('Student', studentModel);
module.exports = Student;