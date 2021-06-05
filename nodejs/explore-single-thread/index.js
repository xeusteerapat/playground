const fs = require('fs');

setImmediate(() => console.log(1)); // adds to check queue

Promise.resolve().then(() => console.log(2)); // adds to promise microtasks queue

process.nextTick(() => console.log(3)); // adds to nextTick microtasks queue

fs.readFile(__filename, () => {
  console.log(4);

  setTimeout(() => console.log(5));

  setImmediate(() => console.log(6));

  process.nextTick(() => console.log(7));
});

console.log(8);
