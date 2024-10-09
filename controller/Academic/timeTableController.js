const TimeTable = require('../../model/Academic/timeTableModel');

// Add a new time table
exports.addTimeTable = async (req, res) => {
    const { ClassID, Class, Section, Days } = req.body; // Destructuring from req.body
    try {
        const timeTable = new TimeTable({ ClassID, Class, Section, Days });
        await timeTable.save();
        res.status(201).json(timeTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all time tables
exports.getAllTimeTables = async (req, res) => {
    try {
        const timeTables = await TimeTable.find();
        res.status(200).json(timeTables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get time table by ClassID
exports.getTimeTableByClassID = async (req, res) => {
    try {
        const timeTable = await TimeTable.findOne({ ClassID: req.params.ClassID });
        if (!timeTable) {
            return res.status(404).json({ message: 'Time table not found' });
        }
        res.status(200).json(timeTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update time table
exports.updateTimeTable = async (req, res) => {
    const { ClassID, Class, Section, Days } = req.body; // Destructuring from req.body
    try {
        const timeTable = await TimeTable.findOneAndUpdate(
            { ClassID: req.params.ClassID },
            { ClassID, Class, Section, Days },
            { new: true, runValidators: true }
        );
        if (!timeTable) {
            return res.status(404).json({ message: 'Time table not found' });
        }
        res.status(200).json(timeTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete time table
exports.deleteTimeTable = async (req, res) => {
    try {
        const timeTable = await TimeTable.findOneAndDelete({ ClassID: req.params.ClassID });
        if (!timeTable) {
            return res.status(404).json({ message: 'Time table not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
