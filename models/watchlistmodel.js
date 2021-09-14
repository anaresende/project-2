const { Schema, model } = require('mongoose');

const watchlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    movie: {
        id: { type: String },
        original_title: { type: String },
        poster_path: { type: String },
    }
});

const Watchlist = model('Watchlist', watchlistSchema);

module.exports = Watchlist;