const express = require('express');
const router = express.Router();

const { 
    createSkatepark,
    getSkateparks,
    likeSkatepark
} = require('../controllers/skateparkController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getSkateparks);
router.post('/', protect, createSkatepark);
router.post('/like/:post_id', protect, likeSkatepark);

module.exports = router