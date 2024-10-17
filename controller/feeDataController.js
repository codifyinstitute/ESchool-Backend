const FeeData = require('../model/feeDataModel');

// Create a new FeeData
exports.createFeeData = async (req, res) => {
    const { FeeID, StudentId, Payments, RemainingFee, TotalFee } = req.body;

    try {
        const feeData = new FeeData({ FeeID, StudentId, Payments, RemainingFee, TotalFee });
        await feeData.save();
        res.status(201).json(feeData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all FeeData records
exports.getAllFeeData = async (req, res) => {
    try {
        const feeDataRecords = await FeeData.find();
        res.status(200).json(feeDataRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get FeeData by FeeID
exports.getFeeDataByFeeID = async (req, res) => {
    try {
        const feeData = await FeeData.findOne({ FeeID: req.params.feeID });
        if (!feeData) return res.status(404).json({ message: 'FeeData not found' });
        res.status(200).json(feeData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update FeeData by FeeID
exports.updateFeeData = async (req, res) => {
    const { StudentId, Payments, RemainingFee, TotalFee } = req.body; 

    try {
        const feeData = await FeeData.findOneAndUpdate(
            { FeeID: req.params.feeID },
            { StudentId, Payments, RemainingFee, TotalFee },
            { new: true }
        );
        if (!feeData) return res.status(404).json({ message: 'FeeData not found' });
        res.status(200).json(feeData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete FeeData by FeeID
exports.deleteFeeData = async (req, res) => {
    try {
        const feeData = await FeeData.findOneAndDelete({ FeeID: req.params.feeID });
        if (!feeData) return res.status(404).json({ message: 'FeeData not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
