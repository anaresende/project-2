const express = require('express');
const router = express.Router();
const User = require('./../models/usermodel')
const Review = require('./../models/reviewsmodel');
const PopcornApi = require('../api/api');
const { populate } = require('./../models/usermodel');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/:query', (req, res)=> {
	const {query} = req.params
	PopcornApi.getMovieBySearch(query)
		.then((search) =>{
			res.render('movies/movie-list', {movies: search.results})
		})
});

router.post('/search', (req, res)=> {
	const {search} = req.body
	res.redirect(search);
});

router.get('/movie-detail/:id', (req, res)=> {
	const {id} = req.params 
	PopcornApi.getOneMovie(id)
		.then((movie)=> {
			Review.find({movie: id})
			.populate("user")
			.then((reviews)=> {
				movie.reviews = reviews
				res.render('movies/each-movie', {...movie, currentUser: req.session.currentUser})})
		})
});

router.post('/movie-detail/:id', (req, res) => {
	const movieId = req.params.id;
	const { comment } = req.body;
	const {userId} = req.session.currentUser._id

	Review.create({
		user: req.session.currentUser._id,
		movie: movieId,
		comment
	})
	.then((newReview) => res.redirect(`/movies/movie-detail/${movieId}`))
	.catch((error) => console.log(error))
});


router.post('/movie-detail/:movieId/delete/:reviewId', (req, res)=> {
	const {reviewId, movieId} = req.params;
	console.log('entrouaqui')
    Review.findById(reviewId)
	.then(review => {
		if (req.session.currentUser._id == review.user) {
			review.remove()
			.then(()=> {
				res.redirect(`/movies/movie-detail/${movieId}`)	
			}).catch(error => console.log(error))
		} 
	}).catch(error => console.log(error))
})

router.post('/movie-detail/:movieId/edit/:reviewId', (req, res)=> {
	const {reviewId, movieId} = req.params;
	const { comment } = req.body;
	
    Review.findById(reviewId)
	.then(review => {
		if (req.session.currentUser._id == review.user) {
			review.comment = comment;
			review.save()
			.then(()=> {
				res.redirect(`/movies/movie-detail/${movieId}`)	
			}).catch(error => console.log(error))
		} 
	}).catch(error => console.log(error))
})






// //Must be fixed
// router.post('/movie-detail/:movieId/edit/:reviewId', (req, res)=> {
// 	const {reviewId, movieId} = req.params;
// 	const { comment } = req.body;
// 	console.log(reviewId, movieId)
//     Review.findByIdAndUpdate(
// 		req.session.currentUser._id,
// 		reviewId,
// 		comment 
// 	)
//     .then(updatedReview => res.redirect(`/movies/movie-detail/${movieId}`))
//     .catch(error=> console.log(error))
// })

module.exports = router;