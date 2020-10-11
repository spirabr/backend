import express from 'express';
import mongoMiddleware from './mongoConnection.js';

const app = express();
const port = 3000;

app.get('/', mongoMiddleware, async (req, res) => {
  const response = await req.dbConnection.collection('users').findOne({ userId: 0 });
  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
