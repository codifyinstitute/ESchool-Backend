const mongoose = require('mongoose');

const staffModel = new mongoose.Schema({
    EmployeeId: {
        type: String,
        required: true,
        unique: true
    },
    Role: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    DOJ: {
        type: String,
        required: true
    },
    Category: {
        type: String
    },
    LanguageKnown: [String],
    Nationality: {
        type: String,
        required: true
    },
    MobileNo: {
        type: String,
        required: true
    },
    Salary: {
        type: String,
        required: true
    },
    BloodGroup: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    JobGrade: {
        type: String,
        required: true
    },
    Experience: {
        type: String,
        required: true
    },
    LastSchool: {
        type: String,
        required: true
    },
    ReferredName: {
        type: String,
        required: true
    },
    ReferredContact: {
        type: String,
        required: true
    },
    Transport: {
        type: Boolean
    },
    Route: {
        type: String
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    Pincode: {
        type: String,
        required: true
    },
    Religion: {
        type: String,
        required: true
    },
    MaritalStatus: {
        type: String,
        required: true
    },
    FamilyDetail: {
        MiddleName: {
            type: String,
            required: true
        },
        MobileNo: {
            type: String,
            required: true
        },
        EmailId: {
            type: String,
            required: true
        }
    },
    EmergencyContact: {
        Name: {
            type: String,
            required: true
        },
        Relation: {
            type: String,
            required: true
        },
        MobileNo: {
            type: String,
            required: true
        },
    },
    Documents: {
        Photo: {
            type: String
        },
        QualificationCertificate: {
            type: String
        },
        ExperienceLetter: {
            type: String
        }
    },
    TeachingSubject:[String],
    Assign:[{
        Class:{
            type: String
        },
        Subject:{
            type: String
        }
    }],
    AadharNo:{
        type:String,
        required:true
    },
    PanNo:{
        type: String,
        required: true
    },
    PFNo:{
        type: String
    },
    AccountNumber: {
        type: String
    },
    IFSCCode: {
        type: String
    },
    HomeWorkPublish: {
        type: Boolean
    },
    ClassTeacher: {
        type: Boolean
    },
    Status: {
        type: String,
        required: true
    }
});

const Staff = mongoose.model("Staff", staffModel);
module.exports = Staff;