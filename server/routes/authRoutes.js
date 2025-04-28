import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';
import upload from '../middlewares/multer.middleware.js';
const authRouter = express.Router();
authRouter.post('/login', login);
authRouter.post('/register', upload.single('image'),signup);
authRouter.post('/logout', logout);
export default authRouter;