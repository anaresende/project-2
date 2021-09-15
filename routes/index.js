var express = require('express');
var router = express.Router();
const PopcornApi = require('../api/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.currentUser
  
  PopcornApi.getUpcomingMovies()
    .then((upcomingMovies) => {

      PopcornApi.getTopRatedMovies()
        .then((topRatedMovies) => {
          res.render('index', { 
            title: 'Project Name',
            user,
            topRatedMovies: topRatedMovies.results,
            upcomingMovies: upcomingMovies.results 
          });
        })
      // res.render('index', { 
      //   title: 'Project Name',
      //   user,
      //   upcomingMovies: upcomingMovies.results 
      // });
    })

  
      
});



router.get('/about-us', (req, res)=> {
  res.render('about-us/about-us')
})



module.exports = router;