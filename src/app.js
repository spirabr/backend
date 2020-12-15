import express from "express";
import bodyParser from "body-parser";

import router from "./routes/routes.js";
import { setupDb } from "./db/mongoConnection";

// eslint-disable-next-line import/prefer-default-export
export const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

const start = async () => {
  await setupDb();

  app.listen(port, () => console.log(`server running on port ${port}`));
};

start();
