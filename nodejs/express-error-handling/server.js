const express = require('express');
const app = require('@root/async-router').Router();
const http = require('http');

app.get('/hi', async (req, res) => {
  return {
    message: 'Hi',
  };
});

app.get('/error', async (req, res) => {
  throw new Error('kABOOMM!');
});

app.get('/promise-error', async (req, res) => {
  return Promise.reject(new Error('Broken Promise'));
});

app.use('/', (err, req, res, next) => {
  console.error('Unhandled Error');
  console.error(err);
  res.statusCode = 500;
  res.end(err.message);
});

const server = express().use('/', app);

http.createServer(server).listen(3300, () => console.log('server at 3300'));
