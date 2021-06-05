const randomHexId = require('@xeusteerapat/random-hex-id');

const id = randomHexId();

setInterval(() => {
  console.log(randomHexId().length);
}, 1000);
