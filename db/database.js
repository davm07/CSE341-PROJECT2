const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
let db;

const initDb = (callback) => {
  if (db) {
    console.log('Database already initialized');
    return callback(null, db);
  }

  // eslint-disable-next-line no-undef
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      db = client;
      callback(null, db);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = {
  initDb,
  getDb
};
