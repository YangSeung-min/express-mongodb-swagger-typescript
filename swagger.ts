// const swaggerUi = require("swagger-ui-express");
// const swaggereJsdoc = require("swagger-jsdoc");

// import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Schedule API',
      version: '1.0.0',
      description: 'Schedule API with express',
    },
    host: 'localhost:4500',
    basePath: '/',
  },
  apis: ['./routes/*.ts'],
};

export const specs = swaggereJsdoc(options);

// export swaggerUi;
// export specs;
// module.exports = {
//   swaggerUi,
//   specs,
// };
