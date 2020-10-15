import express from 'express';
import mongoMiddleware from '../db/mongoConnection.js';

const router = express.Router();

router.get('/', mongoMiddleware, async (req, res) => {
  const response = await req.dbConnection.collection('users').findOne({ userId: 0 });
  res.json(response);
});

export default router;
