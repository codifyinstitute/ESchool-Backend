const moment = require('moment-timezone');
const ExamStatic = require('../model/examStaticsmodel');
const Academic = require('../model/Academic/academicYearModel');       
const Counter = require('../model/counterModel');

// Add a new exam
exports.addExam = async (req, res) => {
    const {
        ExamName,
        TheoryMaxMarks,
        TheorypassingMarks,
        Time,
        PracticalMarks,
        Status
    } = req.body;

    let id;
    const year = moment().format('YYYY');
    try {
        const academicYear = await Academic.findOne({ Status: true });
        let counter = await Counter.findOne({ Title: `EXM-${year}` });

        if (!counter) {
            counter = new Counter({ Title: `EXM-${year}`, Count: 1 });
        } else {
            counter.Count += 1;
        }

        id = `EXM${year}${counter.Count.toString().padStart(4, '0')}`;
        const exam = new ExamStatic({
            ExamId: id,
            AcademicYear: academicYear.Year,
            ExamName,
            TheoryMaxMarks,
            TheorypassingMarks,
            Time,
            BluePrint:[],
            PracticalMarks,
            TotalMarks: Number(TheoryMaxMarks) + Number(PracticalMarks), // Adjusted for TotalMarks
            Status
        });
        await exam.save();
        await counter.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Get all exams
exports.getAllExams = async (req, res) => {
    try {
        const exams = await ExamStatic.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get exam by ExamId
exports.getExamById = async (req, res) => {
    try {
        const exam = await ExamStatic.findOne({ ExamId: req.params.examId });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an exam
exports.updateExam = async (req, res) => {
    const {
        ExamName,
        TheoryMaxMarks,
        TheorypassingMarks,
        Time,
        BluePrint,
        PracticalMarks,
        Status
    } = req.body;

    try {
        const exam = await ExamStatic.findOneAndUpdate(
            { ExamId: req.params.examId },
            {
                ExamName,
                TheoryMaxMarks,
                TheorypassingMarks,
                Time,
                BluePrint,
                PracticalMarks,
                TotalMarks: Number(TheoryMaxMarks) + Number(PracticalMarks),
                Status
            },
            { new: true, runValidators: true }
        );
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Delete an exam
exports.deleteExam = async (req, res) => {
    try {
        const exam = await ExamStatic.findOneAndDelete({ ExamId: req.params.examId });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
