var express = require('express');
var router = express.Router();
const PopcornApi = require('../api/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.currentUser
  PopcornApi.getUpcomingMovies()
    .then((upcomingMovies) => {
      res.render('index', { 
        title: 'Project Name',
        user,
        upcomingMovies: upcomingMovies.results 
      });
    })
      
});

module.exports = router;


router.get('/about-us', (req, res)=> {
  res.render('about-us/about-us')
})