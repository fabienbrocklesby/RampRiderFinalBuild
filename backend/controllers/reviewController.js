const Review = require('../models/reviewModel');

const { reviewSchema } = require('../middleware/validationMiddleware');

const createReview = async (req, res) => {
  const { title, body, rating } = req.body;
  const { post_id } = req.params;

  await reviewSchema.validateAsync(req.body);

  const review = await Review.create({
    title,
    body,
    rating,
    post_id,
    user_id: req.user.id,
    username: req.user.name,
  });

  if (review) {
    res.status(201).json({
      title: review.title,
      body: review.body,
      rating: review.rating,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Data');
  }
};

module.exports = {
  createReview,
};
