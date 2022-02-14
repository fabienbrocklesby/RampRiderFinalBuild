const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, 'Please add an id'],
    },
    post_id: {
      type: String,
      required: [true, 'Please add a post ID'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Likes', likeSchema);
