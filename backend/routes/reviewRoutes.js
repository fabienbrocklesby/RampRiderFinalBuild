const express = require('express');
const { createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:post_id', protect, createReview);

module.exports = router;
