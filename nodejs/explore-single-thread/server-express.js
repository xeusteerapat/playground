const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', async (req, res, next) => {
  try {
    // const user = {
    //   id: 1,
    //   name: 'Teerapat',
    //   age: 35,
    // };

    // const n = 2;

    // if (n === 2) throw new Error('wrong number');

    // res.send(user);
    // console.log('Before setTimeout');
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     throw new Error('Oups');
    //   });
    // });
    // console.log('After setTimeout');

    await Promise.reject(new Error('my zoom 1'));
  } catch (error) {
    // process.exit(1);
    console.log('BAD Thing happened');
    // next(error);
    res.send({
      status: 500,
    });
  }
});

app.listen(5500, () => console.log('server 5500'));
