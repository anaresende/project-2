var express = require('express');
const User = require('../models/usermodel');
var router = express.Router();
const saltRounds = process.env.SALT || 10;
const bcrypt = require('bcrypt');
const fileUploader = require('../config/cloudinary');
const isLoggedIn = require('./../middleware/isLoggedIn')


router.get('/profile', isLoggedIn, (req, res, next) => {
	const user = req.session.currentUser
	res.render('user/profile', {user: user})
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
	const user = req.session.currentUser
	console.log("chegou aqui", name, username, email, password, favoriteMovie, user)

	
	User.findById(user._id)
	.then (user => {
		if (req.session.currentUser._id == user._id) {
			user.name = name;
			user.username = username;
			user.email = email;
			user.favoriteMovie = favoriteMovie;
		
			if (password) {
				const salt= bcrypt.genSaltSync(saltRounds);
				const hash = bcrypt.hashSync(password, salt);
				user.password = hash;
			}
			
			console.log("chegou aqui", name, username, email, password, favoriteMovie )
			user.save()
			.then(()=> {
				res.render('user/profile', {user: user})
			}).catch(error => error)
		}
	}).catch(error => error)
});




















/* GET users listing. */
// router.get('/profile', (req, res, next) => {
// 	let {_id} = req.session.user
// 	User.findById(_id)
// 	.then((data)=>{ 
// 	console.log(data)
// 	res.render('user/profile', {user: data})
// 	})
// });


// router.get('/logout', (req, res) => {
// 	req.session.destroy((err) => {
// 		if (err) res.redirect('/');
// 		else res.redirect('/');
// 	});
// });

// function isLoggedIn(req, res, next){
//     if(req.session.currentUser) next() 
//     else res.redirect("./user/profile")
//   }


// router.get('/user-profile', isLoggedIn, (req, res)=>{
//     if(req.session.currentUser) res.render('./user/profile', {user: req.session.currentUser})
//     else res.redirect("/")
// })


module.exports = router;
