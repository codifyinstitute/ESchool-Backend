const express = require('express');
const router = express.Router();
const academicYearController = require('../../controller/Academic/academicYearController');

// Add a new academic year
router.post('/add', academicYearController.addAcademicYear);

// Get all academic years
router.get('/all', academicYearController.getAllAcademicYears);

// Get academic year by Year
router.get('/get/:year', academicYearController.getAcademicYearByYear);

// Update academic year
router.put('/update/:year', academicYearController.updateAcademicYear);

// Delete academic year
router.delete('/delete/:year', academicYearController.deleteAcademicYear);

// Change status to active
router.put('/update/set-active', academicYearController.setActiveStatus);

module.exports = router;
