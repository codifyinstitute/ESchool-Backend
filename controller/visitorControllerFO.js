const VisitorFrontOffice = require('../model/visitorFrontOfficeModel');

// Create a new visitor record
const addVisitorRecord = async (req, res) => {
    const { Category, Date, Time, Name, TotalVisitorNo, Purpose, MobileNo, OTP, verifiedVisitorId } = req.body;

    // Basic validation
    if (!Category || !Date || !Time || !Name || !Purpose || !MobileNo) {
        return res.status(400).json({ message: 'Category, Date, Time, Name, Purpose, and MobileNo are required' });
    }

    try {
        const visitorRecord = new VisitorFrontOffice({
            Category,
            Date,
            Time,
            Name,
            TotalVisitorNo,
            Purpose,
            MobileNo,
            OTP,
            verifiedVisitorId
        });
        await visitorRecord.save();
        res.status(201).json(visitorRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all visitor records
const getAllVisitorRecords = async (req, res) => {
    try {
        const records = await VisitorFrontOffice.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a visitor record by ID
const getVisitorRecordById = async (req, res) => {
    try {
        const record = await VisitorFrontOffice.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a visitor record by ID
const updateVisitorRecord = async (req, res) => {
    try {
        const record = await VisitorFrontOffice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a visitor record by ID
const deleteVisitorRecord = async (req, res) => {
    try {
        const record = await VisitorFrontOffice.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addVisitorRecord,
    getAllVisitorRecords,
    getVisitorRecordById,
    updateVisitorRecord,
    deleteVisitorRecord
};
