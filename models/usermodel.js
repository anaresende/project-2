const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	favoriteMovie: {
		type: String,
		required: true
	},
	avatarUrl: String,
});

const User = model('User', userSchema);

module.exports = User;
