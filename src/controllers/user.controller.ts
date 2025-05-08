import User from "../models/user.model";


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};