import express from 'express';
import routes from './routes/routes.js';

const app = express();
const port = process.env.PORT;

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
