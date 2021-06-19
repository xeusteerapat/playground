import express from 'express';

function getMathRoutes() {
  const router = express.Router();

  router.get('/add', add);
  router.get('/subtract', subtract);

  router.get('/me', me);

  return router;
}

async function add(req, res) {
  const sum = Number(req.query.a) + Number(req.query.b);

  res.send(sum.toString());
}

async function subtract(req, res) {
  const diff = Number(req.query.a) - Number(req.query.b);

  res.send(diff.toString());
}

async function me(req, res) {
  const me = {
    name: 'Teerapat',
    age: 35,
    occupation: 'Software Developer',
  };

  res.json(me);
}

export { getMathRoutes };
