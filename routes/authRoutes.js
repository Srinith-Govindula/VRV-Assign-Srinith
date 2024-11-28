const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authenticate');

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Routes
router.get('/me', verifyToken, authController.getUserDetails);
router.get('/users', verifyToken, authController.viewUsers);
router.put('/users/:id', verifyToken, authController.updateUserDetails);

module.exports = router;
