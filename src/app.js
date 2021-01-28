const express = require('express');
const routes = require('./routes');
const resolveSyntax = require('./middlewares/resolve-syntax-error');

const app = express();

// Automatically tries to convert request to JSON
app.use(express.json());
// If that fails sometimes, this package middleware handles it properly
app.use(resolveSyntax());

app.use('/', routes);

// 404 Error Handler
app.use((req, res, next) => res.status(404).send({
  status: 'error',
  data: null,
  message: 'Route doesnt exist!',
}));

app.use((err, req, res, next) => res.status(500).send({
  status: 'error',
  data: null,
  message: 'Ok, we are being honest here, we don\'t what happened!',
}));

process.on('unhandledRejection', (error) => {
  console.error('FATAL UNEXPECTED UNHANDLED REJECTION!', error.message);
  throw error;
});

module.exports = app;
