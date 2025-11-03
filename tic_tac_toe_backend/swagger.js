const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tic Tac Toe API',
      version: '1.0.0',
      description: 'REST API for managing Tic Tac Toe games',
    },
    tags: [
      { name: 'Health', description: 'Service health endpoints' },
      { name: 'Game', description: 'Tic Tac Toe game endpoints' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
