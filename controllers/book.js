const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAllBooks = async (req, res, next) => {
  //#swagger.tags = ['Books'];
  try {
    const books = await mongodb.getDb().db().collection('books').find({}).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  //#swagger.tags = ['Books'];
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      throw createError(400, 'Invalid book id');
    }

    const book = await mongodb
      .getDb()
      .db()
      .collection('books')
      .findOne({ _id: ObjectId.createFromHexString(bookId) });

    if (!book) {
      throw createError(404, 'book not found');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(book);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createBook = async (req, res, next) => {
  //#swagger.tags = ['Books']
  try {
    const { title, release_year, number_of_pages, author, genre, book_cover } = req.body;
    // eslint-disable-next-line no-unused-vars
    const result = await mongodb.getDb().db().collection('books').insertOne({
      title: title,
      release_year: release_year,
      number_of_pages: number_of_pages,
      author: author,
      genre: genre,
      book_cover: book_cover
    });

    if (result.acknowledged) {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json();
    } else {
      throw createError(500, 'Error creating book');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  //#swagger.tags = ['Books']
  try {
    const { title, release_year, number_of_pages, author, genre, book_cover } = req.body;
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      throw createError(400, 'Invalid book id');
    }

    // eslint-disable-next-line no-unused-vars
    const result = await mongodb
      .getDb()
      .db()
      .collection('books')
      .updateOne(
        {
          _id: ObjectId.createFromHexString(bookId)
        },
        {
          $set: {
            title: title,
            release_year: release_year,
            number_of_pages: number_of_pages,
            author: author,
            genre: genre,
            book_cover: book_cover
          }
        }
      );

    if (result.matchedCount === 0) {
      console.log(result);
      throw createError(404, 'Book not found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(204).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  //#swagger.tags = ['Books']
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      throw createError(400, 'Invalid book id');
    }

    const result = await mongodb
      .getDb()
      .db()
      .collection('books')
      .deleteOne({
        _id: ObjectId.createFromHexString(bookId)
      });

    if (result.deletedCount === 0) {
      throw createError(404, 'Book not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
