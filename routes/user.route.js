var express = require('express');
var router = express.Router();
const isLoggedIn = require('./../middleware/isLoggedIn')




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
