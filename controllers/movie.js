const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
  //#swagger.tags = ['Movies'];
  try {
    const movies = await mongodb.getDb().db().collection('movies').find({}).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving movies' });
  }
};

const getMovieById = async (req, res) => {
  //#swagger.tags = ['Movies'];
  try {
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      res.status(400).json({ message: 'Invalid movie id' });
    }

    const movie = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .findOne({ _id: ObjectId.createFromHexString(movieId) });

    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(movie);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving movie' });
  }
};

const createMovie = async (req, res) => {
  //#swagger.tags = ['Movies']
  try {
    const { title, year, director, duration, poster, rate, genre } = req.body;
    // eslint-disable-next-line no-unused-vars
    const result = await mongodb.getDb().db().collection('movies').insertOne({
      title: title,
      year: year,
      director: director,
      duration: duration,
      poster: poster,
      rate: rate,
      genre: genre
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

const updateMovie = async (req, res) => {
  //#swagger.tags = ['Movies']
  try {
    const { title, year, director, duration, poster, rate, genre } = req.body;
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      res.status(400).json({ message: 'Invalid movie id' });
    }

    // eslint-disable-next-line no-unused-vars
    const result = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .updateOne(
        {
          _id: ObjectId.createFromHexString(movieId)
        },
        {
          $set: {
            title: title,
            year: year,
            director: director,
            duration: duration,
            poster: poster,
            rate: rate,
            genre: genre
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

const deleteMovie = async (req, res) => {
  //#swagger.tags = ['Movies']
  try {
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      res.status(400).json({ message: 'Invalid movie id' });
    }

    const result = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .deleteOne({
        _id: ObjectId.createFromHexString(movieId)
      });

    res.setHeader('Content-Type', 'application/json');
    res.status(204).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
