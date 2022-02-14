const asyncHandler = require('express-async-handler');

const Review = require('../models/reviewModel');

const { reviewSchema } = require('../middleware/validationMiddleware');

const createReview = asyncHandler(async (req, res) => {
  const { title, body, rating } = req.body;
  const { post_id } = req.params;

  await reviewSchema.validateAsync(req.body);

  const review = await Review.create({
    title,
    body,
    rating,
    post_id,
    user_id: req.user.id,
  });

  res.status(201).json(review);
});

module.exports = {
  createReview,
};
