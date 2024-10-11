const StudentAttendance = require('../model/studentAttendanceModel');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    const { Date, Class, Section, Attendance } = req.body; // Destructure fields

    try {
        const studentAttendance = new StudentAttendance({ Date, Class, Section, Attendance });
        await studentAttendance.save();
        res.status(201).json(studentAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceList = await StudentAttendance.find();
        res.status(200).json(attendanceList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get attendance record by ID
exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await StudentAttendance.findById(req.params.id); // Use _id by default
        if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
    const { Date, Class, Section, Attendance } = req.body; // Destructure fields

    try {
        const attendance = await StudentAttendance.findByIdAndUpdate(
            req.params.id,
            { Date, Class, Section, Attendance },
            { new: true, runValidators: true }
        );
        if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const attendance = await StudentAttendance.findByIdAndDelete(req.params.id); // Use _id by default
        if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
