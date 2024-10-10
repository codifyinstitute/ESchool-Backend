const express = require('express');
const router = express.Router();
const multer = require('../config/multerConfig');
const BankController = require('../controller/bankController');

// Add bank details with image upload
router.post('/add', multer.single('Logo'), BankController.addBank);

// Get all 
router.get('/all', BankController.getAll);

// Get bank by ID
router.get('/get/:id', BankController.getBankById);

// Update bank by ID with image upload
router.put('/update/:id', multer.single('Logo'), BankController.updateBank);

// Delete bank by ID
router.delete('/delete/:id', BankController.deleteBank);

module.exports = router;
