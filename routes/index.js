import express from 'express';
import * as AppController from '../controllers/AppController';

const router = express.Router();

router.use((req, res, next) => {
  // console.log('Time: ', Date.now());
  // console.log(req.headers);
  next();
});

router.get('/status', (req, res) => {
  res.status(200);
  res.json(AppController.getStatus());
});

router.get('/stats', (req, res) => {
  res.status(200);
  res.json(AppController.getStats());
});

export default router;
