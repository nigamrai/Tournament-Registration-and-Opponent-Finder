import express from 'express';
import { login, signup } from '../controllers/authController.js';
import upload from '../middlewares/multer.middleware.js';
const authRouter = express.Router();
authRouter.post('/login', login);
authRouter.post('/register', upload.single('image'),signup);
export default authRouter;