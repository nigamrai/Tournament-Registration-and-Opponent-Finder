import express from 'express';
import { login, signup } from '../controllers/authController.js';
<<<<<<< HEAD
import upload from '../middlewares/multer.middleware';
=======
import upload from '../middlewares/multer.middleware.js';
>>>>>>> e9ff7c964c52fe3332f395ce21567f35f261276f
const authRouter = express.Router();
authRouter.post('/login', login);
authRouter.post('/signup', upload.single('image'), signup);
export default authRouter;