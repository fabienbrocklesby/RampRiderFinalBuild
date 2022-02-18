const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  getMe,
  getId,
} = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/forgot', forgotPassword);
router.post('/update', updatePassword);
router.get('/me', protect, getMe);
router.get('/getbyid/:id', getId);

module.exports = router;
