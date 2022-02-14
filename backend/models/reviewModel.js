const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    body: {
      type: String,
      required: [true, 'Please add a body'],
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating'],
    },
    post_id: {
      type: String,
      required: [true, 'Please add a post ID'],
    },
    user_id: {
      type: String,
      required: [true, 'Please add a user_id'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Reviews', reviewSchema);
