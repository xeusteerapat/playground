// ### Example 1 ###
// try {
//   setTimeout(() => {
//     throw new Error('an asynchronous error');
//   }, 100);
// } catch (e) {
//   console.log('error: ', e);
// }

// ### Example 2 ###
// try {
//   new Promise((resolve, reject) => {
//     throw new Error('error from promise');
//   });
// } catch (error) {
//   console.log('error:', error);
// }

// ### Example 3 ###
// try {
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       throw new Error('error from promise');
//     }, 100);
//   });
// } catch (error) {
//   console.log('error:', error);
// }

// ### Example 4 ###
// try {
//   console.log('Before setTimeout');
//   setTimeout(() => {
//     throw new Error('Oups');
//   });
//   console.log('After setTimeout');
// } catch (err) {
//   console.log('Caught', err);
// }
// console.log("Point of non-return, I can't handle anything anymore");

// ### Example 5 ###
try {
  console.log('Before setTimeout');
  new Promise((resolve, reject) => {
    setTimeout(() => {
      throw new Error('Oups');
    });
  });
  console.log('After setTimeout');
} catch (err) {
  console.log('Caught', err);
}
console.log("Point of non-return, I can't handle anything anymore");

// ### Example 6 ### How we can handle it
// (async function () {
//   try {
//     console.log('Before setTimeout');
//     await new Promise((resolve, reject) =>
//       setTimeout(() => {
//         reject(new Error('Oups'));
//       })
//     );
//     console.log('After setTimeout');
//   } catch (err) {
//     console.log('Caught', err.stack);
//   }
//   console.log("Point of non-return, I can't handle anything anymore");
// })();

// process.on('unhandledRejection', () => {
//   console.log('ESCAPE');
// });
