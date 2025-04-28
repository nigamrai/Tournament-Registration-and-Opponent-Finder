import express from 'express';
import { registerParticipant } from '../controllers/participantController.js';
import upload, { uploadFields } from '../middlewares/multer.middleware.js';
const participantRouter = express.Router();
participantRouter.post('/register', upload.fields(uploadFields),registerParticipant);
export default participantRouter;