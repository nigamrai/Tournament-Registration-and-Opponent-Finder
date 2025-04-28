import express from 'express';
import { acceptOpponentRequest, createOpponentRequest, getAllOpponentRequests } from '../controllers/opponentController.js';
const opponentRouter = express.Router();
opponentRouter.post('/create', createOpponentRequest);
opponentRouter.get('/', getAllOpponentRequests);
opponentRouter.get('/accept/:id/:acceptId', acceptOpponentRequest); // Assuming you want to get by ID as well
export default opponentRouter;