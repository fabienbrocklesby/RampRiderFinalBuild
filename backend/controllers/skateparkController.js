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

const locationSkatepark = async (req, res) => {
  const { location } = req.body;
  const skateparks = await Skatepark.find();

  const skatepark = skateparks.filter((item) => item.location === location);

  res.status(200).json(skatepark);
};

const categorySkatepark = async (req, res) => {
    const { category } = req.params;
    const skateparks = await Skatepark.find();

    const skatepark = skateparks.filter((item) => item.category === category);

    res.status(200).json(skatepark);
};

const createSkatepark = async (req, res) => {
  const {
    name, size, description, location, image, directions, category,
  } = req.body;

  await skateparkSchema.validateAsync(req.body);

  const skatepark = await Skatepark.create({
    user_id: req.user._id,
    name,
    size,
    description,
    location,
    image,
    directions,
    category,
    likes: null,
  });

  if (skatepark) {
    res.status(201).json({
      message: 'Skatepark created successfully',
      skateparkData: {
        _id: skatepark.id,
        name: skatepark.name,
        size: skatepark.size,
        location: skatepark.location,
        description: skatepark.description,
        image: skatepark.image,
        directions: skatepark.directions,
        category: skatepark.category,
        likes: skatepark.likes,
      },
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
  locationSkatepark,
  categorySkatepark,
  likeSkatepark,
  checkLikedSkatepark,
};
