const express = require('express');
const router = express.Router();

const { 
    createSkatepark,
    getSkateparks,
    getSkatepark,
    mostLikedSkatepark,
    locationSkatepark,
    likeSkatepark
} = require('../controllers/skateparkController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getSkateparks);
router.get('/single/:id', getSkatepark);
router.get('/mostliked', mostLikedSkatepark);
router.post('/location', locationSkatepark)
router.post('/', protect, createSkatepark);
router.post('/like/:post_id', protect, likeSkatepark);

module.exports = router