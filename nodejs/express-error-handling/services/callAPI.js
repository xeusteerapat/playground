const axios = require('axios');

const fetchUsers = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  return data;
};

const rejectPromiseError = () => {
  return new Promise((_, reject) => {
    reject(new Error('This is rejected by Promise'));
  });
};

const throwError = async () => {
  throw new Error('YOU GOT ERROR');
};

module.exports = {
  fetchUsers,
  rejectPromiseError,
  throwError,
};
