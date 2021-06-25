module.exports = async function (req, res, next) {
  try {
    if (req.body.number === 2) {
      console.log('Condition is met');

      await Promise.reject(new Error('NOOOO'));
      // return res.send({
      //   message: 'The number is 2',
      // });
    }
    console.log('Into middleware');
    next();
  } catch (error) {
    console.log('Error in middleware function:', error.message);
    next(error);
  }
};
