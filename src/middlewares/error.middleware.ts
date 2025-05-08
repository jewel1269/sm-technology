import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
    statusCode?: number;
    errorDetails?: any;
  }
export = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    errorDetails: err.errorDetails || null,
  });
};
