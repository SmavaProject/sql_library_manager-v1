const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(error){
            res.status(500).send(error);
        }
    }
}
/* GET all books */

router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render('index', {books, title: "lala"});
}));

module.exports = router;
