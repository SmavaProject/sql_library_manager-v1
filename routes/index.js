var express = require('express');
var router = express.Router();
//const Book = require('../models').Book; // <------????

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("redirect to /books");
  res.redirect('/books');
});

module.exports = router;
