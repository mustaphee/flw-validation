const express = require('express');
const routes = require('./routes');

const app = express();

// Automatically tries to convert request to JSON
app.use(express.json());

app.use('/', routes);
module.exports = app;
