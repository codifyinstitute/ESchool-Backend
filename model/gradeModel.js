const mongoose = require('mongoose');

const gradeModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Type:{
        type: String,
        required: true
    }
});

const Grade = mongoose.model("Grade", gradeModel);
module.exports = Grade;