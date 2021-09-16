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

            const randomIndexForVideo = Math.ceil(Math.random() * (popularMovies.results.length - 1))
            const randomIndexForPoster = Math.ceil(Math.random() * (popularMovies.results.length - 1))

            PopcornApi.getVideo(popularMovies.results[randomIndexForVideo].id)
              .then((video)=> {
                const lastIndex = video.results.length - 1
                const trailer = video.results[lastIndex]?.key;
                const poster = popularMovies.results[randomIndexForPoster].poster_path

                res.render('index', { 
                  title: 'Popcorn',
                  user,
                  topRatedMovies: topRatedMovies.results,
                  upcomingMovies: upcomingMovies.results,
                  popularMovies: popularMovies.results,
                  trailer,
                  poster
                });
              })
          });
        })
      
    })
      
});



router.get('/about-us', (req, res)=> {
  res.render('about-us/about-us')
})



module.exports = router;