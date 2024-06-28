/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');

const mongodb = require('./db/database');
const app = express();
const port = process.env.PORT || 3000;

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  }
});
