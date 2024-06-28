const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
  //#swagger.tags = ['Books'];
  try {
    const books = await mongodb.getDb().db().collection('books').find({}).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving books' });
  }
};

const getBookById = async (req, res) => {
  //#swagger.tags = ['Books'];
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      res.status(400).json({ message: 'Invalid book id' });
    }

    const book = await mongodb
      .getDb()
      .db()
      .collection('books')
      .findOne({ _id: ObjectId.createFromHexString(bookId) });

    if (!book) {
      res.status(404).json({ message: 'book not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(book);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving book' });
  }
};

const createBook = async (req, res) => {
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

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

const updateBook = async (req, res) => {
  //#swagger.tags = ['Books']
  try {
    const { title, release_year, number_of_pages, author, genre, book_cover } = req.body;
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      res.status(400).json({ message: 'Invalid book id' });
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

    res.setHeader('Content-Type', 'application/json');
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags = ['Books']
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      res.status(400).json({ message: 'Invalid book id' });
    }

    const result = await mongodb
      .getDb()
      .db()
      .collection('books')
      .deleteOne({
        _id: ObjectId.createFromHexString(bookId)
      });

    res.setHeader('Content-Type', 'application/json');
    res.status(204).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
