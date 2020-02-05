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

app.get('/api/v1/projects', async (request, response) => {
  try {
    const projects = await database('projects').select();
    response.status(200).json({projects})
  } catch (error) {
    response.status(500).json({error})
  }
})

module.exports = app;
