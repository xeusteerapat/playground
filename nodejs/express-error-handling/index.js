const express = require('express');
const app = express();
const cors = require('cors');
const {
  fetchUsers,
  rejectPromiseError,
  throwError,
} = require('./services/callAPI');

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

// Error middleware
// If use async/await error middleware must be the last one
app.use(function logErrors(err, req, res, next) {
  console.log('Error middleware');
  console.error(err.stack);
  next(err);
  console.log('after next in error middleware');
});

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});
