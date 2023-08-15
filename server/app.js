const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.all("*", (req, res, next) => {
  next(new AppError(`The route ${req.originalUrl} does not exists`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
