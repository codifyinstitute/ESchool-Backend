const mongoose = require("mongoose");

const schoolSetupModel = new mongoose.Schema({
    SchoolName: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    PhoneNo: {
        type: String,
        required: true
    },
    Website: {
        type: String,
        required: true
    },
    SchoolLogo: {
        type: String,
        required: true
    },
    EmailId: {
        type: String,
        required: true
    },
    StartTime:{
        type: String,
        required: true
    },
    EndTime:{
        type: String,
        required: true
    },
    SchoolStamp:{
        type: String,
        required: true
    },
    SalaryDate:{
        type: String,
        required: true
    },
    WeeklyOff:{
        type: String,
        required: true
    },
    PrincipleSign:{
        type: String,
        required: true
    },
    SchoolSign:{
        type: String,
        required: true
    },
    AffiliationNo:{
        type: String,
        required: true
    },
    UDISECode:{
        type: String,
        required: true
    }
});

const SchoolSetup = mongoose.model("SchoolSetup", schoolSetupModel);
module.exports = SchoolSetup;