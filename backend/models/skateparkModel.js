const mongoose = require('mongoose');

const skateparkSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
    },
    size: {
        type: String,
        required: [true, 'Please add a size'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image'],
    },
    user_id: {
        type: String,
        required: [true, 'Please add a user_id'],
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Skateparks', skateparkSchema);