const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    code: err.code,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    console.log(err + "💥");

    return res.status(500).json({
      status: "error",
      message: "something went really wrong 😢. We are working on it 🛠.",
    });
  }
};

const handleCastError = (err) => {};

const handleValidationError = (err) => {};

const handleDuplicateFieldError = (err) => {};

const handleJWTError = () => {};

const handleJWTExpireError = () => {};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = Object.assign(err);

    sendProdError(error, res);
  }
};
