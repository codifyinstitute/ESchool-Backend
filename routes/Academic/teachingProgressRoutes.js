const express = require('express');
const router = express.Router();
const teachingProgressController = require('../../controller/Academic/teachingProgressController');

// Create a new teaching progress entry
router.post('/', teachingProgressController.createTeachingProgress);

// Get all teaching progress entries
router.get('/', teachingProgressController.getAllTeachingProgress);

// Get a teaching progress entry by Id
router.get('/:id', teachingProgressController.getTeachingProgressById);

// Update a teaching progress entry
router.put('/:id', teachingProgressController.updateTeachingProgress);

// Delete a teaching progress entry
router.delete('/:id', teachingProgressController.deleteTeachingProgress);

module.exports = router;
