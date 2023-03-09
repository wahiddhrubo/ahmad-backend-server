const ErrorHandler = require("../utils/errorHandler.js");
module.exports = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = ErrorHandler(message, 400, req, res);
  }

  // VAlidation  error
  if (err.name === "ValidatorError") {
    const message = `${err}`;
    err = ErrorHandler(message, 400, req, res);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} Already Registered`;
    err = ErrorHandler(message, 400, req, res);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = ErrorHandler(message, 400, req, res);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = ErrorHandler(message, 400, req, res);
  }

  err = ErrorHandler(errMsg, errStatus, req, res);
};
