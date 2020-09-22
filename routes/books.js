const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

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
router.get('/', asyncHandler(async (req, res, next) => {
    const books = await Book.findAll().then(function(books){
        console.log(books);
        res.render('index', {books: books, title: "lala"});
    });
}));

/* GET form for creating a new book */
router.get('/new', asyncHandler(async (req, res) => {
    res.render('new-book', {book: Book.build(), title: ""});
}));

/*POST - create a new book*/
router.post('/new', asyncHandler((req, res, next) => { // / rounte??
    Book.create().then(function (book) {
        res.redirect('/books/' + book.id); //+ book.id
    });
}));

/* GET books by id*/
router.get('/:id', asyncHandler((req, res, next) => {
    Book.findById(req.param.id).then(function(book){
        res.render('update-book', {book: book, title: book.title});
    })
}));

module.exports = router;
