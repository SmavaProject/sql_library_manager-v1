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
router.post('/new', asyncHandler(async (req, res, next) => { // / rounte??
    Book.create(req.body).then(function (book) { //missed the body of the book!!!
        res.redirect('/books/' + book.id);
    });
}));

/* GET books by id*/
router.get('/:id', asyncHandler(async (req, res, next) => {
    Book.findByPk(req.params.id).then(book => {
        res.render('update-book', {book, title: book.title, author: book.author, genre: book.genre, year: book.year});
    });
}));

/*POST - updates a given book*/
router.post('/:id', asyncHandler(async(req, res, next) => {
    console.log('req.params.id ' + req.params.id);
    const book = await Book.findByPk(req.params.id);
    console.log('req.body ' + req.body);
    await book.update(req.body);
    req.redirect('/books/' + book.id);
}));

/*POST - deletes the book*/
router.get('/:id/delete', asyncHandler(async(req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    req.redirect('/books/' + book.id);
}));

/*POST - deletes the book*/
router.post('/:id/delete', asyncHandler(async(req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    req.redirect('/');
}));

module.exports = router;
