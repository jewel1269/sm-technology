import { NextFunction, Request, Response } from "express";
import ClassSchedule from "../models/class.model";

export const createSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, timeSlot, trainerId } = req.body;
    const existing = await ClassSchedule.find({ date });
    if (existing.length >= 5)
      throw { statusCode: 400, message: "Daily limit reached" };

    const schedule = await ClassSchedule.create({ date, timeSlot, trainerId });
    res
      .status(201)
      .json({ success: true, message: "Schedule created", data: schedule });
  } catch (err) {
    next(err);
  }
};

export const getSchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schedules = await ClassSchedule.find()
      .populate("trainerId")
      .populate("trainees");
    res.json({ success: true, data: schedules });
  } catch (err) {
    next(err);
  }
};

export const bookClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classId = req.params.id;
    const userId = req.user.id;
    const schedule = await ClassSchedule.findById(classId);

    if (!schedule) throw { statusCode: 404, message: "Schedule not found" };
    if (schedule.trainees.length >= 10)
      throw { statusCode: 400, message: "Class full" };
    if (schedule.trainees.includes(userId))
      throw { statusCode: 400, message: "Already booked" };

    schedule.trainees.push(userId);
    await schedule.save();
    res
      .status(201)
      .json({ success: true, message: "Class booked", data: schedule });
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classId = req.params.id;
    const userId = req.user.id;
    const schedule = await ClassSchedule.findById(classId);

    if (!schedule) throw { statusCode: 404, message: "Schedule not found" };
    schedule.trainees = schedule.trainees.filter(
      (id) => id.toString() !== userId
    );
    await schedule.save();
    res.json({ success: true, message: "Booking cancelled", data: schedule });
  } catch (err) {
    next(err);
  }
};
