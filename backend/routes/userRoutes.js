const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    forgotPassword,
    updatePassword,
    getMe 
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/forgot', forgotPassword);
router.post('/update/:accessToken', updatePassword);
router.get('/me', protect, getMe);

module.exports = router