const moment = require('moment-timezone');
const ClassModel = require('../../model/Admin/classModel');
const Academic = require('../../model/Academic/academicYearModel')
const Counter = require('../../model/counterModel');

// Add a new class
const addClass = async (req, res) => {
    var id;
    const year = moment().format('YYYY');
    const month = moment().format('MM');
    try {
        const academicYear = await Academic.findOne({ Status: true });

        if (!academicYear) {
            return res.status(400).json({ message: "Please Select Academic Year First" });
        }

        let counter = await Counter.findOne({ Title: `CLS-${year}${month}` });

        if (!counter) {
            counter = new Counter({ Title: `CLS-${year}${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }


        id = `CLS${year}${month}${counter.Count.toString().padStart(4, '0')}`;

        const { Class, Section, MaxCount } = req.body;
        const newClass = new ClassModel({ ClassId, AcademicYear: academicYear.Year, Class, Section, MaxCount });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all classes
const getAllClasses = async (req, res) => {
    try {
        const classes = await ClassModel.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get class by ClassId
const getClassById = async (req, res) => {
    try {
        const classData = await ClassModel.findOne({ ClassId: req.params.classId });
        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json(classData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update class by ClassId
const updateClass = async (req, res) => {
    try {
        const { ClassId, Class, Section, MaxCount } = req.body;
        const updatedClass = await ClassModel.findOneAndUpdate(
            { ClassId: req.params.classId },
            { ClassId, Class, Section, MaxCount },
            { new: true }
        );
        if (!updatedClass) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete class by ClassId
const deleteClass = async (req, res) => {
    try {
        const deletedClass = await ClassModel.findOneAndDelete({ ClassId: req.params.classId });
        if (!deletedClass) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addClass,
    getAllClasses,
    getClassById,   
    updateClass,
    deleteClass
};