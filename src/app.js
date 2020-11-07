import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
