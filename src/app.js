const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const resolveSyntax = require('./middlewares/resolve-syntax-error');
const { errorResponse } = require('./utils/responses');

const app = express();

// Automatically tries to convert request to JSON
app.use(express.json());
// If that fails sometimes, this package middleware handles it properly
app.use(resolveSyntax());
//
app.use(cors());

app.use('/', routes);

// 404 Error Handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => errorResponse(res, 404, 'Route doesnt exist.'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  return errorResponse(res, 500, 'Ok, we are being honest here, we don\'t what happened.');
});

module.exports = app;
