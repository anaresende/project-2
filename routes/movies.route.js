const express = require('express');
const router = express.Router();

const Movie = require('../models/moviemodel');
const PopcornApi = require('../api/api')

//For actors and directors
// const Actors = require('../models/actorsmodel');
// const Directors = require('../models/directorsmodel');

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
			res.render('movies/each-movie', {movie})
		})
 });










module.exports = router;