const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();

const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { NotFoundError } = require("./errors/custom-errors");

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use(requestLogger);
app.use("/", routes);

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

mongoose.connect("mongodb://localhost:27017/wtwr_db").then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
