const mongoose = require("mongoose");

const classModel = new mongoose.Schema({
    ClassId:{
        type: String,
        required: true,
        unique:true
    },
    Class:{
        type:String,
        required:true
    },
    Section:{
        type:String,
        required:true
    },
    MaxCount:{
        type:Number,
        required:true
    }
});

const Class = mongoose.model("Class", classModel);
module.exports = Class;