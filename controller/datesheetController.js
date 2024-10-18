const Datesheet = require('../model/datasheetModel'); // Adjust the path according to your project structure

// GET all datesheets
const getAllDatesheets = async (req, res) => {
    try {
        const datesheets = await Datesheet.find();
        res.status(200).json(datesheets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a datesheet by ID
const getDatesheetById = async (req, res) => {
    try {
        const datesheet = await Datesheet.findById(req.params.id);
        if (!datesheet) {
            return res.status(404).json({ message: "Datesheet not found" });
        }
        res.status(200).json(datesheet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new datesheet
const createDatesheet = async (req, res) => {
    const { Exam, Date, Class, Subject, TypeOfExam } = req.body;
    const newDatesheet = new Datesheet({ Exam, Date, Class, Subject, TypeOfExam });

    try {
        const savedDatesheet = await newDatesheet.save();
        res.status(201).json(savedDatesheet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT (update) a datesheet by ID
const updateDatesheet = async (req, res) => {
    try {
        const updatedDatesheet = await Datesheet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDatesheet) {
            return res.status(404).json({ message: "Datesheet not found" });
        }
        res.status(200).json(updatedDatesheet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a datesheet by ID
const deleteDatesheet = async (req, res) => {
    try {
        const deletedDatesheet = await Datesheet.findByIdAndDelete(req.params.id);
        if (!deletedDatesheet) {
            return res.status(404).json({ message: "Datesheet not found" });
        }
        res.status(200).json({ message: "Datesheet deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDatesheets,
    getDatesheetById,
    createDatesheet,
    updateDatesheet,
    deleteDatesheet
};
