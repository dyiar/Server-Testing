const express = require("express");

const server = express();
server.use(express.json());

const knex = require('knex')
const config = require('../knexfile');
db = knex(config.development);
const hobbitFile = require('../hobbits/hobbits');


server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get('/list', (req, res) => {
  db('hobbits').then(action => {
    res.status(200).send({action})
  })
  .catch(() => res.status(500).send({error: 'error"'}))
})

server.post('/', (req, res) => {
  db('hobbits')
  .insert(req.body)
  .then(ids => {
    db('hobbits')
    .where({ id: ids[0] })
    .then(hobbit => {
      res.status(201).send(hobbit)
    })
  })
  .catch(() => res.status(500).send({ error: 'data not saved'}))
})

server.delete('/:id', (req, res) => {
  db('hobbits')
  .where({ id: req.params.id })
  .del()
  .then(count => {
    res.status(200).send({ count })
  })
  .catch(() => res.status(500).send({ error: 'not deleted'}))

})


module.exports = server;