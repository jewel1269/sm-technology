import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: "JWT_SECRET is not configured" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Admin only" });
    return;
  }
  next();
};

export const isTrainee = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "trainee") {
    res.status(403).json({ message: "Trainees only" });
    return;
  }
  next();
};
