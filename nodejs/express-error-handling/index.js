const express = require('express');
const app = express();
const cors = require('cors');
const {
  fetchUsers,
  rejectPromiseError,
  throwError,
} = require('./services/callAPI');
const catchAsync = require('./utils/catchAsync');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/users', async (req, res, next) => {
  const errorStack = [];
  try {
    // await throwError();
    await rejectPromiseError();
    const result = await fetchUsers();

    res.send(result);
  } catch (error) {
    console.log('before call next function');
    // console.log('Error:', error.message);
    // errorStack.push(error.message);
    // console.log(errorStack);
    next(error);
    console.log('after called next function');
  }
});

app.get(
  '/catch',
  catchAsync(async (req, res, next) => {
    const foo = await Promise.resolve('I GOT FOO');

    await Promise.reject(new Error('Foo Error: YOU GOT BAR'));

    res.end(foo);
  })
);

app.get('/error', async (req, res, next) => {
  try {
    console.log(typeof Promise.reject(new Error('SHAME ON YOU')));
    Promise.reject(new Error('SHAME ON YOU'));
  } catch (error) {
    next(error);
  }
});

// Error middleware
// If use async/await error middleware must be the last one
app.use(function (err, req, res, next) {
  console.log('Error middleware');
  console.error(err.message);
  next(err.message);
});

app.listen(3400, () => {
  console.log('server is listening on port 3400');
});
