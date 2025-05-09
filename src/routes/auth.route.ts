import express from "express";
import { login, Register } from "../controllers/auth.controller";

const router = express.Router();
router.post("/login", login);
router.post("/resigter", Register);
export default router;
