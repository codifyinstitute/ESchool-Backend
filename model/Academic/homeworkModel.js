const mongoose = require('mongoose');

const homeworkModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Count: {
        type: Number,
        required: true
    }
});

const Homework = mongoose.model("Homework", homeworkModel);
module.exports = Homework;