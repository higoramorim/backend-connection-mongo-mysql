const express = require('express');

// const mysql = require('mysql2/promise');
const rescue = require('express-rescue');
const boom = require('boom');
const app = express();
const middlewares = require('./middlewares');
// const charactersModel = require('./models/charactersModel_mysql');
const charactersModel = require('./models/charactersModel');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const PORT = 3000;

app.get('/characters', rescue(async (_req, res) =>{
  const characters = await charactersModel.getAll()

  res.status(200).json(characters);
}))

app.post('/characters', rescue(async(req, res) =>{
  const { name, cartoon } = req.body;

  const character = await charactersModel.add(name, cartoon)

  res.status(201).json(character);
}))

app.get('/characters/:id', rescue(async (req, res, next) => {
  const { id } = req.params

  const character = await charactersModel.getById()

  if(!character) throw next(boom.notFound(`character ${id} not found`))

  res.status(200).json(character)
}))

app.delete('/characters/:id', rescue(async(req, res) => {
    const { id } = req.params
    await charactersModel.exclude(id)

    res.status(204).end()
}));

app.put('/characters/:id', rescue(async (req, res) => {
    const { name, cartoon } = req.body;
    const { id } = req.params;

    await charactersModel.update(id, name, cartoon)
    res.status(204).end();
}))

app.use(middlewares.errors);

app.listen(PORT, () => console.log(`pai ta no na porta: ${PORT}`));
