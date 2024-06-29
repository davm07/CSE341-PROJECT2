const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAllMovies = async (req, res, next) => {
  //#swagger.tags = ['Movies'];
  try {
    const movies = await mongodb.getDb().db().collection('movies').find({}).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  //#swagger.tags = ['Movies'];
  try {
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      throw createError(400, 'Invalid movie id');
    }

    const movie = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .findOne({ _id: ObjectId.createFromHexString(movieId) });

    if (!movie) {
      throw createError(404, 'Movie not found');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(movie);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createMovie = async (req, res, next) => {
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

    if (result.acknowledged) {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json();
    } else {
      throw createError(500, 'Error creating movie');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  //#swagger.tags = ['Movies']
  try {
    const { title, year, director, duration, poster, rate, genre } = req.body;
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      throw createError(400, 'Invalid movie id');
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

    if (result.matchedCount === 0) {
      throw createError(404, 'Movie not found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(204).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  //#swagger.tags = ['Movies']
  try {
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      throw createError(400, 'Invalid movie id');
    }

    const result = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .deleteOne({
        _id: ObjectId.createFromHexString(movieId)
      });

    if (result.deletedCount === 0) {
      throw createError(404, 'Movie not found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(204).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
