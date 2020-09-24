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
    const book = await Book.findByPk(req.params.id);
    if (book){
        res.render('update-book', {book, title: book.title, author: book.author, genre: book.genre, year: book.year});
    }else{
        const error = new Error('Page not found');
        error.status = 404;
        next(error);
    }
}));

/*POST - updates a given book*/
router.post('/:id', asyncHandler(async(req, res, next) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if (book) {
            await book.update(req.body);
            res.redirect('/books');
        } else {
            const error = new Error('Book not found');
            error.status = 404;
            next(error);
        }
    } catch (err) {
        console.log("error " + err);
        throw err;
    }

}));

/*POST - deletes the book*/
router.post('/:id/delete', asyncHandler(async(req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect('/books');
}));

module.exports = router;
