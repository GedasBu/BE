const AppError = require("../utils/appError");

const handleJWTError = () =>
  new AppError("Invalid token! Please login again", 401);
const handleJWTExpiredError = () =>
  new AppError("Your token has expired!", 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
