import express from "express";
import { bookClass, cancelBooking, createSchedule, getSchedules } from "../controllers/class.controller.js";
import { isAdmin, isTrainee, verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", verifyToken, getSchedules);
router.post("/", verifyToken, isAdmin, createSchedule);
router.post("/book/:id", verifyToken, isTrainee, bookClass);
router.post("/cancel/:id", verifyToken, isTrainee, cancelBooking);
export default router;
