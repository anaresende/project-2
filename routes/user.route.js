var express = require('express');
const User = require('../models/usermodel');
const Watchlist = require('../models/watchlistmodel');
const PopcornApi = require('../api/api');
var router = express.Router();
const saltRounds = process.env.SALT || 10;
const bcrypt = require('bcrypt');
const fileUploader = require('../config/cloudinary');
const isLoggedIn = require('./../middleware/isLoggedIn')


router.get('/profile', isLoggedIn, (req, res, next) => {
	const user = req.session.currentUser
	Watchlist.find({ user: user._id})
		.then((watch) => {
			console.log('found', watch)
			user.watchlist = watch;
		
			res.render('user/profile', {user: user})
		})
		.catch((error) => {
			console.log(error)
		})
});



router.get('/profile/edit', (req, res) => {
	const user = req.session.currentUser
	User.findById(user._id)
	.then (()=> {
		res.render('user/profile-edit', {user: user})
	}).catch(error => error)
});

router.post('/profile/edit', fileUploader.single("avatarUrl"), (req, res) => {
	const { name, username, email, password, favoriteMovie } = req.body
	const avatarUrl = req.file?.path;
	const user = req.session.currentUser
	
	User.findById(user._id)
		.then (user => {
			if (req.session.currentUser._id == user._id) {
				user.name = name;
				user.username = username;
				user.email = email;
				user.favoriteMovie = favoriteMovie;

					if(avatarUrl) {
						user.avatarUrl = avatarUrl;
					}
				
					if (password) {
						const salt= bcrypt.genSaltSync(saltRounds);
						const hash = bcrypt.hashSync(password, salt);
						user.password = hash;
					}
				
				user.save()
					.then((user)=> {
						req.session.currentUser = user;
						res.redirect('/user/profile')
					}).catch(error => error)
			}
		}).catch(error => error)
});

router.post('/profile/watchlist/:movieId/remove', (req, res) => {
	const {movieId} = req.params 

	PopcornApi.getOneMovie(movieId)
		.then((movie)=> {
			Watchlist.findOne({"movie.id": movieId, user: req.session.currentUser._id})
				.then((watch) => {
					watch.remove()
						.then(() => res.redirect('/user/profile'))
						.catch((error) => console.log(error))
				})
				.catch((error) => console.log(error))
		})
		.catch((error) => console.log(error))
});

module.exports = router;
