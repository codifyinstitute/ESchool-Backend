const mongoose = require("mongoose");

const classModel = new mongoose.Schema({
    ClassId:{
        type: String,
        required: true,
        unique:true
    },
    AcademicYear:{
        type:String,
        required:true
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
    },
    Subjects:[{
        Subject:{
            type:String,
            required:true
        },
        Syllabus:[{
            Title:{
                type:String
            },
            Topics:[String]
        }],
        Status:{
            type:String,
            required:true
        }
    }]
});

const Class = mongoose.model('Class', classModel);
module.exports = Class;