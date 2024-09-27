const mongoose = require('mongoose');

const studentModel = new mongoose.Schema({
    Studentname: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    BloodGroup: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Height: {
        type: String,
        required: true
    },
    Weight: {
        type: String,
        required: true
    },
    AadharNumber: {
        type: String,
        required: true
    },
    MobileNo: {
        type: String,
        required: true
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
    AdmissionDete: {
        type: String,
        required: true
    },
    Stream: {
        type: String,
        required: true
    },
    AdmissionInClass: {
        type: String,
        required: true
    },
    FeeCategory: {
        type: String,
        required: true
    },
    RollNo: {
        type: String,
        required: true
    },
    LastSchoolAttended: {
        type: String,
        required: true
    },
    IdentificationMark: {
        type: String,
        required: true
    },
    SourseOfAdmission: {
        type: String,
        required: true
    },
    TransportNeeded: {
        type: Boolean,
        default: false
    },
    Route: {
        type: String,
        required: true
    },
    FeeDiscount: {
        type: String,
        required: true
    },
    BankName: {
        type: String,
        required: true
    },
    BankAccountNumber: {
        type: Number,
        required: true
    },
    IFSC: {
        type: String,
        required: true
    },
    Disability: {
        type: String,
        required: true
    },
    Discount: {
        type: String,
        required: true
    },
    Orphan: {
        type: String,
        required: true
    },
    Subject: [String],
    FatherDetail: {
        Name: {
            type: String,
            required: true
        },
        Qualification: {
            type: String,
            required: true
        },
        Occupation: {
            type: String,
            required: true
        },
        AnnualIncome: {
            type: String,
            required: true
        },
        AadharNumber: {
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
        },
        Photo: {
            type: String,
            required: true
        }
    },
    MotherDetails: {
        Name: {
            type: String,
            required: true
        },
        Qualification: {
            type: String,
            required: true
        },
        Occupation: {
            type: String,
            required: true
        },
        AnnualIncome: {
            type: String,
            required: true
        },
        AadharNumber: {
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
        },
        Photo: {
            type: String,
            required: true
        }
    },
    EmergencyContact:{
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
    Document:{
        Photo: {
            type: String,
            required: true
        },
        Birth:{
            type: String,
            required: true
        },
        Leaving: {
            type: String,
            required: true
        }
    }   
});

const Student = mongoose.model('Student', studentModel);
module.exports = Student;