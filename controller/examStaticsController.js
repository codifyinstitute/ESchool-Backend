const ExamStatic = require('../model/examStaticsmodel');
const Academic = require('../model/Academic/academicYearModel');

// Add a new exam
exports.addExam = async (req, res) => {
    const {
        ExamId,
        ExamName,
        MaxMarks,
        passingMarks,
        Time,
        BluePrint,
        Status
    } = req.body;

    try {
        const exam = new ExamStatic({
            ExamId,
            ExamName,
            MaxMarks,
            passingMarks,
            Time,
            BluePrint,
            Status
        });
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        ExamId,
        ExamName,
        MaxMarks,
        passingMarks,
        Time,
        BluePrint,
        Status
    } = req.body;

    try {
        const exam = await ExamStatic.findOneAndUpdate(
            { ExamId: req.params.examId },
            {
                ExamName,
                MaxMarks,
                passingMarks,
                Time,
                BluePrint,
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
