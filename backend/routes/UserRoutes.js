const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCurrentUser, updateUser} = require('../controllers/UserController');
const authenticateToken = require('../Middleware/Authenticate');

router.get('/me', authenticateToken, getCurrentUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', authenticateToken, updateUser);

module.exports = router;