const mongoose = require("mongoose");

const examStaticsModel = new mongoose.Schema({
    ExamId: { type: String, required: true, unique: true },
    AcademicYear: { type: String, required: true, unique: true },
    ExamName: { type: String, required: true },
    Theory: {
        MaxMarks: { type: Number, required: true },
        passingMarks: { type: Number, required: true },
        Time: { type: String, required: true },
        BluePrint: [{
            Section: { type: String },
            QuestionNo: { type: Number },
            Marks: { type: Number },
            TotalMarks: { type: Number },
        }],
    },
    Practical: {
        MaxMarks: { type: Number},
        passingMarks: { type: Number},
        Time: { type: String},
        BluePrint: [{
            Section: { type: String },
            QuestionNo: { type: Number },
            Marks: { type: Number },
            TotalMarks: { type: Number },
        }]
    },
    TotalMarks: { type: Number },
    Status: { type: String, required: true }
});

const ExamStatic = mongoose.model('ExamStatic', examStaticsModel);
module.exports = ExamStatic;