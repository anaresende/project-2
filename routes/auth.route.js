const express = require('express');
const User = require('../models/usermodel');
const router = express.Router();
const saltRounds = process.env.SALT || 10;
const bcrypt = require('bcrypt');
const fileUploader = require('../config/cloudinary');
const isNotLoggedIn = require('./../middleware/isNotLoggedIn')
const currentUserEmail = ''
const PopcornApi = require('../api/api')


//SIGN UP ROUTES
router.get('/register', (req, res, next) => {
	res.render('auth/register');
});


router.get('/user/profile', (req, res, next) => {
	let {id} = req.session.user
	User.findById(id)
	.then((data)=>{ 
	res.render('user/profile', {user: data})
	})
});




router.post('/register', fileUploader.single("avatarUrl"),  (req, res, next) => {
 	const { name, username, email, password, favoriteMovie } = req.body
    const avatarUrl = req.file?.path;
     

 	if (!name || !username || !email|| !password || !favoriteMovie){
 		res.render('auth/register', {
			errorMessage: 'Please fill the form with your personal information'
		});
 	}

	User.findOne({ email })
		.then((user) => {
			//If user exists, send error
			if (user) {
				res.render('auth/register', { errorMessage: 'This user already exists' });
				return;
			} else {
				//Hash the password
				const salt= bcrypt.genSaltSync(saltRounds);
				const hash = bcrypt.hashSync(password, salt);

				//If user does not exist, create it
				User.create({ name, username, email, password: hash, avatarUrl, favoriteMovie })
					.then((newUser) => {
                        req.session.currentUser = newUser;
						console.log(req.session);
						//Once created, redirect
						res.redirect('/user/profile');
					})
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => {
			res.render('auth/register', {
				errorMessage: 'Something went wrong, try again'
			});	
		});	
	
 });


router.get('/login', (req, res, next) => {
	res.render('auth/login');
});

router.post('/login', (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.render('auth/login', {
			errorMessage: 'Email and password are required'
		});
	}
	console.log(email)
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				res.render('auth/login', { errorMessage: 'Incorrect email or password' });
			}
			const passwordCorrect = bcrypt.compareSync(password, user.password);
			if (passwordCorrect) {
				req.session.currentUser = user;
				res.redirect('/user/profile');
			} else {
				res.render('auth/login', { errorMessage: 'Incorrect email or password' });
			}
		}).catch((error) => {
			res.render('auth/login', { errorMessage: 'User not found' });
		});
});



router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) res.redirect('/');
		else res.redirect('/');
	});
});




module.exports = router;