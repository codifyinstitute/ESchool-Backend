const FeeData = require('../model/feeDataModel');
const AcademicYearInfo = require('../model/academicYearInfo');

// Create a new FeeData or update existing FeeData
exports.createFeeData = async (req, res) => {
    const { StudentId, Payments, RemainingFee, TotalFee, Balance } = req.body;

    try {
        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        var id = StudentId + academicYear.StartYear + academicYear.EndYear;
        // Check if FeeID already exists
        let feeData = await FeeData.findOne({ FeeID: id });

        if (feeData) {
            // If exists, push new payment data into Payments array
            feeData.Payments.push(Payments);

            // Update RemainingFee and TotalFee as needed
            feeData.RemainingFee -= Payments.Fee.reduce((sum, payment) => sum + payment.Amount, 0);
            console.log(feeData.RemainingFee,Payments.Fee.reduce((sum, payment) => sum + payment.Amount, 0))
            feeData.Balance = Balance; // You can adjust this logic based on your requirements

            // Save the updated document
            await feeData.save();
            return res.status(200).json(feeData);
        } else {
            // If not exists, create new FeeData
            feeData = new FeeData({ FeeID: id, StudentId, Payments, RemainingFee, TotalFee, Balance });
            await feeData.save();
            return res.status(201).json(feeData);
        }
    } catch (error) {
        console.log(error)
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
        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        var id = req.params.feeID + academicYear.StartYear + academicYear.EndYear;
        const feeData = await FeeData.findOne({ FeeID: id });
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
