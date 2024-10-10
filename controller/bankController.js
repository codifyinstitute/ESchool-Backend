const Bank = require('../model/addBankModel');
const fs = require('fs');
const path = require('path');

// Add bank details
const addBank = async (req, res) => {
    try {
        const { BankName, AccountNo, OpeningBalance, Primary, Remark } = req.body;
        const Logo = req.file ? req.file.filename : null;
        const bank = new Bank({ BankName, Logo, AccountNo, OpeningBalance, Primary, Remark });
        await bank.save();
        res.status(201).json(bank);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all banks
const getAllBanks = async (req, res) => {
    try {
        const banks = await Bank.find();
        res.status(200).json(banks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get bank by ID
const getBankById = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);
        if (!bank) return res.status(404).json({ message: 'Bank not found' });
        res.status(200).json(bank);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update bank by ID
const updateBank = async (req, res) => {
    try {
        const { BankName, AccountNo, OpeningBalance, Primary, Remark } = req.body;
        const updateData = { BankName, AccountNo, OpeningBalance, Primary, Remark };

        if (req.file) {
            const bank = await Bank.findById(req.params.id);
            if (bank && bank.Logo) {
                // Optionally delete the old image if you want to
                fs.unlinkSync(path.join(__dirname, 'uploads', bank.Logo)); // Adjust path as necessary
            }
            updateData.Logo = req.file.filename; // Update logo with new file
        }

        const bank = await Bank.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!bank) return res.status(404).json({ message: 'Bank not found' });
        res.status(200).json(bank);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete bank by ID
const deleteBank = async (req, res) => {
    try {
        const bank = await Bank.findByIdAndDelete(req.params.id);
        if (!bank) return res.status(404).json({ message: 'Bank not found' });
        // Optionally delete the logo file
        if (bank.Logo) {
            fs.unlinkSync(path.join(__dirname, 'uploads', bank.Logo)); // Adjust path as necessary
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addBank,
    getAllBanks,
    getBankById,
    updateBank,
    deleteBank
};
