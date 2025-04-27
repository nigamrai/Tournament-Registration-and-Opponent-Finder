import express from 'express';
import { login, signup } from '../controllers/authController.js';
import upload from '../middlewares/multer.middleware';
const authRouter = express.Router();
authRouter.post('/login', login);
authRouter.post('/signup', upload.single('image'), signup);
export default authRouter;