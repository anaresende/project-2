var express = require('express');
const { getPopularMovies } = require('../api/api');
var router = express.Router();
const PopcornApi = require('../api/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.currentUser
  
  PopcornApi.getUpcomingMovies()
    .then((upcomingMovies) => {

      PopcornApi.getTopRatedMovies()
        .then((topRatedMovies) => {

          PopcornApi.getPopularMovies()
           .then((popularMovies)=> {
             console.log(popularMovies.results)
            res.render('index', { 
              title: 'Popcorn',
              user,
              topRatedMovies: topRatedMovies.results,
              upcomingMovies: upcomingMovies.results,
              popularMovies: popularMovies.results,
            });
          });
        })
      
    })
      
});



router.get('/about-us', (req, res)=> {
  res.render('about-us/about-us')
})



module.exports = router;