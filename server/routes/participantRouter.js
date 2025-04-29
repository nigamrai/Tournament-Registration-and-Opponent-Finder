import express from 'express';
import { getParticipantsByTournamentId, registerParticipant } from '../controllers/participantController.js';
import isLoggedIn from '../middlewares/auth.middleware.js';
import upload, { uploadFields } from '../middlewares/multer.middleware.js';
const participantRouter = express.Router();
participantRouter.post('/register', isLoggedIn,upload.fields(uploadFields),registerParticipant);
participantRouter.get('/:tournamentId/teams', isLoggedIn, getParticipantsByTournamentId);
export default participantRouter;