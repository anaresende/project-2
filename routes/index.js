var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Name' });
});

router.get('/catarina', function(req, res, next) {
  res.render('index', { title: 'Project Name' });
});

module.exports = router;
