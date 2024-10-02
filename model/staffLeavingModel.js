const mongoose = require("mongoose");

const staffLeavingModel = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    Purpose:{
        type:String,
        required:true
    },
    WillBack:{
        type:Boolean
    },
    TimeOfBack:{
        type:String
    },
    VehicleUsed:{
        type:String
    },
    TimeOfLeaving:{
        type:String
    },
    ApprovedBy:{
        type:String
    }

});
const StaffLeaving = mongoose.model("StaffLeaving", staffLeavingModel);
module.exports = StaffLeaving;