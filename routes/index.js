var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("redirect to /books");
  res.redirect('/books');
});

module.exports = router;
