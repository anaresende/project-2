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
            const randomIndexForPoster = Math.ceil(Math.random() * (popularMovies.results.length - 1 - 3))

            PopcornApi.getVideo(popularMovies.results[randomIndexForVideo].id)
              .then((video)=> {
                const lastIndex = video.results.length - 1
                const trailer = video.results[lastIndex]?.key;
                const randomPosters = popularMovies.results.slice(randomIndexForPoster, randomIndexForPoster + 3)

                console.log(randomPosters);

                res.render('index', { 
                  title: 'Popcorn',
                  user,
                  topRatedMovies: topRatedMovies.results,
                  upcomingMovies: upcomingMovies.results,
                  popularMovies: popularMovies.results,
                  trailer,
                  randomPosters
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