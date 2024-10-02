const mongoose = require("mongoose");

const electricityFrontOfficeModel = new mongoose.Schema({
    CompliantNo:{
        type:String,
        required:true
    },
    Source:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    AddComplaint:{
        type:String,
        required:true
    },
    ComplaintFor:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    }
});
const ElectricityFrontOffice = mongoose.model("ElectricityFrontOffice", electricityFrontOfficeModel);
module.exports = ElectricityFrontOffice;