import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw { statusCode: 401, message: "Invalid email" };

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};
