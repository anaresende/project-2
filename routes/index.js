var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Name' });
});






// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://data-imdb1.p.rapidapi.com/genres/',
//   headers: {
//     'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
//     'x-rapidapi-key': '120cbfcc78msh7bcbf5a09929b0cp15795cjsnf489b5a4ae37'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });















module.exports = router;
