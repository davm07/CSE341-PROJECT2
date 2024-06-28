const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Movies and Books API Documentation'
};

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument, options));

module.exports = router;
