const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const {
  createSkatepark,
  getSkateparks,
  getSkatepark,
  locationSkatepark,
  likeSkatepark,
  checkLikedSkatepark,
} = require('../controllers/skateparkController');

router.get('/', getSkateparks);
router.get('/single/:id', getSkatepark);
router.post('/location', locationSkatepark);
router.post('/', protect, createSkatepark);
router.post('/like/:post_id', protect, likeSkatepark);
router.get('/checklike/:post_id', protect, checkLikedSkatepark);

module.exports = router;
