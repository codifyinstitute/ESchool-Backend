const express = require('express');
const upload = require('../config/multerConfig'); // Adjust the path as necessary
const {
    addStudent,
    updateStudent,
    getAllStudents,
    getStudentByStudentId,
    deleteStudent
} = require('../controller/studentController'); // Adjust the path as necessary

const router = express.Router();

// Add a new student with file uploads
router.post('/add', upload.fields([
    { name: 'StudentPhoto' },       // Student photo
    { name: 'Birth' },       // Birth document
    { name: 'Leaving' },     // Leaving document
    { name: 'FatherPhoto' }, // Father's photo
    { name: 'MotherPhoto' }  // Mother's photo
]), addStudent);

// Update an existing student with file uploads
router.put('/update/:StudentId', upload.fields([
    { name: 'StudentPhoto' },       // Student photo
    { name: 'Birth' },       // Birth document
    { name: 'Leaving' },     // Leaving document
    { name: 'FatherPhoto' }, // Father's photo
    { name: 'MotherPhoto' }  // Mother's photo
]), updateStudent);

// Get all students
router.get('/all', getAllStudents);

// Get a student by StudentId
router.get('/get/:StudentId', getStudentByStudentId);

// Delete a student by StudentId
router.delete('/delete/:StudentId', deleteStudent);

module.exports = router;
