import ClassSchedule from "../models/class.model";
import AppError from "../validations/app.error";

interface ClassScheduleInput {
  date: Date;
  timeSlot: string;
  trainerId: string;
}

export const createClassSchedule = async ({
  date,
  timeSlot,
  trainerId,
}: ClassScheduleInput) => {
  const existingSchedules = await ClassSchedule.find({ date });

  if (existingSchedules.length >= 5) {
    throw new AppError("Schedule limit reached for the day.", 400);
  }

  const schedule = await ClassSchedule.create({
    date,
    timeSlot,
    trainerId,
  });

  return schedule;
};
