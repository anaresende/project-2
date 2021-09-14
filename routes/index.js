var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.currentUser
  res.render('index', { title: 'Project Name', user });
});

module.exports = router;


router.get('/about-us', (req, res)=> {
  res.render('about-us/about-us')
})