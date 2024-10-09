const mongoose = require("mongoose");

const timeTableModel = new mongoose.Schema({
    ClassID: {
        type: String,
        required: true,
        unique: true
    },
    Class: {
        type: String,
        required: true
    },
    Section: {
        type: String,
        required: true
    },
    Days: [{
        Day: {
            type: String,
            required: true
        },
        Lectures: [{
            Period: {
                type: String,
                required: true
            },
            Subject: {
                type: String,
                required: true
            },
            TeacherId: {
                type: String,
                required: true
            },
            TeacherName: {
                type: String,
                required: true
            },
        }]
    }]
})

const TimeTable = mongoose.model("TimeTable", timeTableModel);
module.exports = TimeTable;
