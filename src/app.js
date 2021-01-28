const express = require('express');
const routes = require('./routes');
const resolveSyntax = require('./middlewares/resolve-syntax-error');
const { errorResponse } = require('./utils/responses');

const app = express();

// Automatically tries to convert request to JSON
app.use(express.json());
// If that fails sometimes, this package middleware handles it properly
app.use(resolveSyntax());

app.use('/', routes);

// 404 Error Handler
app.use((req, res, next) => errorResponse(res, 404, 'Route doesnt exist.'));

app.use((err, req, res, next) => errorResponse(res, 500, 'Ok, we are being honest here, we don\'t what happened.'));

process.on('unhandledRejection', (error) => {
  console.error('FATAL UNEXPECTED UNHANDLED REJECTION!', error.message);
  process.exit(0);
});

module.exports = app;
