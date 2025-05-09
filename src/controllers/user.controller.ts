import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const getAllUsers = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};
