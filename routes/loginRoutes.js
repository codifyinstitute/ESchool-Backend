const express = require('express');
const router = express.Router();
const { login, changePassword, getAllLogins } = require('../controller/loginController'); 

// Login route
router.post('/login', login);

// Get All Data
router.get('/all', getAllLogins);

// Change password route
router.put('/change-password', changePassword);

module.exports = router;
