const AcademicYearInfo = require('../model/academicYearInfo'); // Update the path as necessary

// Get all academic years
exports.getAllAcademicYears = async (req, res) => {
    try {
        const academicYears = await AcademicYearInfo.find();
        res.status(200).json(academicYears);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an academic year by ID
exports.getAcademicYearById = async (req, res) => {
    try {
        const academicYear = await AcademicYearInfo.findById(req.params.id);
        if (!academicYear) return res.status(404).json({ message: 'Academic Year not found' });
        res.status(200).json(academicYear);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new academic year
exports.createAcademicYear = async (req, res) => {
    const { StartYear, StartMonth, EndYear, EndMonth, Status } = req.body;
    const newAcademicYear = new AcademicYearInfo({ StartYear, StartMonth, EndYear, EndMonth, Status });

    try {
        const savedAcademicYear = await newAcademicYear.save();
        res.status(201).json(savedAcademicYear);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an academic year
exports.updateAcademicYear = async (req, res) => {
    try {
        const updatedAcademicYear = await AcademicYearInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAcademicYear) return res.status(404).json({ message: 'Academic Year not found' });
        res.status(200).json(updatedAcademicYear);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an academic year
exports.deleteAcademicYear = async (req, res) => {
    try {
        const deletedAcademicYear = await AcademicYearInfo.findByIdAndDelete(req.params.id);
        if (!deletedAcademicYear) return res.status(404).json({ message: 'Academic Year not found' });
        res.status(200).json({ message: 'Academic Year deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};