import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  date: String,
  timeSlot: String,
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const ClassSchedule = mongoose.model("ClassSchedule", classSchema);
export default ClassSchedule;
