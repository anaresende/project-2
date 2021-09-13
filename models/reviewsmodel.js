const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    movie: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true, maxlength: 500 }
});

const Review = model('Review', reviewSchema);

module.exports = Review;