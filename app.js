const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static('public'));   ???

app.locals.title = 'Projects';
// app.locals.id = 0;   ???

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

module.exports = app;
