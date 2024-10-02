const express = require('express');
const router = express.Router();
const { login, changePassword } = require('../controller/loginController'); 

// Login route
router.post('/login', login);

// Change password route
router.put('/change-password', changePassword);

module.exports = router;
