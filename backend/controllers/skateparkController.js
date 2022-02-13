const asyncHandler = require('express-async-handler');

const Skatepark = require('../models/skateparkModel');
const Like = require('../models/likesModel');

const { skateparkSchema } = require('../middleware/validationMiddleware');

const getSkateparks = asyncHandler(async (req, res, next) => {
    const skateparks = await Skatepark.find();

    res.status(200).json(skateparks);
});

const createSkatepark = asyncHandler(async (req, res) => {
    const { name, size, description, location, image } = req.body;

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
});

const likeSkatepark = asyncHandler(async (req, res) => {
    const { post_id } = req.params;
    
    const liked = await Like.find({ post_id: post_id, user_id: req.user._id });

    if (liked.length > 0) {
        res.status(400);
        throw new Error('You have already liked this skatepark');
    }

    const like = await Like.create({
        post_id,
        user_id: req.user._id,
    });

    res.status(201).json({
        'message': 'You have liked this skatepark',
    });

});

module.exports = {
    getSkateparks,
    createSkatepark,
    likeSkatepark,
}