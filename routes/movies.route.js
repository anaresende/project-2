const express = require('express');
const router = express.Router();

const Movie = require('../models/moviemodel');

//For actors and directors
// const Actors = require('../models/actorsmodel');
// const Directors = require('../models/directorsmodel');

//Movie list
router.get('/', (req, res) => {
	Movie.find()
		//.populate('') => in case we have the actors and directors, we can populate them
		.then((allMovies) => {
			console.log(allMovies);
			res.render('movies/movie-list', { allMovies });
		})
		.catch((err) => console.log(err));
});

//Each movie
router.get('/:id', (req, res) => {
	const { id } = req.params;

	Movie.findById(id)
		//.populate('') => in case we have the actors and directors, we can populate them
		.then((movie) => {
			console.log(movie);
			res.render('movies/each-movie', { movie });
		})
		.catch((err) => console.log(err));
});










module.exports = router;