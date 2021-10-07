import express from "express";
import bodyParser from "body-parser";
import notFound from "./src/middlewares/notFound";
import errorHandler from "./src/middlewares/errorHandler";
import router from "./src/route";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

app.get("/ping", (req, res, next) => {
  return res.json("ping:pong");
});

app.use(notFound);
app.use(errorHandler);

export default app;

