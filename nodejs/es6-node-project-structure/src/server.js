import express from 'express';
import 'express-async-errors';
import logger from 'loglevel';

import { getRoutes } from './routes';

function startServer({ port = process.env.PORT } = {}) {
  const app = express();

  app.get('/chill', (req, res) => res.json({ message: 'hello' }));
  app.use('/api', getRoutes());
  app.use(errorMiddleware);

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Server listening on port ${server.address().port}`);

      const orginalClose = server.close.bind(server);
      server.close = () => {
        return new Promise(resolveClose => {
          orginalClose(resolveClose);
        });
      };

      setupOnCloseExit(server);

      resolve(server);
    });
  });
}

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error);
  } else {
    logger.error(error);

    res.status(500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === 'production'
        ? null
        : { stack: error.stack }),
    });
  }
}

function setupOnCloseExit(server) {
  async function exitHandler(option = {}) {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed');
      })
      .catch(e => {
        logger.warn('Something went wrong closing the server', e.stack);
      });

    if (option.exit) process.exit();
  }

  process.on('exit', exitHandler);
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
}

export { startServer };
