const SchoolSetup = require('../model/schoolSetupModel');
const fs = require('fs');
const path = require('path');

// Get all school setups
exports.getAllSchools = async (req, res) => {
    try {
        const schools = await SchoolSetup.find();
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a school setup by ID
exports.getSchoolById = async (req, res) => {
    try {
        const school = await SchoolSetup.findById(req.params.id);
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new school setup
exports.createSchool = async (req, res) => {
    const schoolData = req.body;

    // Attach file paths
    schoolData.SchoolLogo = req.files ? req.files.SchoolLogo[0].path : '';
    schoolData.SchoolStamp = req.files ? req.files.SchoolStamp[0].path : '';
    schoolData.PrincipleSign = req.files ? req.files.PrincipleSign[0].path : '';
    schoolData.SchoolSign = req.files ? req.files.SchoolSign[0].path : '';

    const newSchool = new SchoolSetup(schoolData);

    try {
        const savedSchool = await newSchool.save();
        res.status(201).json(savedSchool);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

// Update a school setup
exports.updateSchool = async (req, res) => {
    const updates = req.body;

    // Handle file uploads
    if (req.file) updates.SchoolLogo = req.file.path;
    if (req.files) {
        if (req.files.schoolStamp) updates.SchoolStamp = req.files.schoolStamp[0].path;
        if (req.files.principleSign) updates.PrincipleSign = req.files.principleSign[0].path;
        if (req.files.schoolSign) updates.SchoolSign = req.files.schoolSign[0].path;
    }

    try {
        const updatedSchool = await SchoolSetup.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedSchool) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json(updatedSchool);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a school setup
exports.deleteSchool = async (req, res) => {
    try {
        const deletedSchool = await SchoolSetup.findByIdAndDelete(req.params.id);
        if (!deletedSchool) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
