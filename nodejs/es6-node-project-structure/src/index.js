import logger from 'loglevel';
import { startServer } from './server';

logger.setLevel('info');

startServer({ port: 4500 });
