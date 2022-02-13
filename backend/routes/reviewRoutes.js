const express = require('express');
const router = express.Router();

const { 
    createReview,
} = require('../controllers/reviewController');

const { protect } = require('../middleware/authMiddleware');

router.post('/:post_id', protect, createReview);


module.exports = router