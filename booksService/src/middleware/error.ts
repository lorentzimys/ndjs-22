import { ErrorRequestHandler } from "express";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // Determine the status code and error message based on the type of error
  const status = 500;
  const message = "Something went wrong!";

  // Send the error response to the client
    res.status(status).json({ error: message });
};

export default errorHandlerMiddleware;