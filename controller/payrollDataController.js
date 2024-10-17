const PayrollData = require('../model/payrollDataModel');

// Create a new PayrollData
exports.createPayrollData = async (req, res) => {
    const { PayrollID, EmployeeId, Payments } = req.body; // Destructure properties

    try {
        const payrollData = new PayrollData({ PayrollID, EmployeeId, Payments });
        await payrollData.save();
        res.status(201).json(payrollData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all PayrollData records
exports.getAllPayrollData = async (req, res) => {
    try {
        const payrollRecords = await PayrollData.find();
        res.status(200).json(payrollRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get PayrollData by PayrollID
exports.getPayrollDataByPayrollID = async (req, res) => {
    try {
        const payrollData = await PayrollData.findOne({ PayrollID: req.params.payrollID });
        if (!payrollData) return res.status(404).json({ message: 'PayrollData not found' });
        res.status(200).json(payrollData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update PayrollData by PayrollID
exports.updatePayrollData = async (req, res) => {
    const { EmployeeId, Payments } = req.body; // Destructure properties

    try {
        const payrollData = await PayrollData.findOneAndUpdate(
            { PayrollID: req.params.payrollID },
            { EmployeeId, Payments },
            { new: true }
        );
        if (!payrollData) return res.status(404).json({ message: 'PayrollData not found' });
        res.status(200).json(payrollData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete PayrollData by PayrollID
exports.deletePayrollData = async (req, res) => {
    try {
        const payrollData = await PayrollData.findOneAndDelete({ PayrollID: req.params.payrollID });
        if (!payrollData) return res.status(404).json({ message: 'PayrollData not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
