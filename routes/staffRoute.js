const express = require('express');
const upload = require('../config/multerConfig'); // Adjust the path as necessary
const {
    addStaff,
    updateStaff,
    getAllStaff,
    getStaffByEmployeeId,
    deleteStaff
} = require('../controller/staffController'); // Adjust the path as necessary

const router = express.Router();

// Add a new staff member with file uploads
router.post('/add', upload.fields([
    { name: 'photo' }, 
    { name: 'qualificationCertificate' }, 
    { name: 'experienceLetter' }
]), addStaff);

// Update an existing staff member with file uploads
router.put('/update/:EmployeeId', upload.fields([
    { name: 'photo' }, 
    { name: 'qualificationCertificate' }, 
    { name: 'experienceLetter' }
]), updateStaff);

// Get all staff members
router.get('/all', getAllStaff);

// Get a staff member by EmployeeId
router.get('/get/:EmployeeId', getStaffByEmployeeId);

// Delete a staff member by EmployeeId
router.delete('/delete/:EmployeeId', deleteStaff);

module.exports = router;
