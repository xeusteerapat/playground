import express from 'express';
import { getMathRoutes } from './calc';

function getRoutes() {
  const router = express.Router();

  router.use('/math', getMathRoutes());

  return router;
}

export { getRoutes };
