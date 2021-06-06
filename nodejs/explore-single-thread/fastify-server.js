const fastify = require('fastify')({ logger: true });

// Declare a route
fastify.get('/hello', async (request, reply) => {
  // console.log('Before setTimeout');
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject(new Error('Oups'));
  //   });
  // });
  // console.log('After setTimeout');
  await Promise.reject(new Error('my zoom 1'));

  // reply.send({ hello: 'world' });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3300);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
