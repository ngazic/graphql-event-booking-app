import express from "express";
import bodyParser from "body-parser";
import { apiRouter } from "./routes/api.js";
import { currentUserMiddleware } from "./middlewares/current-user.js";

const app = express();

app.use(bodyParser.json());
app.use(currentUserMiddleware);
app.use(apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
