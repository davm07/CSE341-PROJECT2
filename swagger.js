const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movies and Books API',
    version: '1.0.0',
    description: 'API for movies and books'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpoints = ['./routes/index.js'];

swaggerAutogen(outputFile, endpoints, doc);
