class ErrorHandeler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorMiddleWare = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internaml Server Error";

  if (err.name === "CastError") {
    err = new ErrorHandeler(400, "format is invalid");
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandeler(401, "Invalid token, please login again");
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandeler(401, "Token expired, please login again");
  }

  return res.status(err.statusCode).json({
    message: err.message,
    success: false,
  });
};
export default ErrorHandeler;
