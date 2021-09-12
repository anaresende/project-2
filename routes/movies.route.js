const express = require('express');
const router = express.Router();

const Movie = require('../models/moviemodel');
const PopcornApi = require('../api/api')

//For actors and directors
// const Actors = require('../models/actorsmodel');
// const Directors = require('../models/directorsmodel');

router.get('/', (req, res)=> {
	console.log('enter search page')
	PopcornApi.getMovieBySearch('la la land')
	.then((search) =>{
		console.log(search)
		res.render('movies/movie-list', {movies: search.results})
	})
 });

// //Each movie
// router.get('/:id', (req, res) => {
// 	const { id } = req.params;

// 	Movie.findById(id)
// 		//.populate('') => in case we have the actors and directors, we can populate them
// 		.then((movie) => {
// 			console.log(movie);
// 			res.render('movies/each-movie', { movie });
// 		})
// 		.catch((err) => console.log(err));
// });


//API SEARCH
//  router.get('/movie-detail', (req, res)=> {
// 	 PopcornApi.getOneMovie('680')

// 	 .then((id)=> {
// 		 console.log (id)
// 		 res.render('movies/each-movie', {movie: id})
// 	})
//  });










module.exports = router;