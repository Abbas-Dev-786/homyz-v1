const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const propertyRouter = require("./routes/propertyRoute");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const { passportGoogleAuth } = require("./utils/strategies");

const app = express();

app.use(passport.initialize());
passportGoogleAuth();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const BASE_URL = "/api/v1";
app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/users`, userRouter);
app.use(`${BASE_URL}/properties`, propertyRouter);

app.all("*", (req, _, next) => {
  next(new AppError(`The route ${req.originalUrl} does not exists.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
