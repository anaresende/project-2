const express = require('express');
const router = express.Router();
const User = require('../models/usermodel')
const PopcornApi = require('../api/api');
const { populate } = require('../models/usermodel');
const Watchlist = require('../models/watchlistmodel');



router.get('/:personId', (req, res)=> {
	const {personId} = req.params 
		PopcornApi.getPeopleDetails(personId)
            .then((people) => {
                console.log(people)
                res.render('people/people-detail', {people, user: req.session.currentUser} )
            }).catch((error)=> error)
})


module.exports = router;