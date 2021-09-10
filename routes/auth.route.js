const express = require('express');
const User = require('../models/usermodel');
const router = express.Router();
const saltRounds = process.env.SALT || 10;
const bcrypt = require('bcrypt');
const fileUploader = require('../config/cloudinary');
const isNotLoggedIn = require('./../middleware/isNotLoggedIn')
const currentUserEmail = ''


//SIGN UP ROUTES
router.get('/register', (req, res, next) => {
	res.render('signup/register');
});


router.get('/user/profile', (req, res, next) => {
	let {id} = req.session.user
	console.log('this req.session ', req.session.user)
	User.findById(id)
	.then((data)=>{ 
	console.log('this is data =====', data)
	res.render('user/profile', {user: data})
	})
});




router.post('/register', fileUploader.single("avatarUrl"),  (req, res, next) => {
 	const { name, username, email, password, favoriteMovie } = req.body
    const avatarUrl = req.file?.path;
     

 	if (!name || !username || !email|| !password || !favoriteMovie){
 		res.render('signup/register', {
			errorMessage: 'Please fill the form with your personal information'
		});
 	}

	User.findOne({ email })
		.then((user) => {

			//If user exists, send error
			if (user) {
                
				res.render('signup/register', { errorMessage: 'This user already exists' });
				return;
			
			} else {

                
			
				//Hash the password
				const salt= bcrypt.genSaltSync(saltRounds);
				const hash = bcrypt.hashSync(password, salt);

				//If user does not exist, create it
				User.create({ name, username, email, password: hash, avatarUrl, favoriteMovie })
					.then((newUser) => {
                        req.session.user = newUser;
						console.log(req.session);
						//Once created, redirect
						res.redirect('user/profile');
					})
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
	
 });



// router.get('user/profile', (req, res, next) => {
// 	res.render('user/profile');
// });







module.exports = router;