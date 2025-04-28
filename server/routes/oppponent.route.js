import express from 'express';
import { acceptOpponentRequest, createOpponentRequest, getAllOpponentRequests } from '../controllers/opponentController.js';
import isLoggedIn from '../middlewares/auth.middleware.js';
const opponentRouter = express.Router();
opponentRouter.post('/create',isLoggedIn, createOpponentRequest);
opponentRouter.get('/',isLoggedIn, getAllOpponentRequests);
opponentRouter.get('/accept/:id/:acceptId', isLoggedIn,acceptOpponentRequest); // Assuming you want to get by ID as well
export default opponentRouter;