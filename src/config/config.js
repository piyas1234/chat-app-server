"use strict";
import mongoose from "mongoose";
import app from "./../../";

import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
mongoose.connection.once("open", () => {
  const port = process.env.PORT || 1000;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

console.log("hello");
