import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth.middleware';
import { getAllUsers } from '../controllers/user.controller';


const router = express.Router();
router.get('/', verifyToken, isAdmin, getAllUsers);
export default router;