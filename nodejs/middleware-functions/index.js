const express = require('express');
const math = require('./middlewares/math');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(math);

app.post('/api', (req, res, next) => {
  try {
    return res.send({
      message: 'Other number',
    });
  } catch (error) {
    next(error);
  }
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  next(err.message);
});

app.listen(3300, () => console.log('server run 3300'));
