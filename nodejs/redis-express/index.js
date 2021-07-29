const express = require('express');
const redis = require('redis');
const util = require('util');
const axios = require('axios');

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

redisClientSet = util.promisify(redisClient.set).bind(redisClient);
redisClientGet = util.promisify(redisClient.get).bind(redisClient);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res, next) => {
  try {
    const { key, value } = req.body;
    const response = await redisClientSet(key, value);
    console.log(response);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.get('/', async (req, res, next) => {
  try {
    const { key } = req.body;
    const value = await redisClientGet(key);

    res.json(value);
  } catch (error) {
    next(error);
  }
});

app.get('/posts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const cachedPost = await redisClientGet(`post-${id}`); // if it doesn't exist => null

    if (cachedPost) {
      return res.json(JSON.parse(cachedPost));
    }

    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    redisClientSet(`post-${id}`, JSON.stringify(data));

    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.listen(3443, () => console.log('server running 3443'));
