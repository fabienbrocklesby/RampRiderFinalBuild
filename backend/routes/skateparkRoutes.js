const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const {
  createSkatepark,
  getSkateparks,
  getSkatepark,
  mostLikedSkatepark,
  locationSkatepark,
  likeSkatepark,
} = require('../controllers/skateparkController');

router.get('/', getSkateparks);
router.get('/single/:id', getSkatepark);
router.get('/mostliked', mostLikedSkatepark);
router.post('/location', locationSkatepark);
router.post('/', protect, createSkatepark);
router.post('/like/:post_id', protect, likeSkatepark);

module.exports = router;
