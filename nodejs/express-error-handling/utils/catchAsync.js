const catchAsync = func => {
  return (req, res, next) => {
    Promise.resolve(func(req, res)).catch(next);
  };
};

module.exports = catchAsync;
