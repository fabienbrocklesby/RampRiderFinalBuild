/* eslint-disable no-plusplus */

const Skatepark = require('../models/skateparkModel');
const Like = require('../models/likesModel');
const Review = require('../models/reviewModel');

const { skateparkSchema } = require('../middleware/validationMiddleware');

const getSkateparks = async (req, res) => {
  const skateparks = await Skatepark.find();

  res.status(200).json(skateparks);
};

const getSkatepark = async (req, res) => {
  const skatepark = await Skatepark.findById(req.params.id);
  const likeCount = await Like.countDocuments({ post_id: req.params.id });
  const reviews = await Review.find({ post_id: req.params.id });

  res.status(200).json({
    info: skatepark,
    likes: likeCount,
    reviews,
  });
};

const mostLikedSkatepark = async (req, res) => {
  const likes = await Like.find();
  const justIds = likes.map((like) => like.post_id);

  let mf = 1;
  let m = 0;
  let item;

  for (let i = 0; i < justIds.length; i++) {
    for (let j = i; j < justIds.length; j++) {
      if (justIds[i] === justIds[j]) m++;
      if (mf < m) {
        mf = m;
        item = justIds[i];
      }
    }

    m = 0;
  }

  const skatepark = await Skatepark.findById(item);

  if (skatepark == null) {
    res.status(404).json({
      message: 'Its a draw',
    });
  }

  res.status(200).json(skatepark);
};

const locationSkatepark = async (req, res) => {
  const { location } = req.body;
  const skateparks = await Skatepark.find();

  const skatepark = skateparks.filter((item) => item.location === location);

  res.status(200).json(skatepark);
};

const createSkatepark = async (req, res) => {
  const {
    name, size, description, location, image,
  } = req.body;

  await skateparkSchema.validateAsync(req.body);

  const skatepark = await Skatepark.create({
    user_id: req.user._id,
    name,
    size,
    description,
    location,
    image,
    likes: null,
  });

  if (skatepark) {
    res.status(201).json({
      _id: skatepark.id,
      name: skatepark.name,
      size: skatepark.size,
      location: skatepark.location,
      description: skatepark.description,
      image: skatepark.image,
      likes: skatepark.likes,
    });
  } else {
    res.status(400);
    throw new Error('Invalid skatepark data');
  }
};

const likeSkatepark = async (req, res) => {
  const { post_id } = req.params;

  const liked = await Like.find({ post_id, user_id: req.user._id });

  if (liked.length > 0) {
    res.status(400);
    throw new Error('You have already liked this skatepark');
  }

  await Like.create({
    post_id,
    user_id: req.user._id,
  });

  res.status(201).json({
    message: 'You have liked this skatepark',
  });
};

const checkLikedSkatepark = async (req, res) => {
  const { post_id } = req.params;

  const liked = await Like.find({ post_id, user_id: req.user._id });

  if (liked.length > 0) {
    res.status(200);
    res.json({ liked: true });
  } else {
    res.status(200);
    res.json({ liked: false });
  }
};

module.exports = {
  getSkateparks,
  getSkatepark,
  createSkatepark,
  mostLikedSkatepark,
  locationSkatepark,
  likeSkatepark,
  checkLikedSkatepark,
};
